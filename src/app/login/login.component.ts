import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="min-height: 100vh; display: flex; justify-content: center; align-items: center; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);">
      <div style="background: white; border-radius: 20px; padding: 2rem; width: 100%; max-width: 400px;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <i class="fas fa-shield-alt" style="font-size: 3rem; color: #3498db;"></i>
          <h1 style="color: #2c3e50;">CyberShield Security</h1>
          <p style="color: #7f8c8d;">Incident Intelligence Platform</p>
        </div>
        
        <form (ngSubmit)="onSubmit()">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem;">Username</label>
            <input type="text" [(ngModel)]="username" name="username" required style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem;">Password</label>
            <input type="password" [(ngModel)]="password" name="password" required style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
          </div>
          <button type="submit" style="width: 100%; padding: 0.75rem; background: linear-gradient(135deg, #3498db, #2c3e50); color: white; border: none; border-radius: 10px; cursor: pointer;" [disabled]="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
          <div *ngIf="errorMessage" style="margin-top: 1rem; padding: 0.75rem; background: #fee; color: #e74c3c; border-radius: 8px;">{{ errorMessage }}</div>
        </form>
        <div style="text-align: center; margin-top: 1.5rem;">
          Don't have an account? <a routerLink="/register" style="color: #3498db;">Register here</a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.http.post('http://localhost:8081/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
