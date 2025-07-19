import { Injectable, signal } from '@angular/core';
import { User } from '../../../shared/types/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private $user = signal<User | null>(null);

  // *  Getters y Setters del servicio.
  public get user() {
    return this.$user();
  }
  public set user(user: User | null) {
    this.$user.set(user);
  }
}
