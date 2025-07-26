import { app, BrowserWindow, ipcMain } from 'electron';
import { Request, Response } from 'express';
import * as cors from 'cors';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Definir interfaces para TypeScript
interface TokenRequest extends Request {
  query: {
    token?: string;
  };
}

//* Cargar variables de entorno desde .env
dotenv.config();

//* Obtener valores del .env (con valores por defecto por si no existen)
const HOST = process.env['host'];
const PORT = process.env['port'];
const TOKEN_PORT = process.env['token_port'];

//* Servidor HTTP para validación
const api = express();
// Configurar CORS correctamente
api.use(cors());
api.use(express.json());

// Endpoint de validación
api.get('/validate-token', (req: TokenRequest, res: Response) => {
  const token = req.query.token;

  if (!token) {
    console.log('Token missing in request');
    return res.status(400).json({ valid: false, error: 'Token is required' });
  }

  console.log('Validating token:', token);

  try {
    jwt.verify(token, 'tu_clave_secreta_fuerte');
    return res.json({ valid: true });
  } catch (error) {
    console.error('Token validation failed:', error);
    return res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});

const createWindow = () => {
  const appWin = new BrowserWindow({
    width: 1000,
    height: 800,
    title: 'Verificacion de estudiantes',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
    },
  });
  appWin.loadURL(`http://${HOST}:${PORT}`);
  appWin.setMenu(null);
  appWin.webContents.openDevTools();
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Iniciar servidor
app.whenReady().then(() => {
  const server = api.listen(TOKEN_PORT, () => {
    console.log(`Token validation API running on port ${TOKEN_PORT}`);
  });

  ipcMain.handle('generate-token', () => {
    return jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 15 * 60 },
      'tu_clave_secreta_fuerte',
    );
  });

  // Manejar cierre adecuado
  app.on('window-all-closed', () => {
    server.close();
  });
});
