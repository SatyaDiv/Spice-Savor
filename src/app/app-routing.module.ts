import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './cactivate.guard';
import { SignupComponent } from './core/auth/signup/signup.component';
import { AddRecipesComponent } from './core/recipes/add-recipes/add-recipes.component';
import { RecipesSearchComponent } from './core/recipes/recipes-search/recipes-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () =>
      import('./core/auth/login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'signup',
    loadChildren: () =>
      import('./core/auth/signup/signup.module').then((m) => m.SignupModule),
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./core/navbar/navbar.module').then((m) => m.NavbarModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'home/add-recipes',
    loadChildren: () =>
      import('./core/recipes/add-recipes/add-recipes.module').then(
        (m) => m.AddRecipesModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'recipes-detail/:id',
    loadChildren: () =>
      import('./core/recipes/recipes-search/recipes-search.module').then(
        (m) => m.RecipesSearchModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'recipe-edit/:id',
    loadChildren: () =>
      import('./core/recipes/edit-recipes/edit-recipes.module').then(
        (m) => m.EditRecipesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
