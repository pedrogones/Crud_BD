import { CreateComponent } from './consultas/create/create.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { NgModule } from '@angular/core';
import { UpdateComponent } from './consultas/update/update.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent
  },
  { path: '', component: HomeComponent },
  { path: 'consultas', component: ConsultasComponent },
  { path: 'consultas/create', component: CreateComponent },
  { path: 'consultas/update/:id', component: UpdateComponent },
  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

