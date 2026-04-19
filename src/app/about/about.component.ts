import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); min-height: calc(100vh - 70px);">
      <div style="max-width: 1000px; margin: 0 auto;">
        <!-- Hero Section -->
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3498db, #2c3e50); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
            <i class="fas fa-shield-alt" style="font-size: 2.5rem; color: white;"></i>
          </div>
          <h1 style="color: #2c3e50; font-size: 2.5rem;">About CyberShield Security</h1>
          <p style="color: #7f8c8d; font-size: 1.1rem;">Protecting organizations with next-generation cybersecurity intelligence</p>
        </div>

        <!-- Mission Section -->
        <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #3498db, #2c3e50); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-bullseye" style="color: white;"></i>
            </div>
            <h2 style="color: #2c3e50; margin: 0;">Our Mission</h2>
          </div>
          <p style="color: #34495e; line-height: 1.6; margin-left: 4rem;">CyberShield Security provides cutting-edge cybersecurity incident intelligence to protect organizations from evolving cyber threats. We empower security teams with real-time insights and predictive analytics to stay ahead of attackers.</p>
        </div>

        <!-- Key Features -->
        <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #e74c3c, #c0392b); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-star" style="color: white;"></i>
            </div>
            <h2 style="color: #2c3e50; margin: 0;">Key Features</h2>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-left: 4rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem;">
              <i class="fas fa-chart-line" style="color: #3498db;"></i>
              <span>Real-time incident tracking</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem;">
              <i class="fas fa-brain" style="color: #9b59b6;"></i>
              <span>AI-powered threat prediction</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem;">
              <i class="fas fa-users" style="color: #e67e22;"></i>
              <span>Role-based access control</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem;">
              <i class="fas fa-chart-pie" style="color: #27ae60;"></i>
              <span>Comprehensive analytics dashboard</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem;">
              <i class="fas fa-shield-virus" style="color: #e74c3c;"></i>
              <span>Automated risk assessment</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem;">
              <i class="fas fa-bell" style="color: #f39c12;"></i>
              <span>Real-time alerts & notifications</span>
            </div>
          </div>
        </div>

        <!-- Technology Stack -->
        <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #27ae60, #1e8449); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-code" style="color: white;"></i>
            </div>
            <h2 style="color: #2c3e50; margin: 0;">Technology Stack</h2>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-left: 4rem;">
            <span style="background: linear-gradient(135deg, #3498db, #2980b9); color: white; padding: 0.5rem 1rem; border-radius: 25px; font-size: 0.9rem;">
              <i class="fab fa-angular"></i> Angular
            </span>
            <span style="background: linear-gradient(135deg, #27ae60, #1e8449); color: white; padding: 0.5rem 1rem; border-radius: 25px; font-size: 0.9rem;">
              <i class="fab fa-java"></i> Spring Boot
            </span>
            <span style="background: linear-gradient(135deg, #f39c12, #e67e22); color: white; padding: 0.5rem 1rem; border-radius: 25px; font-size: 0.9rem;">
              <i class="fas fa-database"></i> MySQL
            </span>
            <span style="background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 0.5rem 1rem; border-radius: 25px; font-size: 0.9rem;">
              <i class="fas fa-key"></i> JWT
            </span>
            <span style="background: linear-gradient(135deg, #9b59b6, #8e44ad); color: white; padding: 0.5rem 1rem; border-radius: 25px; font-size: 0.9rem;">
              <i class="fas fa-brain"></i> PyTorch
            </span>
            <span style="background: linear-gradient(135deg, #1abc9c, #16a085); color: white; padding: 0.5rem 1rem; border-radius: 25px; font-size: 0.9rem;">
              <i class="fas fa-chart-line"></i> Chart.js
            </span>
          </div>
        </div>

        <!-- Stats Section -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: white; border-radius: 16px; padding: 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <i class="fas fa-database" style="font-size: 2rem; color: #3498db;"></i>
            <div style="font-size: 2rem; font-weight: bold; color: #2c3e50;">18+</div>
            <div style="color: #7f8c8d;">Incidents Tracked</div>
          </div>
          <div style="background: white; border-radius: 16px; padding: 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <i class="fas fa-user-shield" style="font-size: 2rem; color: #27ae60;"></i>
            <div style="font-size: 2rem; font-weight: bold; color: #2c3e50;">3</div>
            <div style="color: #7f8c8d;">User Roles</div>
          </div>
          <div style="background: white; border-radius: 16px; padding: 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <i class="fas fa-chart-line" style="font-size: 2rem; color: #e74c3c;"></i>
            <div style="font-size: 2rem; font-weight: bold; color: #2c3e50;">99.9%</div>
            <div style="color: #7f8c8d;">Uptime</div>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 1.5rem; color: #7f8c8d;">
          <p><i class="fas fa-copyright"></i> 2026 CyberShield Security. All rights reserved.</p>
          <p>Version 2.0 | <i class="fas fa-shield-alt"></i> Protecting what matters most</p>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {}
