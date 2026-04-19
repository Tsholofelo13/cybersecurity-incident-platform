import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 2rem; background: #f5f7fa; min-height: calc(100vh - 70px);">
      <h1 style="color: #2c3e50;"><i class="fas fa-brain"></i> AI Security Analytics</h1>
      <p style="color: #7f8c8d;">AI-powered incident prediction and analytics</p>

      <!-- Stats Cards -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;">
        <div style="background: white; padding: 1rem; border-radius: 12px; text-align: center;">
          <i class="fas fa-database" style="font-size: 2rem; color: #3498db;"></i>
          <div>Total Incidents</div>
          <div style="font-size: 1.5rem; font-weight: bold;">{{ totalIncidents }}</div>
        </div>
        <div style="background: white; padding: 1rem; border-radius: 12px; text-align: center;">
          <i class="fas fa-skull-crossbones" style="font-size: 2rem; color: #e74c3c;"></i>
          <div>Critical</div>
          <div style="font-size: 1.5rem; font-weight: bold; color: #e74c3c;">{{ criticalCount }}</div>
        </div>
        <div style="background: white; padding: 1rem; border-radius: 12px; text-align: center;">
          <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #e67e22;"></i>
          <div>High</div>
          <div style="font-size: 1.5rem; font-weight; bold; color: #e67e22;">{{ highCount }}</div>
        </div>
        <div style="background: white; padding: 1rem; border-radius: 12px; text-align: center;">
          <i class="fas fa-clock" style="font-size: 2rem; color: #3498db;"></i>
          <div>Open</div>
          <div style="font-size: 1.5rem; font-weight: bold; color: #3498db;">{{ openCount }}</div>
        </div>
      </div>

      <!-- AI Prediction Card -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
        <h2 style="margin-bottom: 0.5rem;"><i class="fas fa-robot"></i> AI Prediction</h2>
        <div style="font-size: 1.5rem; font-weight: bold;">{{ prediction }}</div>
        <button (click)="runPrediction()" style="background: rgba(255,255,255,0.2); border: none; padding: 0.5rem 1rem; border-radius: 5px; color: white; cursor: pointer; margin-top: 1rem;">
          <i class="fas fa-sync-alt"></i> Refresh Prediction
        </button>
      </div>

      <!-- Charts -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <div style="background: white; padding: 1rem; border-radius: 12px;">
          <h3><i class="fas fa-chart-bar"></i> Incidents by Severity</h3>
          <canvas id="severityChart" style="height: 250px;"></canvas>
        </div>
        <div style="background: white; padding: 1rem; border-radius: 12px;">
          <h3><i class="fas fa-chart-pie"></i> Incidents by Status</h3>
          <canvas id="statusChart" style="height: 250px;"></canvas>
        </div>
      </div>

      <!-- Risk Assessment -->
      <div style="background: white; padding: 1.5rem; border-radius: 12px;">
        <h3><i class="fas fa-chart-line"></i> Risk Assessment</h3>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          <div><strong>Risk Level:</strong> 
            <span [style.color]="riskLevel === 'HIGH' ? '#e74c3c' : riskLevel === 'MEDIUM' ? '#f39c12' : '#27ae60'">
              <i class="fas fa-flag"></i> {{ riskLevel }}
            </span>
          </div>
          <div><strong>Risk Score:</strong> {{ riskScore }}/100</div>
          <div><strong>Recommendation:</strong> <i class="fas fa-lightbulb"></i> {{ recommendation }}</div>
        </div>
      </div>
    </div>
  `
})
export class AnalyticsComponent implements OnInit {
  incidents: any[] = [];
  totalIncidents = 0;
  criticalCount = 0;
  highCount = 0;
  openCount = 0;
  prediction = 'Loading...';
  riskLevel = 'MEDIUM';
  riskScore = 0;
  recommendation = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
    this.runPrediction();
  }

  loadData(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.get('http://localhost:8081/api/incidents', { headers }).subscribe({
      next: (data: any) => {
        this.incidents = data;
        this.totalIncidents = data.length;
        this.criticalCount = data.filter((i: any) => i.severity === 'CRITICAL').length;
        this.highCount = data.filter((i: any) => i.severity === 'HIGH').length;
        this.openCount = data.filter((i: any) => i.status === 'OPEN').length;
        
        this.riskScore = Math.min(100, this.criticalCount * 20 + this.highCount * 10);
        
        if (this.riskScore > 60) {
          this.riskLevel = 'HIGH';
          this.recommendation = 'URGENT: Review security policies immediately!';
        } else if (this.riskScore > 30) {
          this.riskLevel = 'MEDIUM';
          this.recommendation = 'Schedule security review within 2 weeks.';
        } else {
          this.riskLevel = 'LOW';
          this.recommendation = 'Continue regular monitoring.';
        }
        
        this.createCharts();
      },
      error: (err) => console.error('Error loading incidents:', err)
    });
  }

  runPrediction(): void {
    this.prediction = 'Calculating...';
    // Simple prediction based on current data
    setTimeout(() => {
      const predicted = this.totalIncidents + Math.ceil(this.totalIncidents * 0.15);
      this.prediction = `Predicted incidents next week: ${predicted}`;
    }, 1000);
  }

  createCharts(): void {
    const severityCounts = {
      CRITICAL: this.criticalCount,
      HIGH: this.highCount,
      MEDIUM: this.incidents.filter((i: any) => i.severity === 'MEDIUM').length,
      LOW: this.incidents.filter((i: any) => i.severity === 'LOW').length
    };

    const statusCounts = {
      OPEN: this.openCount,
      INVESTIGATING: this.incidents.filter((i: any) => i.status === 'INVESTIGATING').length,
      RESOLVED: this.incidents.filter((i: any) => i.status === 'RESOLVED').length
    };

    const severityCtx = document.getElementById('severityChart') as HTMLCanvasElement;
    if (severityCtx) {
      new Chart(severityCtx, {
        type: 'bar',
        data: {
          labels: ['Critical', 'High', 'Medium', 'Low'],
          datasets: [{
            label: 'Number of Incidents',
            data: [severityCounts.CRITICAL, severityCounts.HIGH, severityCounts.MEDIUM, severityCounts.LOW],
            backgroundColor: ['#e74c3c', '#e67e22', '#f39c12', '#27ae60']
          }]
        },
        options: { responsive: true, maintainAspectRatio: true }
      });
    }

    const statusCtx = document.getElementById('statusChart') as HTMLCanvasElement;
    if (statusCtx) {
      new Chart(statusCtx, {
        type: 'doughnut',
        data: {
          labels: ['Open', 'Investigating', 'Resolved'],
          datasets: [{
            data: [statusCounts.OPEN, statusCounts.INVESTIGATING, statusCounts.RESOLVED],
            backgroundColor: ['#e74c3c', '#f39c12', '#27ae60']
          }]
        },
        options: { responsive: true, maintainAspectRatio: true }
      });
    }
  }
}
