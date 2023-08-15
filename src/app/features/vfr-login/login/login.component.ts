import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from "../../../shared/services";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslocoModule} from "@ngneat/transloco";

@Component({
  selector: 'vfr-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslocoModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(private readonly fb: NonNullableFormBuilder,
              private readonly authService: AuthService) {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get emailValid() {
    return this.loginForm.get('email')?.valid;
  }
  get emailTouched() {
    return this.loginForm.get('email')?.touched;
  }

  get passwordValid() {
    return this.loginForm.get('password')?.valid;
  }

  get passwordTouched() {
    return this.loginForm.get('password')?.touched;
  }


  login(): void {
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      console.log(this.loginForm.getRawValue())
      this.authService.login({...this.loginForm.getRawValue()})
    }
  }

}
