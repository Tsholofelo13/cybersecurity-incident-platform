package com.cybersecurity.service;

import com.cybersecurity.model.AuditLog;
import com.cybersecurity.model.User;
import com.cybersecurity.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuditService {
    
    @Autowired
    private AuditLogRepository auditLogRepository;
    
    public void log(String action, String entityType, Long entityId, String details) {
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setEntityType(entityType);
        log.setEntityId(entityId);
        log.setDetails(details);
        
        // Get current user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        log.setUserName(username);
        
        auditLogRepository.save(log);
    }
    
    public void logWithUser(String action, String entityType, Long entityId, User user, String details) {
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setEntityType(entityType);
        log.setEntityId(entityId);
        log.setUser(user);
        log.setUserName(user.getUsername());
        log.setDetails(details);
        auditLogRepository.save(log);
    }
}
