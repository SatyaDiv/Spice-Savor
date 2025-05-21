import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = true;

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.isAuthenticated = true;
    this.router.navigate(['/home']);
  }

  logout() {
    this.isAuthenticated = true;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  postRecipe(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/recipesData`, data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getRecipeDataByID(id: string) {
    return this.http
      .get<any[]>(`http://localhost:3000/recipesData`)
      .pipe(
        map((recipes) => recipes.find((recipe) => recipe.id === id) || null)
      );
  } 

  updateRecipe(id: any, data: any) {
    return this.http
      .put<any>(`http://localhost:3000/recipesData/${id}`, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  

  deleteRecipe(id: any) {
    return this.http.delete<any>(`http://localhost:3000/recipesData`, id).pipe(
      map((reponse) => {
        return reponse;
      })
    );
  }
}
