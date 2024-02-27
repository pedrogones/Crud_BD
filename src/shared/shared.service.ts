import { Injectable } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private router: Router, private route: ActivatedRoute) { }

  create(): void {
    this.router.navigate(['/create'], { relativeTo: this.route });
  }
   update() {
    this.router.navigate(['/update'], { relativeTo: this.route });
  }
}
