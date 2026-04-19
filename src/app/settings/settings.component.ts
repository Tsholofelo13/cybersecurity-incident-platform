import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); min-height: calc(100vh - 70px);">
      <div style="max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <h1 style="color: #2c3e50;"><i class="fas fa-cog"></i> Settings</h1>
          <p style="color: #7f8c8d;">Manage your account preferences and security</p>
        </div>
        
        <!-- Profile Section -->
        <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; flex-wrap: wrap;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3498db, #2c3e50); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
              {{ user?.fullName?.charAt(0) || user?.username?.charAt(0) }}
            </div>
            <div>
              <h2 style="color: #2c3e50; margin-bottom: 0.25rem;">{{ user?.fullName || user?.username }}</h2>
              <p style="color: #7f8c8d;"><i class="fas fa-user-tag"></i> {{ user?.role }}</p>
            </div>
          </div>
          
          <form (ngSubmit)="updateProfile()">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
              <div>
                <label style="display: block; margin-bottom: 0.5rem; color: #2c3e50; font-weight: 500;"><i class="fas fa-user"></i> Full Name</label>
                <input type="text" [(ngModel)]="profile.fullName" name="fullName" style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
              </div>
              <div>
                <label style="display: block; margin-bottom: 0.5rem; color: #2c3e50; font-weight: 500;"><i class="fas fa-envelope"></i> Email</label>
                <input type="email" [(ngModel)]="profile.email" name="email" style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
              </div>
              <div>
                <label style="display: block; margin-bottom: 0.5rem; color: #2c3e50; font-weight: 500;"><i class="fas fa-shield-alt"></i> Role</label>
                <input type="text" [value]="user?.role" disabled style="width: 100%; padding: 0.75rem; background: #f5f5f5; border: 2px solid #e0e0e0; border-radius: 10px;">
              </div>
            </div>
            <div style="margin-top: 1.5rem; text-align: right;">
              <button type="submit" style="background: linear-gradient(135deg, #3498db, #2c3e50); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;">
                <i class="fas fa-save"></i> Save Changes
              </button>
            </div>
            <div *ngIf="profileUpdated" style="margin-top: 1rem; padding: 1rem; background: #d4edda; color: #155724; border-radius: 8px; text-align: center;">
              <i class="fas fa-check-circle"></i> Profile updated successfully!
            </div>
          </form>
        </div>

        <!-- Preferences Section with Dark Mode -->
        <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50; margin-bottom: 1.5rem;"><i class="fas fa-palette"></i> Preferences</h2>
          
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid #eee;">
            <div>
              <strong><i class="fas fa-moon"></i> Dark Mode</strong>
              <p style="color: #7f8c8d; margin: 0;">Switch between light and dark theme</p>
            </div>
            <label class="switch">
              <input type="checkbox" [(ngModel)]="darkMode" (change)="toggleDarkMode()">
              <span class="slider round"></span>
            </label>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid #eee;">
            <div>
              <strong><i class="fas fa-bell"></i> Email Notifications</strong>
              <p style="color: #7f8c8d; margin: 0;">Receive incident alerts via email</p>
            </div>
            <label class="switch">
              <input type="checkbox" [(ngModel)]="emailNotifications">
              <span class="slider round"></span>
            </label>
          </div>
          
          <div style="margin-top: 1.5rem; text-align: right;">
            <button (click)="savePreferences()" style="background: linear-gradient(135deg, #27ae60, #1e8449); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;">
              <i class="fas fa-save"></i> Save Preferences
            </button>
          </div>
          <div *ngIf="preferencesSaved" style="margin-top: 1rem; padding: 1rem; background: #d4edda; color: #155724; border-radius: 8px; text-align: center;">
            <i class="fas fa-check-circle"></i> Preferences saved!
          </div>
        </div>

        <!-- Security Section -->
        <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50; margin-bottom: 1.5rem;"><i class="fas fa-lock"></i> Security</h2>
          <form (ngSubmit)="changePassword()">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
              <div>
                <label style="display: block; margin-bottom: 0.5rem; color: #2c3e50; font-weight: 500;"><i class="fas fa-key"></i> New Password</label>
                <input type="password" [(ngModel)]="newPassword" name="newPassword" style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
              </div>
              <div>
                <label style="display: block; margin-bottom: 0.5rem; color: #2c3e50; font-weight: 500;"><i class="fas fa-check-circle"></i> Confirm Password</label>
                <input type="password" [(ngModel)]="confirmPassword" name="confirmPassword" style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
              </div>
            </div>
            <div style="margin-top: 1.5rem; text-align: right;">
              <button type="submit" style="background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;">
                <i class="fas fa-sync-alt"></i> Update Password
              </button>
            </div>
            <div *ngIf="passwordUpdated" style="margin-top: 1rem; padding: 1rem; background: #d4edda; color: #155724; border-radius: 8px; text-align: center;">
              <i class="fas fa-check-circle"></i> Password updated successfully!
            </div>
            <div *ngIf="passwordError" style="margin-top: 1rem; padding: 1rem; background: #f8d7da; color: #721c24; border-radius: 8px; text-align: center;">
              <i class="fas fa-exclamation-triangle"></i> {{ passwordError }}
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.4s;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
    }
    input:checked + .slider {
      background-color: #3498db;
    }
    input:checked + .slider:before {
      transform: translateX(26px);
    }
    .slider.round {
      border-radius: 34px;
    }
    .slider.round:before {
      border-radius: 50%;
    }
  `]
})
export class SettingsComponent implements OnInit {
  user: any = {};
  profile = { fullName: '', email: '' };
  newPassword = '';
  confirmPassword = '';
  profileUpdated = false;
  passwordUpdated = false;
  passwordError = '';
  darkMode = false;
  emailNotifications = true;
  preferencesSaved = false;

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.profile.fullName = this.user.fullName || '';
      this.profile.email = this.user.email || '';
    }
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      this.darkMode = true;
      document.body.classList.add('dark-mode');
    }
    const savedNotifications = localStorage.getItem('emailNotifications');
    if (savedNotifications === 'false') {
      this.emailNotifications = false;
    }
  }

  updateProfile(): void {
    this.profileUpdated = true;
    this.user.fullName = this.profile.fullName;
    this.user.email = this.profile.email;
    localStorage.setItem('user', JSON.stringify(this.user));
    setTimeout(() => this.profileUpdated = false, 3000);
  }

  toggleDarkMode(): void {
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }

  savePreferences(): void {
    localStorage.setItem('emailNotifications', String(this.emailNotifications));
    this.preferencesSaved = true;
    setTimeout(() => this.preferencesSaved = false, 3000);
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Passwords do not match';
      return;
    }
    if (this.newPassword.length < 6) {
      this.passwordError = 'Password must be at least 6 characters';
      return;
    }
    this.passwordError = '';
    this.passwordUpdated = true;
    this.newPassword = '';
    this.confirmPassword = '';
    setTimeout(() => this.passwordUpdated = false, 3000);
  }
}
