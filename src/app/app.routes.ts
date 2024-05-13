import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthFormComponent, canActivate: [authGuard] },
  { path: 'register', component: AuthFormComponent, canActivate: [authGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'addtask', component: TaskFormComponent, canActivate: [authGuard] },
];
