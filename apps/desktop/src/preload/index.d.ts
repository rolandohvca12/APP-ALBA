import type { AlbaDesktopApi } from '../shared/contracts';

declare global {
  interface Window {
    alba: AlbaDesktopApi;
  }
}

export {};
