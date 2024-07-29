import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { LoginComponent } from './core/auth/login/login.component';
// import { AuthGuard } from './cactivate.guard';
import { SignupComponent } from './core/auth/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'signup', component:SignupComponent
  },
  {
    path: 'home', component: NavbarComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// canActivate:[AuthGuard]
