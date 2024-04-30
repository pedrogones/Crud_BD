import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GateGuardRoutService {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role');
    const pkUser = localStorage.getItem('chavePrimaria');
    
    if (role && pkUser) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
