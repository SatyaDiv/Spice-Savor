import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = true;

  constructor(private router: Router,
    private http: HttpClient
  ) { }

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
    return this.http.post<any>(`http://localhost:3000/recipesData`, data)
      .pipe(map((response) => {
        return response;
      }));
  }
}
