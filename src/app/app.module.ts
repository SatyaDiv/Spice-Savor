import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { LoginComponent } from './core/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,} from '@angular/common/http'
import { AuthService } from './auth.service';
import { RecipesListComponent } from './core/recipes/recipes-list/recipes-list.component';
import { RecipesSearchComponent } from './core/recipes/recipes-search/recipes-search.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { AddRecipesComponent } from './core/recipes/add-recipes/add-recipes.component';
import { ReadMoreRecipesComponent } from './core/recipes/recipes-list/read-more-recipes/read-more-recipes.component';
import { ReceipeModalComponent } from './core/auth/receipe-modal/receipe-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipesListComponent,
    RecipesSearchComponent,
    LoginComponent,
    SignupComponent,
    AddRecipesComponent,
    ReadMoreRecipesComponent,
    ReceipeModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  // entryComponents: [ ReceipeModalComponent ]
})
export class AppModule { }
