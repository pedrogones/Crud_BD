import { CreateComponent } from './consultas/create/create.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { NgModule } from '@angular/core';
import { ConsultasComponent } from './consultas/consultas.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileMedicoComponent } from './profile-medico/profile-medico.component';
import { TesteComponent } from './teste/teste/teste.component';
import { HistoricoComponent } from './home/historico/historico.component';
import { GateGuardRoutService } from './guard/gate-guard-rout.service';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutsComponent,
    canActivate: [GateGuardRoutService], // Use o guarda de rota para proteger este grupo de rotas
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HomeComponent },
      { path: 'dashboard/historico', component: HistoricoComponent },
      { path: 'teste', component: TesteComponent },
      { path: 'consultas', component: ConsultasComponent },
      { path: 'perfil-medico', component: ProfileMedicoComponent },
      { path: 'perfil-paciente', component: ProfileComponent },
      { path: 'perfil-admin', component: ProfileAdminComponent },
      { path: 'consultas/create', component: CreateComponent },
    ]
  },
  { path: '**', redirectTo: '/login' }, // Redireciona qualquer rota desconhecida para o login
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

