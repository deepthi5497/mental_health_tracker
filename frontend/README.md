# Mental Health Progress Tracker

A web application for tracking daily mental health metrics and visualizing progress over time.

## Features

- User authentication (Register/Login)
- Daily mental health logging
  - Mood tracking
  - Anxiety levels
  - Sleep quality
  - Physical activity
  - Social interactions
  - Stress levels
  - Symptom tracking
- Interactive data visualization
- Progress monitoring over time

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- SQLite

## Installation & Setup

### 1. Clone the Repository

```bash
git clone [repository-url]
cd mental-health-tracker
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
echo "JWT_SECRET=your_secret_key_here" > .env
echo "PORT=5000" >> .env

# Start the server
npm start
```

The backend server should now be running on http://localhost:5000

### 3. Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application should now be running on http://localhost:5173

## Project Structure

```
mental-health-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   └── App.jsx
    └── package.json
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Daily Logs
- POST `/api/logs` - Create new log
- GET `/api/logs` - Get user's logs
- GET `/api/logs/range` - Get logs by date range
- GET `/api/logs/summary` - Get statistics summary

## Environment Variables

Backend (.env):
```
JWT_SECRET=your_secret_key_here
PORT=5000
```

## Dependencies

### Backend
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "sequelize": "^6.31.0",
    "sqlite3": "^5.1.6",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  }
}
```

### Frontend
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.12.0",
    "tailwindcss": "^3.3.6"
  }
}
```

## Usage

1. Register a new account or login with existing credentials
2. Fill out the daily log form with your mental health metrics
3. Submit the form to save your daily log
4. View your progress in the visualization chart
5. Access historical data and summary statistics

## Common Issues & Solutions

1. Port already in use:
```bash
lsof -i :5000
kill -9 <PID>
```

2. Database issues:
```bash
# Remove existing database and restart server
cd backend
rm database.sqlite
npm start
```

3. Login issues:
- Ensure backend server is running
- Check console for error messages
- Verify correct credentials

## Development

To run in development mode with auto-reload:

Backend:
```bash
cd backend
npm install -D nodemon
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, email [your-email] or open an issue in the repository.