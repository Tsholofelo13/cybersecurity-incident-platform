import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="min-height: 100vh; display: flex; justify-content: center; align-items: center; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 2rem;">
      <div style="background: white; border-radius: 20px; padding: 2.5rem; width: 100%; max-width: 500px;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <i class="fas fa-user-plus" style="font-size: 3rem; color: #3498db;"></i>
          <h1 style="color: #2c3e50;">Create Account</h1>
          <p style="color: #7f8c8d;">Join CyberShield Security Platform</p>
        </div>

        <form (ngSubmit)="onSubmit()">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem;">Full Name</label>
            <input type="text" [(ngModel)]="user.fullName" name="fullName" required style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem;">Username</label>
            <input type="text" [(ngModel)]="user.username" name="username" required style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem;">Email</label>
            <input type="email" [(ngModel)]="user.email" name="email" required style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem;">Password</label>
            <input type="password" [(ngModel)]="user.password" name="password" required style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem;">Confirm Password</label>
            <input type="password" [(ngModel)]="confirmPassword" name="confirmPassword" required style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem;">Role</label>
            <select [(ngModel)]="user.role" name="role" style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
              <option value="VIEWER">Viewer</option>
              <option value="ANALYST">Analyst</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button type="submit" style="width: 100%; padding: 0.75rem; background: linear-gradient(135deg, #3498db, #2c3e50); color: white; border: none; border-radius: 10px; font-size: 1rem; cursor: pointer;" [disabled]="loading">
            {{ loading ? 'Creating Account...' : 'Register' }}
          </button>
          <div *ngIf="errorMessage" style="margin-top: 1rem; padding: 0.75rem; background: #fee; color: #e74c3c; border-radius: 8px;">{{ errorMessage }}</div>
          <div style="text-align: center; margin-top: 1.5rem;">
            Already have an account? <a routerLink="/login" style="color: #3498db;">Login here</a>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  user = { fullName: '', username: '', email: '', password: '', role: 'VIEWER' };
  confirmPassword = '';
  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    
    this.loading = true;
    this.errorMessage = '';
    
    this.http.post('http://localhost:8081/api/auth/register', this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
