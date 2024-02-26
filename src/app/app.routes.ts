import { CreateComponent } from './create/create.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { UpdateComponent } from './update/update.component';



export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create', component: CreateComponent},
  { path: 'update', component: UpdateComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

