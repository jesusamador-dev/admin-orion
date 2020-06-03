import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  logging = false;
  errorsLogin: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.createLoginForm();
  }

  private createLoginForm() {
    return this.fb.group({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ])
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      this.logging = true;
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (result) => {
          if (result.success === true) {
            console.log('Amonos');
            this.router.navigateByUrl('/departments');
          } else {
            this.errorsLogin = result.error;
          }
          this.logging = false;
        },
        (error) => {
          this.logging = false;
          console.log(error);
        });
    } else {
      this.loginForm.controls.email.markAsTouched();
      this.loginForm.controls.password.markAsTouched();
    }

  }

  passwordInvalid() {
    if (this.loginForm.controls.password.invalid && (this.loginForm.controls.password.dirty || this.loginForm.controls.password.touched)) {
      return true;
    }
    return false;
  }

  emailInvalid() {
    if (this.loginForm.controls.email.invalid && (this.loginForm.controls.email.dirty || this.loginForm.controls.email.touched)) {
      return true;
    }
    return false;
  }
}
