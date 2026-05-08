import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ErrorResponse, UserLoginRequest } from './login.model';
import { AuthService } from '../auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  hide = true;
  toastr = inject(ToastrService);

  constructor(private authService: AuthService, private router: Router){

  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });



  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const formData = this.loginForm.value;

      const request: UserLoginRequest = {
       email: formData.email!,
       password: formData.password!
      }

      this.authService.loginUser(request).subscribe({
        next: (response) =>{
          console.log(response);
          try{
           sessionStorage.setItem("AuthToken", response.token);
           sessionStorage.setItem("User", response.name);
          }catch{
          this.toastr.error("Error while storing session.", 'Error');
          }
          this.toastr.success("Login Successfully!","Success");
          this.router.navigate(['dashboard'])
        },
        error: (e) =>{
          console.log(e.error?.message)
          this.toastr.error(e.error? e.error:'Something went wrong!' , 'Error');
        }
      })

    }
  }
}
