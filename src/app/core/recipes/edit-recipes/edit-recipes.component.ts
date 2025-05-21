import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { RecipesModel } from '../recipe.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-recipes',
  templateUrl: './edit-recipes.component.html',
  styleUrls: ['./edit-recipes.component.css'],
})
export class EditRecipesComponent implements OnInit {
  editrecipeform!: FormGroup;
  uploads: string[] = [];
  myData: any;
  recipeId: string | null = null;
  isLoading: boolean = true;
  recipeTitle: string = '';
  previewImage: string = '';
  imageName: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editrecipeform = this.formbuilder.group({
      recipeTitle: ['', Validators.required], // Changed from title
      cookingTime: ['', Validators.required],
      summary: ['', Validators.required],
      level: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      author: ['', Validators.required],
      ingredients: ['', Validators.required],
      steps: this.formbuilder.array([]),
    });

    this.route.paramMap.subscribe((params) => {
      this.recipeId = params.get('id') || '';
      this.getRecipeData(this.recipeId);
    });
  }
  createStepField(): any {
    return this.formbuilder.control('', Validators.required);
  }

  get steps(): FormArray {
    return this.editrecipeform.get('steps') as FormArray;
  }

  addStep(): void {
    this.steps.push(new FormControl('', Validators.required));
  }

  removeStep(index: number): void {
    if (this.steps.length > 1) {
      this.steps.removeAt(index);
    }
  }

  // Fetch Recipe Data
  getRecipeData(id: string) {
    this.authService.getRecipeDataByID(id).subscribe({
      next: (recipe: any) => {
        console.log(recipe);
        
        this.isLoading = false;
        this.recipeTitle = recipe.title;

        // Clear existing steps
        while (this.steps.length) {
          this.steps.removeAt(0);
        }
        

        // Handle image data properly
        if (
          recipe.image &&
          Array.isArray(recipe.image) &&
          recipe.image.length > 0
        ) {
          this.previewImage = recipe.image[0]; // Store the image for preview

          // Extract filename if image is a URL, otherwise set a placeholder name
        const imageUrl = recipe.image[0];
        this.imageName = imageUrl.includes('/')
          ? imageUrl.split('/').pop() || 'Uploaded Image'
          : 'Uploaded Image';

          // Also set it in the form
          this.editrecipeform.patchValue({
            image: recipe.image[0],
          });
        }

        // Rest of the form patching
        this.editrecipeform.patchValue({
          recipeTitle: recipe.title,
          cookingTime: recipe.cookingTime,
          summary: recipe.summary,
          level: recipe.level,
          category: recipe.category,
          author: recipe.author,
          ingredients: recipe.ingredients,
        });

        // Populate steps
        if (recipe.steps && Array.isArray(recipe.steps)) {
          recipe.steps.forEach((step: string) => {
            this.steps.push(this.formbuilder.control(step));
          });
        }

        if (this.steps.length === 0) {
          this.addStep();
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching recipe:', err);
      },
    });
  }

  // Update the saveImages method
  saveImages(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      this.imageName = file.name; // Store the uploaded file name
      reader.onload = (e: any) => {
        const imageBase64 = e.target.result;
        this.previewImage = imageBase64;

        // Update form control
        this.editrecipeform.patchValue({
          image: imageBase64,
        });

        // Clear and update uploads array
        this.uploads = [imageBase64];
      };

      reader.readAsDataURL(file);
    }
  }

  putRecipeData(): void {
    if (this.editrecipeform.invalid) {
      console.log('Form is invalid', this.editrecipeform.value);
      return;
    }

    const formData = this.editrecipeform.getRawValue();
    const id = this.recipeId;

    // Use the previewImage for the submission
    const imageData = this.previewImage ? [this.previewImage] : [];

    const updatePayload = {
      title: this.recipeTitle,
      cookingTime: formData.cookingTime,
      summary: formData.summary,
      level: formData.level,
      category: formData.category,
      image: imageData, // Send as array
      author: formData.author,
      ingredients: formData.ingredients,
      steps: formData.steps || [],
    };

    console.log('Sending update payload:', updatePayload);

    this.authService.updateRecipe(id, updatePayload).subscribe({
      next: (response) => {
        console.log('Recipe updated successfully:', response);
        alert('Recipe updated successfully!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error updating recipe:', err);
        alert('Error updating recipe. Please try again.');
      },
    });
  }

  removeImage(index: number): void {
    this.uploads.splice(index, 1);
  }

  goBack() {
    this.router.navigate(['home']);
  }
}
