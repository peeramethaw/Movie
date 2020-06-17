import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowRegisterComponent } from './components/show-register/show-register.component';
import { RegisterComponent } from './components/register/register.component';



const routes: Routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register' ,component: RegisterComponent },
  {path: 'show', component: ShowRegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
