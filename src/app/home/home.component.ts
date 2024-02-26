import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
constructor(
  private sharedService: SharedService){
}
create(){
  this.sharedService.create();
}
update(){
  this.sharedService.update();
}
delete(){
  this.sharedService.delete();
}

}
