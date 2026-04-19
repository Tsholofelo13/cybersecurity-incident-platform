package com.cybersecurity.controller;

import com.cybersecurity.model.Incident;
import com.cybersecurity.repository.IncidentRepository;
import com.cybersecurity.service.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "http://localhost:4200")
public class IncidentController {

    @Autowired
    private IncidentRepository incidentRepository;
    
    @Autowired
    private AuditService auditService;

    @GetMapping
    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Incident> getIncidentById(@PathVariable Long id) {
        return incidentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Incident createIncident(@RequestBody Incident incident) {
        Incident saved = incidentRepository.save(incident);
        auditService.log("CREATE", "Incident", saved.getId(), 
            "Incident created: " + saved.getTitle());
        return saved;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Incident> updateIncident(@PathVariable Long id, @RequestBody Incident incidentDetails) {
        return incidentRepository.findById(id)
                .map(incident -> {
                    incident.setTitle(incidentDetails.getTitle());
                    incident.setDescription(incidentDetails.getDescription());
                    incident.setSeverity(incidentDetails.getSeverity());
                    incident.setIncidentType(incidentDetails.getIncidentType());
                    incident.setStatus(incidentDetails.getStatus());
                    incident.setSourceIp(incidentDetails.getSourceIp());
                    incident.setDestinationIp(incidentDetails.getDestinationIp());
                    incident.setAffectedSystems(incidentDetails.getAffectedSystems());
                    Incident updated = incidentRepository.save(incident);
                    auditService.log("UPDATE", "Incident", id, 
                        "Incident updated: " + incident.getTitle());
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncident(@PathVariable Long id) {
        return incidentRepository.findById(id)
                .map(incident -> {
                    auditService.log("DELETE", "Incident", id, 
                        "Incident deleted: " + incident.getTitle());
                    incidentRepository.delete(incident);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
