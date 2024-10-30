import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesSearchComponent } from './recipes-search.component';

const routes: Routes = [{path:'', component: RecipesSearchComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesSearchRoutingModule { }
