import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { RecipesModel } from '../recipe.model';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipes',
  templateUrl: './add-recipes.component.html',
  styleUrls: ['./add-recipes.component.css']
})
export class AddRecipesComponent implements OnInit {
  addrecipeform!: FormGroup;
  recipeModelObj: RecipesModel = new RecipesModel();
  uploads: string[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addrecipeform = this.formbuilder.group({
      title: ['', Validators.required],
      cookingTime: ['', Validators.required],
      summary: ['', Validators.required],
      level: ['', Validators.required],
      category: ['', Validators.required],
      image: ['',Validators.required],
      author: ['', Validators.required],
      ingredients: ['', Validators.required],
      steps: this.formbuilder.array([this.createStepField()])
    });
  }

  createStepField(): any {
    return this.formbuilder.control('', Validators.required);
  }

  get steps(): FormArray {
    return this.addrecipeform.get('steps') as FormArray;
  }

  addStep(): void {
    this.steps.push(this.createStepField());
  }

  removeStep(index: number): void {
    if (this.steps.length > 1) {
      this.steps.removeAt(index);
    }
  }

  postRecipeData(): void {
    if (this.addrecipeform.valid) {
      this.recipeModelObj.id = this.addrecipeform.value.id;
      this.recipeModelObj.title = this.addrecipeform.value.title;
      this.recipeModelObj.cookingTime = this.addrecipeform.value.cookingTime;
      this.recipeModelObj.summary = this.addrecipeform.value.summary;
      this.recipeModelObj.level = this.addrecipeform.value.level;
      this.recipeModelObj.category = this.addrecipeform.value.category;
      this.recipeModelObj.image = this.uploads; // Updated to use uploads array
      this.recipeModelObj.author = this.addrecipeform.value.author;
      this.recipeModelObj.ingredients = this.addrecipeform.value.ingredients;
      // Corrected to extract the values from the steps FormArray
      this.recipeModelObj.steps = this.addrecipeform.value.steps;
      this.authService.postRecipe(this.recipeModelObj).subscribe(
        (res) => {
          // alert('Recipe Added Successfully');
          this.addrecipeform.reset();
          this.router.navigate(['/home']);
        },
        (err) => {
          alert('Error while adding recipe');
        }
      );
    }
  }

  saveImages(event: any): void {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploads.push(e.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeImage(index: number): void {
    this.uploads.splice(index, 1);
  }

  goBack() {
    this.router.navigate(['home'])
  }
}
