package com.cybersecurity.controller;

import com.cybersecurity.dto.LoginRequest;
import com.cybersecurity.model.User;
import com.cybersecurity.model.Role;
import com.cybersecurity.repository.UserRepository;
import com.cybersecurity.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            Optional<User> userOptional = userRepository.findByUsername(request.getUsername());
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
            }
            
            User user = userOptional.get();
            String jwt = jwtUtil.generateToken(user.getUsername(), user.getRole().toString());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "fullName", user.getFullName(),
                "role", user.getRole()
            ));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> userData) {
        if (userRepository.findByUsername(userData.get("username")).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username already exists"));
        }
        
        if (userRepository.findByEmail(userData.get("email")).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }
        
        User user = new User();
        user.setUsername(userData.get("username"));
        user.setEmail(userData.get("email"));
        user.setPassword(passwordEncoder.encode(userData.get("password")));
        user.setFullName(userData.get("fullName"));
        
        String roleStr = userData.get("role");
        Role role = Role.VIEWER;
        if ("ADMIN".equalsIgnoreCase(roleStr)) {
            role = Role.ADMIN;
        } else if ("ANALYST".equalsIgnoreCase(roleStr)) {
            role = Role.ANALYST;
        }
        user.setRole(role);
        user.setCreatedAt(LocalDateTime.now());
        
        userRepository.save(user);
        
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }
}
