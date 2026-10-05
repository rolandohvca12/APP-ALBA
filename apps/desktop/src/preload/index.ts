import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS, type AlbaDesktopApi } from '../shared/contracts';

const api: AlbaDesktopApi = {
  getBridgeStatuses: () => ipcRenderer.invoke(IPC_CHANNELS.bridgeStatuses),
  getRuntimeInfo: () => ipcRenderer.invoke(IPC_CHANNELS.runtimeInfo),
  launchEtabsHost: () => ipcRenderer.invoke(IPC_CHANNELS.launchEtabsHost),
  calculateBuildingVerification: (input) => ipcRenderer.invoke(
    IPC_CHANNELS.calculateBuildingVerification,
    input,
  ),
  runStructuralAnalysis: (input) => ipcRenderer.invoke(IPC_CHANNELS.runStructuralAnalysis, input),
};

contextBridge.exposeInMainWorld('alba', api);
