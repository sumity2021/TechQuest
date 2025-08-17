# TechQuest 🚀

A modern web application that generates AI-powered coding challenges across multiple technical subjects. Perfect for interview preparation, skill assessment, and continuous learning.

## ✨ Features

- **AI-Generated Challenges**: Powered by Google's Gemini 2.0 Flash model
- **Multiple Subjects**: Support for 8 technical domains including DSA, SQL, Java, C++, and more
- **Difficulty Levels**: Easy, Medium, and Hard challenges tailored to your skill level
- **User Authentication**: Secure authentication powered by Clerk
- **Challenge History**: Track your progress and revisit previous challenges
- **Daily Quotas**: Fair usage system with 5 challenges per day per user
- **Interactive UI**: Clean, responsive interface with real-time feedback

## 🛠 Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM)
- **PostgreSQL**: Robust relational database
- **Google Gemini AI**: Advanced language model for challenge generation
- **Clerk**: Authentication and user management
- **Svix**: Webhook handling for user events
- **Uvicorn**: ASGI server for Python

### Frontend
- **React**: Modern JavaScript library for building user interfaces
- **React Router**: Declarative routing for React applications
- **Clerk React**: Authentication components and hooks
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with CSS variables and modern layouts

## 🚀 Getting Started

### Prerequisites

- Python 3.13+
- Node.js 18+
- PostgreSQL database
- Google AI API key
- Clerk account and API keys

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd techquest/backend
   ```

2. **Install dependencies**
   ```bash
   # Using uv (recommended)
   uv sync
   
   # Or using pip
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/techquest
   
   # Google AI
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Clerk Authentication
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
   JWT_KEY=your_clerk_jwt_key
   ```

4. **Database Setup**
   The application will automatically create tables on startup using SQLAlchemy.

5. **Run the server**
   ```bash
   python server.py
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=http://localhost:8000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
techquest/
├── backend/
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── databases/       # Database models and operations
│   │   ├── ai_generator.py  # AI challenge generation logic
│   │   ├── utils.py         # Authentication utilities
│   │   └── app.py          # FastAPI application setup
│   ├── server.py           # Application entry point
│   └── pyproject.toml      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── auth/           # Authentication components
│   │   ├── challenge/      # Challenge generation and display
│   │   ├── history/        # Challenge history management
│   │   ├── layout/         # Application layout
│   │   ├── utils/          # API utilities
│   │   └── App.jsx         # Main application component
│   ├── package.json        # Node.js dependencies
│   └── vite.config.js      # Vite configuration
└── README.md
```

## 🎯 Supported Subjects

- **Data Structures & Algorithms (DSA)**
- **C++**
- **SQL**
- **Object-Oriented Programming (OOP)**
- **Java**
- **Operating Systems (OS)**
- **Database Management Systems (DBMS)**
- **Computer Networks (CN)**

## 🔒 Authentication

TechQuest uses Clerk for secure user authentication:
- User registration and login
- JWT token-based API authentication
- Automatic user quota initialization via webhooks
- Secure session management

## 📊 API Endpoints

### Challenge Management
- `POST /api/generate-challenge` - Generate a new coding challenge
- `GET /api/my-history` - Retrieve user's challenge history
- `GET /api/quota` - Check remaining daily quota
- `GET /api/test` - Health check endpoint

### Webhooks
- `POST /webhooks/clerk` - Handle Clerk user creation events

## 🔧 Configuration

### CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:5173` (Local development)
- `http://localhost:5174` (Alternative local port)
- `https://tech-quest-inky.vercel.app` (Production)
- `https://tech-quest-sumity2021s-projects.vercel.app` (Alternative production)

### Rate Limiting
- 5 challenges per user per day
- Automatic quota reset every 24 hours
- Graceful handling of quota exhaustion

## 🚀 Deployment

### Backend Deployment
The backend is designed to be deployed on platforms like:
- Railway
- Heroku
- DigitalOcean App Platform
- AWS Elastic Beanstalk

### Frontend Deployment
The frontend is optimized for deployment on:
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS Amplify

## 🧪 Development

### Running Tests
```bash
# Backend tests (if implemented)
cd backend
python -m pytest

# Frontend tests
cd frontend
npm test
```

### Code Quality
- ESLint configuration for JavaScript/React
- Python type hints and modern syntax
- Consistent code formatting and structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

