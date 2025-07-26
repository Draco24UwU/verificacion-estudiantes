import { Component, inject, OnInit } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { QrTokenService } from '../services/qr-generator.service';

@Component({
  selector: 'app-qr-generator',
  imports: [QRCodeComponent],
  template: `
    <section>
      <qrcode [qrdata]="qrData" [width]="350" />
    </section>
  `,
})
export class QrGenerator implements OnInit {
  private readonly service = inject(QrTokenService);
  public token = '';
  public qrData = '';

  async ngOnInit() {
    this.token = await this.service.generateToken();
    console.log(this.token);
    this.qrData = `${window.location.origin}/login/take-photo?token=${this.token}`;
  }
}
