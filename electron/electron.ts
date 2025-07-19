import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as dotenv from 'dotenv';

//* Cargar variables de entorno desde .env
dotenv.config();

//* Obtener valores del .env (con valores por defecto por si no existen)
const HOST = process.env['host'] || 'http://192.168.100.136';
const PORT = process.env['port'] || '4200';

const createWindow = () => {
  console.log(HOST, PORT);
  const appWin = new BrowserWindow({
    width: 1000,
    height: 800,
    title: 'Angular and Electron XD 2',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
    },
  });
  appWin.loadURL(`http://${HOST}:${PORT}`);
  appWin.setMenu(null);
  // appWin.webContents.openDevTools();
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app.on('ready', createWindow);
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });
