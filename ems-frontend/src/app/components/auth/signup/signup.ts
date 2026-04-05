import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../auth-service';
import { UserSignupRequest } from './signup.model';
import { ErrorResponse } from '../login/login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule 
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup {
  
  toastr = inject(ToastrService);

  constructor(private authService: AuthService, private router: Router){}
  
  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('',[Validators.required]),
  });

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      const formValue = this.signupForm.value;

      const payload: UserSignupRequest = {
        name: (formValue.firstName || '') + ' ' + (formValue.lastName || ''),
        email: formValue.email!,
        password: formValue.password!,
        phone: formValue.phone!,
        role: formValue.role!
      };

      this.authService.signupUser(payload).subscribe({
          next: (response) => {
            console.log('Signup success', response);
            this.toastr.success("Signup Successfully!", "Success");
            this.router.navigate(["login"]);
          },
          error: (e) => {
            console.log(e.error.message);
            this.toastr.error(e.error.message, "Error");
          }
        })

    }
  }
}
