import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) { }
  myData: any = [];
  ngOnInit(): void {
    this.getRecipeData();
  }
  getRecipeData() {
    this.http.get<any>(`http://localhost:3000/recipesData`).subscribe((res: any) => {
      console.log(res, "response");
      this.myData = res;
    })
  }
  readMore(recipeId: string){
    // this.router.navigate(['recipes-search'])
    this.router.navigate(['recipes-search', recipeId]);
  }
}
