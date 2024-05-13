import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  message = 'asdfadsfas';
  constructor(private _snackBar: MatSnackBar) {}
  setMessage(message: string) {
    this.message = message;
  }
  openSnackBar() {
    this._snackBar.open(this.message, 'close', { duration: 3000 });
  }
}
