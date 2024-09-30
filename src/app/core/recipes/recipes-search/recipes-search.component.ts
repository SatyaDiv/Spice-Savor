import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-search',
  templateUrl: './recipes-search.component.html',
  styleUrls: ['./recipes-search.component.css']
})
export class RecipesSearchComponent implements OnInit {
  myData: any = [];
  selectedRecipe: any;
  filteredRecipes: any;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRecipeData();
  }

  getRecipeData() {
    this.http.get<any>('http://localhost:3000/recipesData').subscribe((res: any) => {
      // console.log(res, "response");
      this.myData = res;
      this.filteredRecipes = this.myData;

      // Get the ID from the route parameter
      const recipeId = this.activatedRoute.snapshot.paramMap.get('id');
      if (recipeId) {
        // Find the specific recipe by ID
        this.selectedRecipe = this.myData.find((recipe: any) => recipe.id === recipeId);

        if (this.selectedRecipe && typeof this.selectedRecipe.title === 'string') {
          this.selectedRecipe.title = [this.selectedRecipe.title];
        }

        if (this.selectedRecipe && typeof this.selectedRecipe.cookingTime === 'string') {
          this.selectedRecipe.cookingTime = [this.selectedRecipe.cookingTime];
        }

        if (this.selectedRecipe && typeof this.selectedRecipe.summary === 'string') {
          this.selectedRecipe.summary = [this.selectedRecipe.summary];
        }

        if (this.selectedRecipe && typeof this.selectedRecipe.level === 'string') {
          this.selectedRecipe.level = [this.selectedRecipe.level];
        }

        if (this.selectedRecipe && typeof this.selectedRecipe.category === 'string') {
          this.selectedRecipe.category = [this.selectedRecipe.category];
        }

        if (this.selectedRecipe && typeof this.selectedRecipe.author === 'string') {
          this.selectedRecipe.author = [this.selectedRecipe.author];
        }

        // Convert ingredients to an array if it's a string
        if (this.selectedRecipe && typeof this.selectedRecipe.ingredients === 'string') {
          this.selectedRecipe.ingredients = this.selectedRecipe.ingredients.split('\n').map((item: string) => item.trim());
        }

        // Filter out empty steps if any
        if (this.selectedRecipe && this.selectedRecipe.steps) {
          this.selectedRecipe.steps = this.selectedRecipe.steps.filter((step: string) => step.trim() !== '');
        }
      }
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
