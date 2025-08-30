# TechQuest 🚀

TechQuest is a web application that generates AI-powered coding challenges to help users prepare for interviews, assess their skills, and engage in continuous learning.

## 💡 Functionality

* **AI-Generated Challenges**: Utilizes Google's Gemini model to create coding challenges across various subjects and difficulty levels (Easy, Medium, and Hard).
* **Multiple Subjects**: Offers challenges in 8 different technical domains, including Data Structures & Algorithms (DSA), C++, SQL, and Java.
* **User Authentication**: Implements secure user sign-up and login functionality powered by Clerk.
* **Challenge History**: Allows users to track and review their previously attempted challenges.
* **Daily Quota System**: Provides a fair usage system, granting each user 5 new challenges per day.

---

## 🛠 Tech Stack

### Backend

* **FastAPI**: A modern, fast web framework for building APIs.
* **SQLAlchemy**: The SQL toolkit and Object-Relational Mapper for Python.
* **PostgreSQL**: A powerful, open-source object-relational database system.
* **Google Gemini AI**: The AI model used for generating challenges.
* **Clerk**: For user authentication and management.

### Frontend

* **React**: A JavaScript library for building user interfaces.
* **React Router**: For declarative routing in React applications.
* **Vite**: A fast build tool and development server.

---

## 📊 API Endpoints

The application exposes the following API endpoints for managing challenges and user data.

### Challenge Management

* `POST /api/generate-challenge`: Generates a new coding challenge based on specified difficulty and subject.
* `GET /api/my-history`: Retrieves the current user's history of completed challenges.
* `GET /api/quota`: Checks the user's remaining daily challenge quota.
* `DELETE /api/delete-challenge/{challenge_id}`: Deletes a specific challenge from the user's history.
* `GET /api/test`: A health check endpoint to verify that the API is running.

### Webhooks

* `POST /webhooks/clerk`: Handles user creation events from Clerk to initialize user data in the application.

---

## 🤝 Contributing

1.  **Fork the repository**
2.  **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3.  **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4.  **Push to the branch** (`git push origin feature/amazing-feature`)
5.  **Open a Pull Request**
