import { Injectable } from '@angular/core';
import { AuthUser } from '../models/AuthUser';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private authUser: AuthUser = {
    id: 0,
    nome: '',
    role: -1,
    chavePrimaria: '',
    email: '',
    senha: ''
  };


  constructor() { }

  setAuthUser(authUser: AuthUser) {
    this.authUser = authUser;
  }

  getAuthUser(): AuthUser {
    return this.authUser;
  }

  setRole(role: any) {
    this.authUser.role = role;
  }

  getRole(): any {
    return this.authUser.role;
  }
  setChavePrimaria(chavePrimaria: string) {
    this.authUser.chavePrimaria = chavePrimaria;
  }

  getChavePrimaria(): any {
    return this.authUser.chavePrimaria;
  }
}
