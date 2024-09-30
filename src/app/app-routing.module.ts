import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './cactivate.guard';
import { SignupComponent } from './core/auth/signup/signup.component';
import { AddRecipesComponent } from './core/recipes/add-recipes/add-recipes.component';
import { RecipesListComponent } from './core/recipes/recipes-list/recipes-list.component';
import { RecipesSearchComponent } from './core/recipes/recipes-search/recipes-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'signup', component:SignupComponent
  },
  {
    path: 'home', component: NavbarComponent,canActivate:[AuthGuard]
  },
  {
    path: 'home/add-recipes', component: AddRecipesComponent,canActivate:[AuthGuard]
  },
  {
    path: 'home/add-recipes/recipes-lists', component:RecipesListComponent,canActivate:[AuthGuard]
  },
  {
    path: 'recipes-search/:id', component: RecipesSearchComponent, canActivate:[AuthGuard]
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


