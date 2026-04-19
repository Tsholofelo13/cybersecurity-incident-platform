-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: cybersecurity_db
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `incidents`
--

DROP TABLE IF EXISTS `incidents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incidents` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text,
  `severity` varchar(20) NOT NULL,
  `incident_type` varchar(50) NOT NULL,
  `status` varchar(20) DEFAULT 'OPEN',
  `source_ip` varchar(45) DEFAULT NULL,
  `destination_ip` varchar(45) DEFAULT NULL,
  `affected_systems` text,
  `reported_by` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `resolved_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reported_by` (`reported_by`),
  CONSTRAINT `incidents_ibfk_1` FOREIGN KEY (`reported_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidents`
--

LOCK TABLES `incidents` WRITE;
/*!40000 ALTER TABLE `incidents` DISABLE KEYS */;
INSERT INTO `incidents` VALUES (1,'SQL Injection Attack Detected','Multiple SQL injection attempts detected on login page. Attackers trying to bypass authentication.','CRITICAL','INJECTION','OPEN','192.168.1.100',NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(2,'Unauthorized Access Attempt','Brute force attack detected on admin panel. Multiple failed login attempts from same IP.','HIGH','UNAUTHORIZED','INVESTIGATING','45.33.22.11',NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(3,'Malware Detected','Suspicious file detected on employee workstation. Antivirus flagged potential ransomware.','MEDIUM','MALWARE','OPEN','192.168.1.50',NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(4,'Phishing Campaign','Phishing emails reported by multiple employees. Emails pretending to be from IT department.','HIGH','PHISHING','RESOLVED',NULL,NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(5,'DDoS Attack','Distributed denial of service attack on public website. Traffic spike detected from multiple countries.','CRITICAL','DDoS','INVESTIGATING','203.0.113.10',NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(6,'Ransomware Attempt','Ransomware encryption attempt blocked by endpoint protection. File encryption detected and stopped.','CRITICAL','RANSOMWARE','RESOLVED','10.0.0.25',NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(7,'Data Breach Attempt','Unauthorized data export detected. Large volume of data being transferred externally.','HIGH','DATA_BREACH','INVESTIGATING','185.130.5.253',NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(8,'Zero Day Exploit','New vulnerability discovered in web server. Patch not yet available.','CRITICAL','VULNERABILITY','OPEN','10.0.0.5',NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(9,'Insider Threat','Suspicious data access by employee. User accessing files outside normal pattern.','MEDIUM','INSIDER','INVESTIGATING','192.168.1.200',NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(10,'Misconfigured Firewall','Firewall rule accidentally exposed internal service to internet. Immediate fix applied.','LOW','MISCONFIGURATION','RESOLVED',NULL,NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(11,'Man-in-the-Middle Attack','Suspicious network activity suggesting MITM attack on wireless network.','HIGH','NETWORK','OPEN','192.168.1.150',NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(12,'Credential Theft','User credentials found on dark web. Password reset initiated.','CRITICAL','IDENTITY_THEFT','RESOLVED',NULL,NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(13,'Privilege Escalation','User attempted to gain admin privileges. Unauthorized command execution detected.','HIGH','PRIVILEGE_ESCALATION','INVESTIGATING','10.0.0.100',NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(14,'APT Attack','Advanced Persistent Threat detected. Long-term unauthorized access suspected.','CRITICAL','APT','INVESTIGATING','185.230.125.45',NULL,NULL,NULL,'2026-04-11 14:19:04',NULL),(15,'Social Engineering','Employee tricked into revealing credentials over phone.','MEDIUM','SOCIAL_ENGINEERING','RESOLVED',NULL,NULL,NULL,NULL,'2026-04-11 14:19:04',NULL);
/*!40000 ALTER TABLE `incidents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'admin','admin@cybershield.com','admin123','ADMIN','System Administrator','2026-04-11 14:46:06'),(3,'tshol13','tsholo@gmail.com','@Tebatso2003','VIEWER','tsholo','2026-04-11 12:52:00'),(4,'testuser','test@test.com','test123','VIEWER','Test User','2026-04-11 13:41:37'),(5,'Tsholo@13','tsholosekome@gmail.com','@Tebatso2003','ADMIN','Tsholo Sekome','2026-04-11 13:46:47'),(6,'Tebatso@13','tebatso@gmail.com','@Tebatso2003','VIEWER','Tsholo Sekome','2026-04-11 13:51:12'),(7,'Lebo@13','lebomashile@gmail.com','@Tebatso2003','ANALYST','Lebo Mashile','2026-04-11 13:52:43'),(8,'Tibie@13','tebatsomap@gmail.com','$2a$10$j/owIEWx3fjCoyUTRvGwouygnc.1fJ5YTK6YOsDyv3HppG/tb/NfW','ADMIN','Tebatso Mapaile','2026-04-11 14:08:54'),(9,'Teb@13','tesbatso@gmail.com','$2a$10$XGp8o.kz2DpTXY2uFPJ3SOqOCvo337JRWnn9M0exXN3hXZ7CW6lim','ADMIN','Tibie Sekome','2026-04-11 14:12:40'),(10,'tsholofelo','tsholosekom@gmail.com','$2a$10$mO6WPD2v.DJXDqk6MUsSw.z714rLNbwsazG4l17OSUZcOaKRng3aK','VIEWER','Tsholo','2026-04-11 14:16:52');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-11 18:18:46
