import { Injectable } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private router: Router, private route: ActivatedRoute) { }
  consultas() {
    this.router.navigate([''], { relativeTo: this.route });
  }
  home(){
    this.router.navigate(['consultas'], { relativeTo: this.route });
  }
  create(): void {
    this.router.navigate(['consultas/create'], { relativeTo: this.route });
  }
   update(id: number) {
    this.router.navigate(['consultas/update', id], { relativeTo: this.route });
  }
}
