import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowRegisterComponent } from './components/show-register/show-register.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'register' ,component: RegisterComponent },
  {path: 'show', component: ShowRegisterComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
