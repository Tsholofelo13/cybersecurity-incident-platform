import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-incident-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="padding: 2rem; background: #f5f7fa; min-height: calc(100vh - 70px);">
      <div style="max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2c3e50;"><i class="fas fa-plus-circle"></i> {{ isEdit ? 'Edit Incident' : 'Report New Incident' }}</h1>
        
        <form (ngSubmit)="onSubmit()" style="background: white; padding: 2rem; border-radius: 12px;">
          <div style="margin-bottom: 1rem;">
            <label>Title *</label>
            <input type="text" [(ngModel)]="incident.title" name="title" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px;">
          </div>
          
          <div style="margin-bottom: 1rem;">
            <label>Description</label>
            <textarea [(ngModel)]="incident.description" name="description" rows="4" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px;"></textarea>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label>Severity *</label>
              <select [(ngModel)]="incident.severity" name="severity" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px;">
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
            <div>
              <label>Incident Type *</label>
              <select [(ngModel)]="incident.incidentType" name="incidentType" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px;">
                <option value="INJECTION">SQL Injection</option>
                <option value="UNAUTHORIZED">Unauthorized Access</option>
                <option value="MALWARE">Malware</option>
                <option value="PHISHING">Phishing</option>
                <option value="DDoS">DDoS</option>
              </select>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label>Status</label>
              <select [(ngModel)]="incident.status" name="status" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px;">
                <option value="OPEN">Open</option>
                <option value="INVESTIGATING">Investigating</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <div>
              <label>Source IP</label>
              <input type="text" [(ngModel)]="incident.sourceIp" name="sourceIp" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px;">
            </div>
          </div>
          
          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button type="submit" style="background: #27ae60; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer;">
              <i class="fas fa-save"></i> {{ isEdit ? 'Update' : 'Create' }}
            </button>
            <button type="button" routerLink="/incidents" style="background: #95a5a6; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer;">
              <i class="fas fa-times"></i> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class IncidentFormComponent implements OnInit {
  incident: any = {
    title: '',
    description: '',
    severity: 'MEDIUM',
    incidentType: '',
    status: 'OPEN',
    sourceIp: ''
  };
  isEdit = false;
  incidentId: number | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.incidentId = +params['id'];
        this.loadIncident();
      }
    });
  }

  loadIncident(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.get(`http://localhost:8081/api/incidents/${this.incidentId}`, { headers }).subscribe({
      next: (data: any) => {
        this.incident = data;
      },
      error: (err) => console.error('Error loading incident:', err)
    });
  }

  onSubmit(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    if (this.isEdit && this.incidentId) {
      this.http.put(`http://localhost:8081/api/incidents/${this.incidentId}`, this.incident, { headers }).subscribe({
        next: () => {
          this.router.navigate(['/incidents']);
        },
        error: (err) => console.error('Error updating:', err)
      });
    } else {
      this.http.post('http://localhost:8081/api/incidents', this.incident, { headers }).subscribe({
        next: () => {
          this.router.navigate(['/incidents']);
        },
        error: (err) => console.error('Error creating:', err)
      });
    }
  }
}
