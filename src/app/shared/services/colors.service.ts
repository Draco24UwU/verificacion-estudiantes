import { Injectable } from '@angular/core';
import { store } from '../classes/store';
import { Common } from '../classes/common';
import { ColorsCommonConfig } from '../types/colors.type';

export interface color {
  rgb: string;
  hex: string;
}
export interface configuration {
  variation: number;
  base: number;
}
type channel = 'r' | 'g' | 'b';
type palette = 'random' | 'warm' | 'cool';

@Injectable({
  providedIn: 'root',
})
export class ColorsService extends Common<typeof ColorsCommonConfig> {
  // * Atributos del servicio.
  public colors = store<color[]>([]);

  // * Constructor del servicio.
  constructor() {
    super({
      forms: ColorsCommonConfig.forms,
      routes: ColorsCommonConfig.routes,
    });

    this.generateColors('warm', 10);
    console.log(this.colors.data);

    this.APIrequest('test').then(v => v);
  }

  // * Metodos del servicio.
  public generateColors(palette: palette = 'random', amount = 6) {
    let newColors: color[];

    switch (palette) {
      case 'random':
        newColors = this.generateRandomColors(amount);
        break;
      case 'cool':
        newColors = this.generateCoolColors(amount);
        break;
      case 'warm':
        newColors = this.generateWarmColors(amount);
        break;
    }

    // Asignar un NUEVO array para forzar la animación
    this.colors.data = [...newColors]; // o Array.from(newColors)
  }

  // * Metodo para generar un color con variacion de color.
  private generateColor({
    r,
    g,
    b,
  }: {
    r?: configuration;
    g?: configuration;
    b?: configuration;
  } = {}): color {
    if (r && r.variation + r.base > 254) {
      throw new Error(
        'Tu variacion y base juntos en r no pueden superar el valor de 254',
      );
    }
    if (g && g.variation + g.base > 254) {
      throw new Error(
        'Tu variacion y base en g juntos no pueden superar el valor de 254',
      );
    }
    if (b && b.variation + b.base > 254) {
      throw new Error(
        'Tu variacion y base en b juntos no pueden superar el valor de 254',
      );
    }
    const _r =
      Math.floor(Math.random() * (r?.variation ?? 254 + 1)) + (r?.base ?? 0);
    const _g =
      Math.floor(Math.random() * (g?.variation ?? 254 + 1)) + (g?.base ?? 0);
    const _b =
      Math.floor(Math.random() * (b?.variation ?? 254 + 1)) + (b?.base ?? 0);

    const rgb = this.toRgb(_r, _g, _b);
    const hex = this.toHex(_r, _g, _b);
    return { rgb, hex };
  }

  private generateRandomColors(amount: number) {
    const colors: color[] = [];
    for (let i = 0; i < amount; i++) {
      const color = this.generateColor();
      colors.push(color);
    }
    return colors;
  }

  private generateCoolColors(amount: number, monochromatic = false): color[] {
    const colors: color[] = [];
    if (monochromatic) {
      const baseCoolColor = this.generateColor({
        r: { variation: 60, base: 0 },
        g: { variation: 100, base: 100 },
        b: { variation: 100, base: 150 },
      });
      for (let i = 0; i < amount; i++) {
        //* Calcular el factor de progresión (0 a 1)
        const factor = i / (amount - 1);
        const color = this.generateMonochromaticColor(baseCoolColor, factor);
        colors.push(color);
      }
    } else {
      for (let i = 0; i < amount; i++) {
        const color = this.generateColor({
          r: { variation: 60, base: 0 },
          g: { variation: 100, base: 100 },
          b: { variation: 100, base: 150 },
        });
        colors.push(color);
      }
    }
    return this.sortColors(colors, 'b');
  }

  private generateWarmColors(amount: number, monochromatic = true): color[] {
    const colors: color[] = [];
    if (monochromatic) {
      const baseWarmColor = this.generateColor({
        r: { variation: 100, base: 150 },
        g: { variation: 100, base: 100 },
        b: { variation: 60, base: 0 },
      });
      for (let i = 0; i < amount; i++) {
        //* Calcular el factor de progresión (0 a 1)
        const factor = i / (amount - 1);
        const color = this.generateMonochromaticColor(baseWarmColor, factor);
        colors.push(color);
      }
    } else {
      for (let i = 0; i < amount; i++) {
        const color = this.generateColor({
          r: { variation: 50, base: 200 },
          g: { variation: 100, base: 100 },
          b: { variation: 60, base: 0 },
        });
        colors.push(color);
      }
    }
    return this.sortColors(colors, 'r');
  }

  // * Metodos auxiliares para los colores.
  private generateMonochromaticColor(color: color, factor: number): color {
    // Ajustar la luminosidad basada en el factor
    const lightnessFactor = 0.5 + factor * 0.5; // Variar entre 0.5 y 1
    const colors = color.rgb.match(/\d+/g)!.map(Number);

    // Calcular nuevos componentes con variación monocromática
    const r = Math.min(255, Math.floor(colors[0] * lightnessFactor));
    const g = Math.min(255, Math.floor(colors[1] * lightnessFactor));
    const b = Math.min(255, Math.floor(colors[2] * lightnessFactor));

    const rgb = this.toRgb(r, g, b);
    const hex = this.toHex(r, g, b);
    return { rgb, hex };
  }

  private sortColors(color: color[], sortBy: channel) {
    const index = { r: 0, g: 1, b: 2 }[sortBy];
    return color.sort((a, b) => {
      const _a = a.rgb.match(/\d+/g)!.map(Number)[index];
      const _b = b.rgb.match(/\d+/g)!.map(Number)[index];
      return _a - _b;
    });
  }

  // * Metodos de transformacion de sistemas de colores.
  private toHex(r: number, g: number, b: number) {
    const format = (n: number) => n.toString(16).padStart(2, '0');
    return `#${format(r)}${format(g)}${format(b)}`;
  }
  private toRgb(r: number, g: number, b: number) {
    return `rgb(${r},${g},${b})`;
  }
}
