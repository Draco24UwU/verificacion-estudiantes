import { Component } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-generator',
  imports: [QRCodeComponent],
  template: `
    <section>
      <qrcode [qrdata]="qrData" [width]="350" />
    </section>
  `,
})
export class QrGenerator {
  qrData = `${window.location.origin}/login/take-photo`;
}
