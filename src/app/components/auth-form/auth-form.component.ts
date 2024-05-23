import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  isLogin: boolean;
  formContent = this.fb.group({
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    let path = this.route.snapshot.url[0].path;

    this.isLogin = path === 'login';
  }

  onLogin() {
    if (this.formContent.valid) {
      this.authService
        .authenticate(this.formContent.value)
        .pipe(first())
        .subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
    }
  }
  onRegister() {
    if (this.formContent.valid) {
      this.userService
        .addUser(this.formContent.value)
        .pipe(first())
        .subscribe(() => {
          //set sessionstorage
          this.authService
            .authenticate(this.formContent.value)
            .pipe(first())
            .subscribe(() => {
              this.router.navigate(['/dashboard']);
            });
        });
    }
  }
}
