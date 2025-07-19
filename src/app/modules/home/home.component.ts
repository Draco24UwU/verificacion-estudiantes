import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-home',
  imports: [ImageModule, TooltipModule, ButtonModule],
  template: `
    <aside class="flex flex-col gap-16">
      <section
        class="h-[95svh] flex sm:flex-row flex-col justify-center items-center gap-4"
      >
        <div
          class="sm:flex-1 max-w-full w-full h-full flex flex-col gap-2 justify-between items-start bg-red-100 p-4 rounded-2xl bg-cover bg-center bg-no-repeat"
          style="background-image: url('./img/bread-menu-main.avif');"
        >
          <div class="w-full min-h-[10dvh] space-y-2">
            <img
              src="./img/bread-logo.svg"
              alt="logo"
              height="150px"
              width="150px"
            />
            <p class="text-bread-50 bg-bread-800 rounded-2xl p-2">
              Conoce todos nuestros deliciosos panes!
            </p>
          </div>
          <div class="w-full bg-bread-800 p-2 rounded-2xl h-fit">
            <ul class="flex items-center justify-around gap-2">
              <li>
                <p-image
                  src="./img/baguete.avif"
                  alt="bollos"
                  width="150px"
                  height="150px"
                  pTooltip="Baguets"
                  tooltipPosition="top"
                  imageClass="rounded-full hover:outline-2 hover:-rotate-20 hover:outline-bread-50 hover:scale-105 transition-all duration-100 ease-in-out"
                />
              </li>
              <li>
                <p-image
                  src="./img/cuernito.avif"
                  alt="bollos"
                  width="150px"
                  height="150px"
                  pTooltip="Cuernitos"
                  tooltipPosition="top"
                  imageClass="rounded-full hover:outline-2 hover:-rotate-20 hover:outline-bread-50 hover:scale-105 transition-all duration-100 ease-in-out"
                />
              </li>
              <li>
                <p-image
                  src="./img/dona.avif"
                  alt="bollos"
                  width="150px"
                  height="150px"
                  pTooltip="Donas"
                  tooltipPosition="top"
                  imageClass="rounded-full hover:outline-2 hover:-rotate-20 hover:outline-bread-50 hover:scale-105 transition-all duration-100 ease-in-out"
                />
              </li>
            </ul>
          </div>
        </div>
        <div
          class="sm:flex-2 flex flex-col justify-between items-center max-w-full w-full h-full bg-bread-800 p-4 relative rounded-2xl"
        >
          <div class="space-y-4">
            <h2>
              Descubre la mejor panaderia de
              <span class="text-bread-400 font-bold">hidalgo</span>
              con nuestro sabor tradicional que nos distingue desde
              <strong>1975.</strong>
            </h2>
            <div
              class="w-full flex sm:justify-start justify-between items-center gap-2"
            >
              <button
                pButton
                rounded="true"
                class="bg-bread-200! pointer-events-none font-bold text-2xl"
              >
                Conoce nuestro menu
              </button>
              <button
                pButton
                class="bg-bread-900! text-bread-50! border-none! hover:scale-105 hover:bg-bread-950! transition-all! duration-200! ease-in-out!"
                rounded="true"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div
            class="w-1/2 flex items-center justify-center sm:block hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <img src="./img/long-bread.avif" alt="long" class="rotate-45" />
          </div>
          <div class="w-full flex gap-4 justify-between">
            <h4>
              Mas de 1000+
              <i class="fa-solid fa-bread-slice"></i>
              clientes diarios.
            </h4>
            <h4>
              Mas de 5000+
              <i class="fa-solid fa-star"></i>
              reseñas.
            </h4>
          </div>
        </div>
      </section>
      <section class="w-full flex gap-4 flex-wrap scroll-reveal">
        <div
          class="sm:flex-2 flex-1 min-h-[50dvh] p-8 bg-bread-800 rounded-2xl flex flex-col justify-between gap-4 relative group shadow-2xl"
        >
          <h1 class="font-bold">Prueba nuestro nuevo pan blanco!</h1>
          <div class="flex items-center justify-between gap-4">
            <h4 class="text-bread-400 border-bread-50 rounded-2xl p-2 border">
              Fresco todos los dias y listo para ordenar
            </h4>
            <h4>Desde 1975</h4>
          </div>
          <div
            class="w-fit rotate-[15deg] group-hover:rotate-[360deg] group-hover:opacity-75 transition-all duration-250 ease-in-out absolute top-1/2 left-1/2 -translate-x-3/5 -translate-y-1/2"
          >
            <div class="relative ">
              <img
                src="./img/bread-menu-nobg.avif"
                class="text-center self-cente drop-shadow"
                alt="bread"
              />
              <h4
                class="hidden hover:scale-105 hover:text-bread-50 hover:bg-bread-500 hover:border-bread-900 border hover:cursor-pointer group-hover:block absolute rotate-[15deg] top-1/2 left-1/2 -translate-x-3/5 -translate-y-1/2 p-2 text-center bg-amber-950 rounded-full"
              >
                Desde 150MXN!
              </h4>
            </div>
          </div>
        </div>
        <div class="flex-1 bg-bread-800 rounded-2xl p-8 space-y-4">
          <h4 class="font-bold">
            Ya nos conoces? Registrate a nuestro programa de lealtad y recibe
            descuentos exclusivos
          </h4>
          <img
            src="./img/bread-menu-2.avif"
            class="text-center self-center rounded-2xl"
            alt="bread"
          />
        </div>
      </section>
    </aside>
  `,
  styles: [
    `
      .drop-shadow {
        filter: drop-shadow(1px 1px 20px #fef0c7);
      }
    `,
  ],
})
export class HomeComponent {}
