# Fraud Detection Website

A comprehensive fullstack application for detecting fraudulent transactions using machine learning and real-time analysis.

## Features

- **Real-time Fraud Detection**: ML-powered transaction analysis
- **Interactive Dashboard**: Visualize fraud patterns and trends
- **Transaction Management**: Upload and monitor transactions
- **Alert System**: Immediate notifications for suspicious activity
- **User Authentication**: Secure login and authorization
- **Analytics**: Detailed fraud analytics and reporting

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Chart.js for data visualization
- Axios for API calls

### Backend
- Node.js with Express.js
- MongoDB for data storage
- Python Flask for ML models
- JWT for authentication

## Installation

### Prerequisites
- Node.js 16+
- Python 3.8+
- MongoDB

### Setup

1. Clone the repository
```bash
git clone https://github.com/touhid365/Fraud_Detection.git
cd Fraud_Detection
```

2. Setup Backend
```bash
cd backend
npm install
```

3. Setup Frontend
```bash
cd frontend
npm install
```

4. Setup ML Model
```bash
cd ml-model
pip install -r requirements.txt
```

## Running the Application

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd frontend
npm start
```

### Start ML Server
```bash
cd ml-model
python app.py
```

## Project Structure

```
Fraud_Detection/
├── frontend/          # React frontend application
├── backend/           # Express.js backend API
├── ml-model/          # Python ML model service
├── docker-compose.yml # Docker configuration
└── README.md
```
