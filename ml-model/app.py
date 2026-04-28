from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Simulated ML Model for fraud detection
class FraudDetectionModel:
    def __init__(self):
        self.high_risk_merchants = ['Casino', 'Lottery', 'Betting']
        self.high_risk_countries = ['Unknown', 'High Risk Zone']
        self.normal_amount_range = (10, 5000)  # Normal transaction range

    def calculate_fraud_score(self, amount, merchant, location):
        """Calculate fraud score based on transaction details"""
        score = 0

        # Check amount anomaly (0-30 points)
        if amount < self.normal_amount_range[0] or amount > self.normal_amount_range[1]:
            score += 20
        if amount > 10000:  # Very high amount
            score += 10

        # Check merchant risk (0-30 points)
        if merchant and any(risk in merchant for risk in self.high_risk_merchants):
            score += 30
        elif merchant:
            score += 5

        # Check location risk (0-40 points)
        if location:
            country = location.get('country', '')
            if any(risk in country for risk in self.high_risk_countries):
                score += 40
            elif country and country.lower() != 'united states':
                score += 10

        # Random factor to simulate ML model behavior (0-10 points)
        score += np.random.uniform(0, 10)

        # Ensure score is between 0-100
        return min(max(score, 0), 100)

model = FraudDetectionModel()

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ML Model is running'})

@app.route('/predict', methods=['POST'])
def predict():
    """Predict fraud for a transaction"""
    try:
        data = request.get_json()
        
        amount = data.get('amount', 0)
        merchant = data.get('merchant', '')
        location = data.get('location', {})

        fraud_score = model.calculate_fraud_score(amount, merchant, location)
        
        is_fraud = fraud_score > 50
        risk_level = 'HIGH' if fraud_score > 70 else 'MEDIUM' if fraud_score > 40 else 'LOW'

        return jsonify({
            'fraud_score': round(fraud_score, 2),
            'is_fraud': is_fraud,
            'risk_level': risk_level,
            'timestamp': datetime.now().isoformat()
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/model-info', methods=['GET'])
def model_info():
    """Get model information"""
    return jsonify({
        'name': 'Fraud Detection Model v1.0',
        'version': '1.0.0',
        'features': ['amount', 'merchant', 'location', 'timestamp']
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
