import torch
import torch.nn as nn
import numpy as np
import json
import urllib.request

# Neural network model for incident prediction
class IncidentNN(nn.Module):
    def __init__(self):
        super(IncidentNN, self).__init__()
        self.layer1 = nn.Linear(7, 16)
        self.layer2 = nn.Linear(16, 8)
        self.layer3 = nn.Linear(8, 1)
        self.relu = nn.ReLU()
    
    def forward(self, x):
        x = self.relu(self.layer1(x))
        x = self.relu(self.layer2(x))
        x = self.layer3(x)
        return x

# Generate sample training data (daily incidents for 30 days)
np.random.seed(42)
days = 30
X_train = np.random.rand(days, 7).astype(np.float32)
y_train = (np.random.rand(days) * 10).astype(np.float32)  # Random incident counts

# Convert to PyTorch tensors
X_train = torch.from_numpy(X_train)
y_train = torch.from_numpy(y_train).view(-1, 1)

# Create and train model
model = IncidentNN()
criterion = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

print("Training AI model for incident prediction...")
for epoch in range(100):
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = criterion(outputs, y_train)
    loss.backward()
    optimizer.step()
    
    if epoch % 20 == 0:
        print(f"Epoch {epoch}, Loss: {loss.item():.4f}")

print("\n=== AI Analytics Results ===")
print("Model trained successfully!")
print(f"Final loss: {loss.item():.4f}")

# Make a prediction for next week
test_input = torch.rand(1, 7)
prediction = model(test_input)
print(f"Predicted incidents for next week: {int(prediction.item())}")
