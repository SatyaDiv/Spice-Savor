import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm!: FormGroup;

  constructor(private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.myForm = this.builder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    this.http.get<any>(`http://localhost:3000/signUpUsers`)
      .subscribe(response => {
        const user = response.find((a: any) => {
          return a.email === this.myForm.value.email && a.password === this.myForm.value.password
        });
        if (user) {
          const email = this.myForm.get('email')?.value;
          const password = this.myForm.get('password')?.value;
          localStorage.setItem('email', email);
          localStorage.setItem('pass', password)
          // alert("Login Success");
          this.myForm.reset();
          this.router.navigate(['/home'])
        } else {
          alert("User not found")
          this.myForm.reset()
        }
      }, error => {
        alert("Something went wrong from api..")

      })

    // if (this.myForm.valid) {
    //   const email = this.myForm.get('email')?.value;
    //   const password = this.myForm.get('password')?.value;
    //   localStorage.setItem('email', email);
    //   localStorage.setItem('pass',password)
    //   console.log(this.myForm.value);
    //   this.authService.login();
    // //   this.router.navigate(['/home'])
    // }
  }



}
