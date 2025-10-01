# 🍅 Pomodoro Project Tracker (Full-Stack)
A professional, full-stack implementation of the Pomodoro Technique designed to help users manage time and track project-specific work sessions. This application uses a dedicated API Server and a PostgreSQL database to ensure reliable, synchronized data persistence across devices.

## ✨ Key Features
⏱️ Pomodoro Timer: Standard 25-minute work sessions with integrated start/stop controls tied to specific projects.

✅ Full Project Lifecycle: Add, view, edit, and track individual project tasks and their associated work sessions.

🌐 Data Synchronization: All tasks and session logs are saved instantly to a central PostgreSQL database.

🔒 Secure API Layer: Data requests are handled by a dedicated API server, ensuring secure and controlled access to the database.

📱 Fully Responsive: The user interface is built with React and is optimized for both desktop and mobile use.

🛠️ Technology Stack (Three-Tier Architecture)
This application is divided into three distinct layers:

1. Frontend (Client)
Framework: React

Routing: React Router DOM

Function: Handles the user interface, timer display, and sends API requests.

2. Backend (Server/API)
Framework/Language: Python/Flask

Function: Serves the React files, validates incoming data, handles user authentication, and runs the PostgreSQL queries.

3. Database
Database: PostgreSQL

Function: Securely stores all project details, task data, and Pomodoro session history.

🚀 Local Development Setup
To run this full-stack application locally, you must run both the backend server and the frontend client simultaneously.

Prerequisites
You need Node.js, npm, and a local PostgreSQL instance running.

1. Database Setup
Ensure your local PostgreSQL service is running.

Create a new database for the project (e.g., pomodoro_db).

Update the connection string in your backend configuration file with your local PostgreSQL credentials.

2. Installation & Running the Server
Clone the Repository:

git clone [https://github.com/osasekhator/Pomodoro-Web-App.git](https://github.com/osasekhator/Pomodoro-Web-App.git)
cd Pomodoro-Web-App

Install Dependencies (Server and Client):

Run npm install in the root directory
npm install
You will also need to install dependencies for your backend server
e.g., pip install -r requirements.txt (if using Python)

Start the Backend API Server:

Use the appropriate command for your server (e.g., node server.js or python main.py)
npm run start-server 

(The server should now be running, typically on port 5000.)

Running the Frontend
Start the React Client:

npm start

The application will open in your browser at http://localhost:3000 and communicate with your local API server.

☁️ Deployment
Since this is a full-stack application utilizing a backend server and a PostgreSQL database, it cannot be deployed to static hosting services like GitHub Pages.

I intend to deploy this application, with the use of a Platform as a Service (PaaS) provider, capable of hosting a dynamic web service and a database instance.
