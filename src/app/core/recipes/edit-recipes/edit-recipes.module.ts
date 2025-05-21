import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRecipesRoutingModule } from './edit-recipes-routing.module';
import { EditRecipesComponent } from './edit-recipes.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditRecipesComponent
  ],
  imports: [
    CommonModule,
    EditRecipesRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditRecipesModule { }
