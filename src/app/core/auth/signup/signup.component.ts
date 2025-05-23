import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      mobilenumber: ['',Validators.required]

    })
  }

  signUp() {
    this.http.post<any>(`http://localhost:3000/signUpUsers`,this.signupForm.value)
    .subscribe(response => {
      alert("Your account was successfully registered");
      this.signupForm.reset();
      this.router.navigate(['login']);
      
    })
  }

}
