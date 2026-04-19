package com.cybersecurity.repository;

import com.cybersecurity.model.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findBySeverity(String severity);
    List<Incident> findByStatus(String status);
}