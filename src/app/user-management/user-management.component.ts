import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 2rem; background: #f5f7fa; min-height: calc(100vh - 70px);">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h1 style="color: #2c3e50; margin-bottom: 0.5rem;">
          <i class="fas fa-users"></i> User Management
        </h1>
        <p style="color: #7f8c8d; margin-bottom: 2rem;">Manage system users and roles (Admin only)</p>

        <div *ngIf="users.length === 0 && !loading" style="text-align: center; padding: 2rem;">
          No users found
        </div>

        <div *ngIf="users.length > 0" style="background: white; border-radius: 12px; overflow-x: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #2c3e50; color: white;">
                <th style="padding: 12px; text-align: left;">ID</th>
                <th style="padding: 12px; text-align: left;">Username</th>
                <th style="padding: 12px; text-align: left;">Full Name</th>
                <th style="padding: 12px; text-align: left;">Email</th>
                <th style="padding: 12px; text-align: left;">Role</th>
                <th style="padding: 12px; text-align: left;">Created</th>
                <th style="padding: 12px; text-align: left;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users">
                <td style="padding: 12px; border-bottom: 1px solid #ecf0f1;">{{ user.id }}</td>
                <td style="padding: 12px; border-bottom: 1px solid #ecf0f1;">{{ user.username }}</td>
                <td style="padding: 12px; border-bottom: 1px solid #ecf0f1;">{{ user.fullName }}</td>
                <td style="padding: 12px; border-bottom: 1px solid #ecf0f1;">{{ user.email }}</td>
                <td style="padding: 12px; border-bottom: 1px solid #ecf0f1;">
                  <select [(ngModel)]="user.role" (change)="updateRole(user)" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ddd;">
                    <option value="VIEWER">VIEWER</option>
                    <option value="ANALYST">ANALYST</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #ecf0f1;">{{ user.createdAt | date:'short' }}</td>
                <td style="padding: 12px; border-bottom: 1px solid #ecf0f1;">
                  <button (click)="deleteUser(user.id)" style="background: #e74c3c; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  loading = true;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.get('http://localhost:8081/api/admin/users', { headers }).subscribe({
      next: (data: any) => {
        this.users = data;
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Users loaded:', data.length);
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateRole(user: any): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put(`http://localhost:8081/api/admin/users/${user.id}/role`, { role: user.role }, { headers }).subscribe({
      next: () => {
        alert(`User ${user.username} role updated to ${user.role}`);
        this.fetchUsers();
      },
      error: (err) => console.error('Error updating role:', err)
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.delete(`http://localhost:8081/api/admin/users/${id}`, { headers }).subscribe({
        next: () => {
          this.fetchUsers();
          alert('User deleted successfully');
        },
        error: (err) => console.error('Error deleting user:', err)
      });
    }
  }
}
