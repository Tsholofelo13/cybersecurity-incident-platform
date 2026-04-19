import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 2rem; background: #f5f7fa; min-height: calc(100vh - 70px);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="color: #2c3e50;"><i class="fas fa-chart-line"></i> Security Dashboard</h1>
          <p style="color: #7f8c8d;">Real-time security incident intelligence</p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.8rem; color: #7f8c8d;">
            <i class="fas fa-sync-alt"></i> Last updated: {{ lastUpdated | date:'mediumTime' }}
          </span>
          <button (click)="refresh()" style="margin-left: 0.5rem; background: none; border: none; cursor: pointer;">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 2rem 0;">
        <div style="background: white; padding: 1rem; border-radius: 12px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <i class="fas fa-database" style="font-size: 2rem; color: #3498db;"></i>
          <h3>Total Incidents</h3>
          <div style="font-size: 2rem; font-weight: bold;">{{ incidents.length }}</div>
        </div>
        <div style="background: white; padding: 1rem; border-radius: 12px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <i class="fas fa-skull-crossbones" style="font-size: 2rem; color: #e74c3c;"></i>
          <h3>Critical</h3>
          <div style="font-size: 2rem; font-weight: bold; color: #e74c3c;">{{ criticalCount }}</div>
        </div>
        <div style="background: white; padding: 1rem; border-radius: 12px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #e67e22;"></i>
          <h3>High</h3>
          <div style="font-size: 2rem; font-weight: bold; color: #e67e22;">{{ highCount }}</div>
        </div>
        <div style="background: white; padding: 1rem; border-radius: 12px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <i class="fas fa-clock" style="font-size: 2rem; color: #3498db;"></i>
          <h3>Open</h3>
          <div style="font-size: 2rem; font-weight: bold; color: #3498db;">{{ openCount }}</div>
        </div>
      </div>

      <div style="background: white; border-radius: 12px; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3><i class="fas fa-history"></i> Recent Incidents</h3>
        <div *ngIf="loading">Loading incidents...</div>
        <div *ngFor="let inc of incidents.slice(0,5)" style="border-bottom: 1px solid #eee; padding: 0.5rem 0;">
          <strong><i class="fas fa-hashtag"></i> {{ inc.id }} - {{ inc.title }}</strong>
          <div><i class="fas fa-chart-simple"></i> Severity: {{ inc.severity }} | <i class="fas fa-circle-info"></i> Status: {{ inc.status }}</div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit, OnDestroy {
  incidents: any[] = [];
  criticalCount = 0;
  highCount = 0;
  openCount = 0;
  loading = true;
  lastUpdated = new Date();
  private refreshInterval: any;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchIncidents();
    // Auto-refresh every 30 seconds
    this.refreshInterval = setInterval(() => this.refresh(), 30000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  refresh(): void {
    this.fetchIncidents();
  }

  fetchIncidents(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.loading = false;
      return;
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://localhost:8081/api/incidents', { headers }).subscribe({
      next: (data: any) => {
        this.incidents = data;
        this.criticalCount = data.filter((i: any) => i.severity === 'CRITICAL').length;
        this.highCount = data.filter((i: any) => i.severity === 'HIGH').length;
        this.openCount = data.filter((i: any) => i.status === 'OPEN').length;
        this.loading = false;
        this.lastUpdated = new Date();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }
}
