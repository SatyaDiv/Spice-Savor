import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipesComponent } from './add-recipes.component';

const routes: Routes = [{path:'', component:AddRecipesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRecipesRoutingModule { }
