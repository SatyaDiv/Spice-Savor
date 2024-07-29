import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { LoginComponent } from './core/auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,} from '@angular/common/http'


import { AuthService } from './auth.service';
import { RecipesListComponent } from './core/recipes/recipes-list/recipes-list.component';
import { RecipesSearchComponent } from './core/recipes/recipes-search/recipes-search.component';
import { SignupComponent } from './core/auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipesListComponent,
    RecipesSearchComponent,
    LoginComponent,
    SignupComponent,
  


    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  
    
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
