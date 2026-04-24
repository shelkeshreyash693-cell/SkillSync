# SkillSync - Event and Hackathon Team Finder

SkillSync is a comprehensive platform designed for students to find ideal teammates for hackathons, coding sprints, and PBL (Project-Based Learning) assignments. By leveraging a smart matching engine and a dynamic academic skill tree, SkillSync connects complementary technical talents to build high-performing teams.

## 🚀 Live Demo

- **Frontend (Vercel)**: [https://skill-sync-eight-fawn.vercel.app/](https://skill-sync-eight-fawn.vercel.app/)
- **Backend API (Render)**: [https://skillsync-vvtm.onrender.com/api](https://skillsync-vvtm.onrender.com/api)

## ✨ Features

- **Smart Matching Engine**: Algorithmically suggests potential teammates based on skill compatibility and event requirements.
- **Dynamic RPG Skill Tree**: Students can visually track their academic and technical progress, unlocking new nodes as they master skills.
- **Teammate Finder**: Filter and browse user profiles tailored to specific hackathons to form the perfect squad.
- **Real-Time Dashboard Stats**: View your total projects, active invitiations, and academic level at a glance.
- **Seamless Invites System**: A dedicated interface to send and manage team collaboration requests.
- **Premium UI/UX**: Built with a sleek dark theme, glassmorphic elements, SweetAlert2 modals, and a global Light/Dark mode toggle.

## 🛠️ Technology Stack

### Frontend
- HTML5, CSS3 (Vanilla, custom design system)
- JavaScript (Vanilla, Fetch API for asynchronous requests)
- SweetAlert2 (for interactive modals)
- FontAwesome (for iconography)
- Hosted on **Vercel**

### Backend
- Java 17
- Spring Boot 3.2.4 (Spring Web, Spring Data JPA)
- H2 In-Memory Database (configured for cloud persistence via seeding)
- Maven
- Hosted on **Render.com** (Dockerized)

## 💻 Local Development Setup

To run this project locally on your machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/shelkeshreyash693-cell/SkillSync.git
cd SkillSync
```

### 2. Run the Backend (Spring Boot)
Ensure you have Java 17+ and Maven installed.
```bash
cd skillsync-backend
# For Windows
mvnw.cmd spring-boot:run
# For Linux/Mac
./mvnw spring-boot:run
```
The backend API will be available at `http://localhost:8080/api`. Note: The API uses `data.sql` to automatically seed mock users and hackathons on startup.

### 3. Run the Frontend
1. Open `skillsync-frontend/script.js` in a text editor.
2. Change the `API_BASE_URL` on line 6 to point to your local backend:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/api';
   ```
3. Open `skillsync-frontend/index.html` in your web browser (or use an extension like Live Server in VS Code).

## 📝 Usage

1. **Register/Login**: Create a new account or use the mock admin credentials:
   - Email: `admin@skillsync.edu`
   - Password: `admin123`
2. **Onboarding**: New users will be prompted to enter their completed projects and starter skills.
3. **Explore**: Navigate to the "Events & Hackathons" tab to find upcoming opportunities.
4. **Find Teammates**: Click "View & Find Team" on an event to see recommended matches based on the required skills.

## 👥 Authors
- Developed by Shreyash Shelke as a Mini Project for Sem 4 PBL.
