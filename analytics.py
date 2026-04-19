import torch
import torch.nn as nn
import numpy as np
from datetime import datetime, timedelta

# Sample incident data (you can replace with real data from your API)
incidents = [
    {'severity': 'CRITICAL', 'type': 'INJECTION', 'date': '2026-04-01'},
    {'severity': 'HIGH', 'type': 'UNAUTHORIZED', 'date': '2026-04-02'},
    {'severity': 'MEDIUM', 'type': 'MALWARE', 'date': '2026-04-03'},
    {'severity': 'HIGH', 'type': 'PHISHING', 'date': '2026-04-04'},
    {'severity': 'CRITICAL', 'type': 'DDoS', 'date': '2026-04-05'},
]

# Simple prediction model
class IncidentPredictor:
    def predict_next_week(self, historical_data):
        # Simple logic - predict 10% increase
        avg_incidents = len(historical_data) / 7
        return int(avg_incidents * 1.1)
    
    def predict_risk_score(self):
        # Risk assessment based on severity
        critical_count = sum(1 for i in incidents if i['severity'] == 'CRITICAL')
        high_count = sum(1 for i in incidents if i['severity'] == 'HIGH')
        return {
            'risk_level': 'HIGH' if critical_count > 2 else 'MEDIUM',
            'score': min(100, critical_count * 20 + high_count * 10),
            'recommendation': 'Review security policies immediately' if critical_count > 2 else 'Monitor regularly'
        }

predictor = IncidentPredictor()
print("=== Cybersecurity Incident Analytics ===")
print(f"Total incidents analyzed: {len(incidents)}")
print(f"Risk Assessment: {predictor.predict_risk_score()}")
print(f"Predicted incidents next week: {predictor.predict_next_week(incidents)}")
