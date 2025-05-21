import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth.service';
import { ReceipeModalComponent } from '../auth/receipe-modal/receipe-modal.component';
// import { ReceipeModalComponent } from '../modal/receipe-modal/receipe-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  myData: any;
  searchQuery: string = '';
  filteredRecipes: any;
  isLoading:boolean = true;



  ngOnInit(): void {
    this.getRecipeData();

  }

  constructor(private http: HttpClient,
    public authService: AuthService,
    private router:Router,
    private modalService: NgbModal
  ) {}
 
  getRecipeData() {
    this.http.get<any>(`http://localhost:3000/recipesData`).subscribe((res: any) => {
      // console.log(res, "response");
      this.myData = res;
      this.filteredRecipes = this.myData;
      this.isLoading = false;
    },error =>{
      this.isLoading = false;
    })
  }
  readMore(recipeId: string){
    this.router.navigate(['recipes-detail', recipeId]);
  }

  editRecipe(id:string) {
    this.router.navigate(['recipe-edit',id])
  }

  logout() {
    this.authService.logout()
  }

  searchRecipes() {
    if (this.searchQuery.trim()) {
      this.filteredRecipes = this.myData.filter((recipe: any) =>
        recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        recipe.summary.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        recipe.author.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredRecipes = this.myData;
    }

  }

  public user = {  }
  
  receipModal(){
      const modalRef = this.modalService.open(ReceipeModalComponent);
      modalRef.componentInstance.user = this.user;
      modalRef.result.then((result) => {
        if (result) {
          // console.log(result);
        }
      });
  }

  closeModal() {
    this.router.navigate(['home'])
  }
}
