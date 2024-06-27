import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
const TRTCCloud = require('trtc-electron-sdk').default;
// Custom APIs for renderer
const api = {
  getTRTCShareInstance() {
    TRTCCloud.getTRTCShareInstance();
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
