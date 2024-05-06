import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthFormComponent },
  { path: 'register', component: AuthFormComponent },
];
