import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  isLogin: boolean;
  constructor(private route: ActivatedRoute) {
    let path = this.route.snapshot.url[0].path;

    this.isLogin = path === 'login';
  }
}
