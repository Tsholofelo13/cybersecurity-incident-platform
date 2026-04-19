import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); min-height: calc(100vh - 70px);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="color: #2c3e50;"><i class="fas fa-exclamation-triangle"></i> Security Incidents</h1>
          <p style="color: #7f8c8d;">Manage and track all security incidents</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button (click)="exportToCSV()" style="background: #27ae60; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">
            <i class="fas fa-file-csv"></i> Export CSV
          </button>
          <button *ngIf="canEdit()" routerLink="/incidents/new" style="background: #3498db; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">
            <i class="fas fa-plus"></i> Report Incident
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
        <div class="stat-mini"><i class="fas fa-database"></i> <span>Total</span><strong>{{ incidents.length }}</strong></div>
        <div class="stat-mini critical"><i class="fas fa-skull-crossbones"></i> <span>Critical</span><strong>{{ getCountBySeverity('CRITICAL') }}</strong></div>
        <div class="stat-mini high"><i class="fas fa-exclamation-triangle"></i> <span>High</span><strong>{{ getCountBySeverity('HIGH') }}</strong></div>
        <div class="stat-mini medium"><i class="fas fa-chart-simple"></i> <span>Medium</span><strong>{{ getCountBySeverity('MEDIUM') }}</strong></div>
        <div class="stat-mini low"><i class="fas fa-arrow-down"></i> <span>Low</span><strong>{{ getCountBySeverity('LOW') }}</strong></div>
        <div class="stat-mini open"><i class="fas fa-clock"></i> <span>Open</span><strong>{{ getCountByStatus('OPEN') }}</strong></div>
        <div class="stat-mini resolved"><i class="fas fa-check-circle"></i> <span>Resolved</span><strong>{{ getCountByStatus('RESOLVED') }}</strong></div>
      </div>

      <!-- Filters -->
      <div style="background: white; border-radius: 12px; padding: 1rem; margin-bottom: 1rem;">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <select [(ngModel)]="filters.severity" (change)="applyFilters()" style="padding: 0.5rem; border-radius: 6px;">
            <option value="">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <select [(ngModel)]="filters.status" (change)="applyFilters()" style="padding: 0.5rem; border-radius: 6px;">
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="INVESTIGATING">Investigating</option>
            <option value="RESOLVED">Resolved</option>
          </select>
          <input type="text" [(ngModel)]="filters.search" (input)="applyFilters()" placeholder="Search..." style="padding: 0.5rem; border-radius: 6px;">
          <button (click)="clearFilters()" style="background: #ecf0f1; border: none; padding: 0.5rem; border-radius: 6px;">Clear</button>
        </div>
      </div>

      <!-- Incidents Table -->
      <div style="background: white; border-radius: 12px; overflow-x: auto;">
        <div *ngIf="loading" style="text-align: center; padding: 2rem;">
          <i class="fas fa-spinner fa-spin"></i> Loading incidents...
        </div>
        <table *ngIf="!loading && filteredIncidents.length > 0" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f8f9fa;">
              <th style="padding: 1rem; text-align: left;">ID</th>
              <th style="padding: 1rem; text-align: left;">Title</th>
              <th style="padding: 1rem; text-align: left;">Severity</th>
              <th style="padding: 1rem; text-align: left;">Type</th>
              <th style="padding: 1rem; text-align: left;">Status</th>
              <th style="padding: 1rem; text-align: left;">Reported</th>
              <th *ngIf="canEdit()" style="padding: 1rem; text-align: left;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let incident of filteredIncidents">
              <td style="padding: 1rem; border-bottom: 1px solid #ecf0f1;">#{{ incident.id }}</td>
              <td style="padding: 1rem; border-bottom: 1px solid #ecf0f1;">
                <strong><i class="fas fa-bug"></i> {{ incident.title }}</strong>
                <div style="font-size: 0.8rem; color: #7f8c8d;">{{ incident.description | slice:0:60 }}...</div>
              </td>
              <td style="padding: 1rem; border-bottom: 1px solid #ecf0f1;">
                <span class="badge" [style.backgroundColor]="getSeverityColor(incident.severity)">{{ incident.severity }}</span>
              </td>
              <td style="padding: 1rem; border-bottom: 1px solid #ecf0f1;"><i class="fas fa-tag"></i> {{ incident.incidentType }}</td>
              <td style="padding: 1rem; border-bottom: 1px solid #ecf0f1;">
                <span class="badge" [style.backgroundColor]="getStatusColor(incident.status)">{{ incident.status }}</span>
              </td>
              <td style="padding: 1rem; border-bottom: 1px solid #ecf0f1;"><i class="fas fa-calendar"></i> {{ incident.createdAt | date:'short' }}</td>
              <td *ngIf="canEdit()" style="padding: 1rem; border-bottom: 1px solid #ecf0f1;">
                <button [routerLink]="['/incidents/edit', incident.id]" style="background: #3498db; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; margin-right: 0.5rem; cursor: pointer;">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button *ngIf="canDelete()" (click)="deleteIncident(incident.id!)" style="background: #e74c3c; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;">
                  <i class="fas fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="!loading && filteredIncidents.length === 0" style="text-align: center; padding: 2rem;">
          No incidents found
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stat-mini { background: white; padding: 0.5rem 1rem; border-radius: 8px; text-align: center; min-width: 100px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: inline-flex; align-items: center; gap: 0.5rem; margin-right: 0.5rem; margin-bottom: 0.5rem; }
    .stat-mini span { display: inline-block; font-size: 0.75rem; color: #7f8c8d; margin: 0 0.25rem; }
    .stat-mini strong { font-size: 1.25rem; }
    .badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; color: white; display: inline-block; }
  `]
})
export class IncidentsComponent implements OnInit {
  incidents: any[] = [];
  filteredIncidents: any[] = [];
  filters = { severity: '', status: '', search: '' };
  loading = true;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchIncidents();
  }

  canEdit(): boolean {
    return this.authService.canEdit();
  }

  canDelete(): boolean {
    return this.authService.canDelete();
  }

  getCountBySeverity(severity: string): number {
    return this.filteredIncidents.filter(i => i.severity === severity).length;
  }

  getCountByStatus(status: string): number {
    return this.filteredIncidents.filter(i => i.status === status).length;
  }

  applyFilters(): void {
    this.filteredIncidents = this.incidents.filter(incident => {
      if (this.filters.severity && incident.severity !== this.filters.severity) return false;
      if (this.filters.status && incident.status !== this.filters.status) return false;
      if (this.filters.search && !incident.title.toLowerCase().includes(this.filters.search.toLowerCase())) return false;
      return true;
    });
  }

  clearFilters(): void {
    this.filters = { severity: '', status: '', search: '' };
    this.applyFilters();
  }

  exportToCSV(): void {
    const headers = ['ID', 'Title', 'Description', 'Severity', 'Type', 'Status', 'Source IP', 'Reported Date'];
    const rows = this.filteredIncidents.map(i => [
      i.id,
      `"${i.title.replace(/"/g, '""')}"`,
      `"${(i.description || '').replace(/"/g, '""')}"`,
      i.severity,
      i.incidentType,
      i.status,
      i.sourceIp || '',
      new Date(i.createdAt).toLocaleString()
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incidents_export_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  fetchIncidents(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://localhost:8081/api/incidents', { headers }).subscribe({
      next: (data: any) => {
        this.incidents = data;
        this.filteredIncidents = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteIncident(id: number): void {
    if (confirm('Delete this incident?')) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.delete(`http://localhost:8081/api/incidents/${id}`, { headers }).subscribe({
        next: () => this.fetchIncidents(),
        error: (err) => console.error('Error deleting:', err)
      });
    }
  }

  getSeverityColor(severity: string): string {
    const colors: any = { 'CRITICAL': '#e74c3c', 'HIGH': '#e67e22', 'MEDIUM': '#f39c12', 'LOW': '#27ae60' };
    return colors[severity] || '#95a5a6';
  }

  getStatusColor(status: string): string {
    const colors: any = { 'OPEN': '#e74c3c', 'INVESTIGATING': '#f39c12', 'RESOLVED': '#27ae60' };
    return colors[status] || '#95a5a6';
  }
}
