import { CreateComponent } from './consultas/create/create.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { UpdateComponent } from './consultas/update/update.component';
import { ConsultasComponent } from './consultas/consultas.component';



export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'consultas', component: ConsultasComponent},
  {path: 'consultas/create', component: CreateComponent},
  { path:'consultas/update/:id', component: UpdateComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

