import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
   imports: [ButtonModule, InputTextModule],
  template: `
  <ng-container>
      <section class="background_login">

        <div
          class="w-[90%] h-[90%] text-white rounded-4xl xl:p-20 lg:p-20 md:p-16 p-8 bg-slate-800/50 flex flex-col items-center justify-start md:flex-row md:items-start md:justify-center gap-4"
        >
          <div class="w-full space-y-8">


            <section>
              <h1 class="font-semibold">Bienvenido de vuelta</h1>
              <h3>Por favor ingresa con tu cuenta.</h3>
            </section>
            <section>
              <form class="space-y-4 lg:w-[75%]">
                <fieldset>
                  <legend>Email</legend>
                  <input
                    pInputText
                    type="text"
                    class="bg-slate-900 p-4 rounded-xl w-full h-12"
                  />
                </fieldset>
                <fieldset>
                  <legend>Contraseña</legend>
                  <input
                    pInputText
                    type="password"
                    class="bg-slate-900 p-4 rounded-xl w-full h-12"
                  />
                </fieldset>
                <p-button
                  label="Iniciar sesion"
                  severity="contrast"
                  fluid="true"
                />
              </form>
            </section>
          </div>
          <div class="w-full h-full">
            <section
              class=" bg-slate-900 h-full sm:p-8 p-4 rounded-4xl relative"
            >
              <div
                class="absolute top-0 right-0 w-30 h-20 rounded-tr-4xl rounded-bl-4xl rounded-bl-4 bg-slate-700 z-0"
              ></div>
              <div
                class="absolute xl:-bottom-64 shadow-2xl border-4 border-white border-b-violet-300  shadow-violet-300/50 -bottom-40 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] xl:h-[300px] h-[200px] bg-slate-100 bg-gradient-to-r from-[#FEBCF2]  to-[#FEFEFE] rounded-4xl z-0"
              ></div>
              <h2 class="relative z-10">Bienvenido de vuelta a tu aplicacion favorita</h2>
            </section>
          </div>
        </div>
      </section>
    </ng-container>
  `
})
export class LoginComponent {

}
