# 🛡️ CyberShield Security - Cybersecurity Incident Intelligence Platform

## 📋 Project Overview

CyberShield Security is a **full-stack cybersecurity incident management system** that helps organizations track, analyze, and predict security incidents. The platform provides real-time incident monitoring, AI-powered predictive analytics, and role-based access control.

## 🎯 Key Features

- 🔐 **JWT Authentication** - Secure login with token-based authentication
- 👥 **Role-Based Access** - Three roles: ADMIN, ANALYST, VIEWER
- 📊 **Interactive Dashboard** - Real-time statistics and data visualizations
- 📝 **Incident Management** - Complete CRUD operations for security incidents
- 🤖 **AI Analytics** - Machine learning predictions for incident patterns
- 📈 **Dynamic Charts** - Interactive charts using Chart.js
- 👤 **User Management** - Admin interface to manage users and roles
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📁 **CSV Export** - Export incident data to CSV format

## 🏗️ Technology Stack

### Frontend
- Angular 21
- Chart.js
- Font Awesome 6
- TypeScript

### Backend
- Spring Boot 3.1.5
- Spring Security with JWT
- MySQL 8.0
- Hibernate/JPA
- Lombok

### AI/ML
- PyTorch for predictive analytics

## 📊 Database Schema

### Users Table

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


### Incidents Table

CREATE TABLE incidents (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    severity VARCHAR(20) NOT NULL,
    incident_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'OPEN',
    source_ip VARCHAR(45),
    destination_ip VARCHAR(45),
    affected_systems TEXT,
    reported_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (reported_by) REFERENCES users(id)
);


## 🚀 Installation Guide

### Prerequisites
- Node.js 18+ 
- Java 17+
- MySQL 8.0+
- Angular CLI
- Maven

### Backend Setup

1. **Navigate to backend folder**

cd backend


2. **Configure MySQL database**

CREATE DATABASE cybersecurity_db;
USE cybersecurity_db;
-- Run the schema above


3. **Update application.properties**

spring.datasource.url=jdbc:mysql://localhost:3306/cybersecurity_db
spring.datasource.username=root
spring.datasource.password=yourpassword
jwt.secret=your-secret-key
jwt.expiration=86400000


4. **Run the backend**

mvn clean install
mvn spring-boot:run


### Frontend Setup

1. **Navigate to frontend folder**
cd frontend

2. **Install dependencies**
npm install

3. **Run the development server**
ng serve --port 4200

4. **Open your browser**
http://localhost:4200


## 🔑 Default Users

| Username | Password | Role | Permissions |
|----------|----------|------|-------------|
| admin | admin123 | ADMIN | Full access (CRUD, User Management) |
| analyst | analyst123 | ANALYST | Create, Read, Update (no delete) |
| viewer | viewer123 | VIEWER | Read-only access |

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |

### Incidents
| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|---------------|
| GET | `/api/incidents` | Get all incidents | Any |
| GET | `/api/incidents/{id}` | Get incident by ID | Any |
| POST | `/api/incidents` | Create new incident | ADMIN/ANALYST |
| PUT | `/api/incidents/{id}` | Update incident | ADMIN/ANALYST |
| DELETE | `/api/incidents/{id}` | Delete incident | ADMIN |

### Admin (Admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users |
| PUT | `/api/admin/users/{id}/role` | Update user role |
| DELETE | `/api/admin/users/{id}` | Delete user |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/stats` | Get incident statistics |
| GET | `/api/analytics/predict` | AI incident prediction |

## 🎯 Role-Based Permissions

| Action | ADMIN | ANALYST | VIEWER |
|--------|-------|---------|--------|
| View incidents | ✅ | ✅ | ✅ |
| Create incidents | ✅ | ✅ | ❌ |
| Edit incidents | ✅ | ✅ | ❌ |
| Delete incidents | ✅ | ❌ | ❌ |
| View analytics | ✅ | ✅ | ✅ |
| Manage users | ✅ | ❌ | ❌ |
| Export data | ✅ | ✅ | ❌ |

## 🔧 Troubleshooting

### Common Issues

**Port 8081 already in use**

netstat -ano | findstr :8081
taskkill /PID <PID> /F


**MySQL connection error**
- Ensure MySQL service is running
- Check credentials in application.properties
- Verify database exists

**JWT token expired**
- Login again to get a new token
- Token expires after 24 hours

## 📸 Screenshots



- Login Page
- Dashboard with stats
- Incidents management
- Analytics with charts
- User management (Admin)
- Dark mode

## 👨‍💻 Author

**Tsholofelo Sekome**
- GitHub: [@Tsholofelo13](https://github.com/Tsholofelo13)

## 🙏 Acknowledgments

- Sefako Makgatho Health Sciences University
- CSIT701 Advanced Database Systems Lecturer: Taurai Hungwe

## 📝 License

This project is for educational purposes as part of the CSIT701 Advanced Database Systems assessment.

---

**Built with ❤️ for cybersecurity awareness**

