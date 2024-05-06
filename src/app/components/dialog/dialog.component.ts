import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Modal, Ripple, initTWE } from 'tw-elements';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  ngOnInit(): void {
    initTWE({ Modal, Ripple });
  }
}
