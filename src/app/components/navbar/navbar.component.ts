import { Component, OnDestroy, OnInit } from '@angular/core';
// Initialization for ES Users
import { Collapse, Dropdown, initTWE } from 'tw-elements';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { MatMenuModule } from '@angular/material/menu';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatCommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatMenuModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLogged: boolean = this.authService.isLoggedIn();
  loggedSub!: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private snackService: SnackbarService
  ) {}

  ngOnInit(): void {
    initTWE({ Collapse, Dropdown });
    this.loggedSub = this.authService.isLogged.subscribe((v) => {
      this.isLogged = v;
    });
  }
  ngOnDestroy(): void {
    this.loggedSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  onSnack() {
    this.snackService.openSnackBar();
  }
}
