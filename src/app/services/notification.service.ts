import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  // Helper method to show success notification
  showSuccessNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'start',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  // Helper method to show error notification
  showErrorNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 10000, // Duration in milliseconds
      horizontalPosition: 'start',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
