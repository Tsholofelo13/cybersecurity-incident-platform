import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); min-height: calc(100vh - 70px);">
      <div style="max-width: 1000px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <h1 style="color: #2c3e50;"><i class="fas fa-envelope"></i> Contact Us</h1>
          <p style="color: #7f8c8d;">Have questions? We'd love to hear from you.</p>
        </div>

        <!-- Contact Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          <div style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #3498db, #2c3e50); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
              <i class="fas fa-envelope" style="font-size: 1.5rem; color: white;"></i>
            </div>
            <h3 style="color: #2c3e50;">Email Us</h3>
            <p style="color: #7f8c8d;">support@cybershield.com</p>
            <p style="color: #7f8c8d;">info@cybershield.com</p>
          </div>
          <div style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #e74c3c, #c0392b); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
              <i class="fas fa-phone" style="font-size: 1.5rem; color: white;"></i>
            </div>
            <h3 style="color: #2c3e50;">Call Us</h3>
            <p style="color: #7f8c8d;">+27 11 456 7890</p>
            <p style="color: #7f8c8d;">+27 11 456 7891</p>
          </div>
          <div style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #27ae60, #1e8449); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
              <i class="fas fa-map-marker-alt" style="font-size: 1.5rem; color: white;"></i>
            </div>
            <h3 style="color: #2c3e50;">Visit Us</h3>
            <p style="color: #7f8c8d;">Molotlegi Str</p>
            <p style="color: #7f8c8d;">Sefako Makgatho Health Sciences University</p>
            <p style="color: #7f8c8d;">Ga-rankuwa, Pretoria, 0208</p>
          </div>
        </div>

        <!-- Contact Form -->
        <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50; margin-bottom: 1.5rem;"><i class="fas fa-paper-plane"></i> Send us a message</h2>
          <form (ngSubmit)="onSubmit()">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
              <div>
                <label style="display: block; margin-bottom: 0.5rem; color: #2c3e50; font-weight: 500;"><i class="fas fa-user"></i> Name</label>
                <input type="text" [(ngModel)]="message.name" name="name" required style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
              </div>
              <div>
                <label style="display: block; margin-bottom: 0.5rem; color: #2c3e50; font-weight: 500;"><i class="fas fa-envelope"></i> Email</label>
                <input type="email" [(ngModel)]="message.email" name="email" required style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
              </div>
            </div>
            <div style="margin-top: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; color: #2c3e50; font-weight: 500;"><i class="fas fa-tag"></i> Subject</label>
              <input type="text" [(ngModel)]="message.subject" name="subject" required style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;">
            </div>
            <div style="margin-top: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; color: #2c3e50; font-weight: 500;"><i class="fas fa-comment"></i> Message</label>
              <textarea [(ngModel)]="message.content" name="content" rows="5" required style="width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 10px;"></textarea>
            </div>
            <div style="margin-top: 1.5rem; text-align: right;">
              <button type="submit" style="background: linear-gradient(135deg, #3498db, #2c3e50); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;">
                <i class="fas fa-paper-plane"></i> Send Message
              </button>
            </div>
            <div *ngIf="submitted" style="margin-top: 1rem; padding: 1rem; background: #d4edda; color: #155724; border-radius: 8px; text-align: center;">
              <i class="fas fa-check-circle"></i> Thank you! Your message has been sent. We'll get back to you soon.
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {
  message = { name: '', email: '', subject: '', content: '' };
  submitted = false;

  onSubmit(): void {
    this.submitted = true;
    setTimeout(() => this.submitted = false, 3000);
    this.message = { name: '', email: '', subject: '', content: '' };
  }
}
