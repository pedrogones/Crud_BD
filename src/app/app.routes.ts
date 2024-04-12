import { CreateComponent } from './consultas/create/create.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { NgModule } from '@angular/core';
import { UpdateComponent } from './consultas/update/update.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';
import { LayoutsComponent } from './layouts/layouts.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutsComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HomeComponent },
      { path: 'consultas', component: ConsultasComponent },
      { path: 'consultas/create', component: CreateComponent },
      { path: 'consultas/update/:id', component: UpdateComponent },
    ]
  },
  { path: '**', redirectTo: '/login' }, // Redireciona qualquer rota desconhecida para o login
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

