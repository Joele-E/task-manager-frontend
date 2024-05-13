import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthFormComponent } from '../auth-form/auth-form.component';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [MatCommonModule, CommonModule, AuthFormComponent],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss',
})
export class FormModalComponent {}
