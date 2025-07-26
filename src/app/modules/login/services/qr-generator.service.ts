// qr-token.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { environment } from '../../../environment/environment';
import { firstValueFrom } from 'rxjs';

const TOKEN_URL = environment.tokenAPI;

@Injectable({
  providedIn: 'root',
})
export class QrTokenService {
  private readonly _http = inject(HttpClient);
  private ipcRenderer: typeof ipcRenderer | null = null;

  constructor() {
    if ((window as any).ipc) {
      this.ipcRenderer = (window as any).ipc;
    } else {
      console.warn('No estás en Electron. IPC no disponible.');
    }
  }

  //* Metodo para generar el token desde nodeJS (back);
  async generateToken(): Promise<string> {
    if (!this.ipcRenderer) throw new Error('');
    return this.ipcRenderer.invoke('generate-token');
  }

  //* Metodo para validar el token desde nodeJS (back);
  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this._http.get<{ valid: boolean }>(
          `${TOKEN_URL}/validate-token?token=${token}`,
        ),
      );
      console.log(response, 'response aqui papu');
      return response.valid || false;
    } catch {
      return false;
    }
  }
}
