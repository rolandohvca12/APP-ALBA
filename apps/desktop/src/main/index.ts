import { join } from 'node:path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import {
  IPC_CHANNELS,
  type BuildingVerificationActionResult,
  type BuildingVerificationInput,
  type RuntimeInfo,
  type StructuralAnalysisActionResult,
  type StructuralAnalysisInput,
} from '../shared/contracts';
import { BridgeMonitor } from './services/BridgeMonitor';
import { EtabsHostService } from './services/EtabsHostService';
import { BuildingVerificationService } from './services/BuildingVerificationService';
import { StructuralAnalysisService } from './services/StructuralAnalysisService';

const bridgeMonitor = new BridgeMonitor();
const etabsHost = new EtabsHostService();
const buildingVerification = new BuildingVerificationService();
const structuralAnalysis = new StructuralAnalysisService(etabsHost);

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 980,
    minHeight: 640,
    show: false,
    backgroundColor: '#f4f6f5',
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.on('ready-to-show', () => mainWindow.show());
  if (is.dev) {
    mainWindow.webContents.on('console-message', (details) => {
      console.log(`[renderer:${details.level}] ${details.message}`);
    });
    mainWindow.webContents.on('did-fail-load', (_, code, description) => {
      console.error(`[renderer:load] ${code} ${description}`);
    });
  }
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url);
    return { action: 'deny' };
  });

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    void mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    void mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

function registerIpc(): void {
  ipcMain.handle(IPC_CHANNELS.bridgeStatuses, () => bridgeMonitor.getStatuses());
  ipcMain.handle(IPC_CHANNELS.launchEtabsHost, () => etabsHost.launch());
  ipcMain.handle(IPC_CHANNELS.runtimeInfo, (): RuntimeInfo => ({
    appVersion: app.getVersion(),
    electronVersion: process.versions.electron,
    nodeVersion: process.versions.node,
    platform: process.platform,
  }));
  ipcMain.handle(
    IPC_CHANNELS.calculateBuildingVerification,
    async (_, input: BuildingVerificationInput): Promise<BuildingVerificationActionResult> => {
      try {
        return { ok: true, data: await buildingVerification.calculate(input) };
      } catch (error) {
        return {
          ok: false,
          message: error instanceof Error ? error.message : String(error),
        };
      }
    },
  );
  ipcMain.handle(
    IPC_CHANNELS.runStructuralAnalysis,
    async (_, input: StructuralAnalysisInput): Promise<StructuralAnalysisActionResult> => {
      try {
        return { ok: true, data: await structuralAnalysis.analyze(input) };
      } catch (error) {
        return { ok: false, message: error instanceof Error ? error.message : String(error) };
      }
    },
  );
}

void app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.appalba.desktop');
  app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window));
  registerIpc();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => etabsHost.close());
