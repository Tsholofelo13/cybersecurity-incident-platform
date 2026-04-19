package com.cybersecurity.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "incidents")
@Data
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String severity;
    private String incidentType;
    private String status;
    private String sourceIp;
    private String destinationIp;
    private String affectedSystems;

    @ManyToOne
    @JoinColumn(name = "reported_by")
    private User reportedBy;

    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) {
            status = "OPEN";
        }
    }
}