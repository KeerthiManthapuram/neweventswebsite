# Responsive Event Website

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) application for browsing, managing, and booking events.  
This project includes a fully responsive frontend, a secure backend API, and a MongoDB database.

---

## Project Overview

The **Responsive Event Website** allows users to:
- View **upcoming** and **recommended** events.
- Authenticate via **signup** and **login**.
- Explore event details with a mobile-friendly, responsive layout.
- Scroll horizontally for event cards and vertically for full pages.
- Enjoy seamless lazy loading for better performance.

**Key Features**
- **Frontend**: React.js with Context API for state management.
- **Backend**: Node.js + Express.js REST API.
- **Database**: MongoDB (with Mongoose ODM).
- **UI/UX**: Responsive design using Flexbox, CSS Grid, and media queries.
- **Performance**: Lazy loading images and API calls.
- **Authentication**: Secure login/signup with JWT.

---

## 📂 Folder Structure

event-website/
│
├── README.md # Main project documentation
├── backend/ # Backend (Node.js + Express + MongoDB)
│ ├── package.json
│ |-config/ # DB connection, env variables
│ │-controllers/ # API logic
│ │-models/ # Mongoose schemas
│ │-routes/ # API routes
│ │-utils/ # Helpers/middleware
│ │ 
│ └── .env.example
│
└── eventwebsite/ # Frontend (React.js)
├── package.json
├── public/
└── src/
├── components/ # Reusable UI components
├── pages/ # Page components (Home, Login, etc.)
├── routes
|---utils
├── services/ # API calls
├── App.js



---

## Setup & Local Run Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/KeerthiManthapuram/neweventswebsite.git
cd responsive-event-website

2️⃣ Backend Setup
cd backend
npm install
Create .env in backend/:

PORT=5500
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

Run backend:
    npm run dev


3️⃣ Frontend Setup
cd ../eventwebsite
npm install

Run frontend:
    npm start

Access App:
Frontend → http://localhost:3000
Backend API → http://localhost:5500


📡 API Documentation

Authentication

1. POST /api/auth/signup
Registers a new user.
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}

2. POST /api/auth/login
Logs in an existing user.
Body:
{
  "email": "john@example.com",
  "password": "123456"
}
Response:
{
  "token": "jwt_token_here"
}


### **Events**

This project fetches event data from the provided API endpoints.

#### 1. **Recommended Shows**
- **API Endpoint:**
AZURE_FUNCTION_KEY=your_azure_function_key_here


- Returns only **8 recommended shows**.
- These are displayed in a **horizontal scroll** with **infinite looping**.
- Each item includes `img_url` for the event’s thumbnail.

#### 2. **Upcoming Events**
- **API Endpoint:**
AZURE_FUNCTION_KEY=your_azure_function_key_here


- Returns multiple pages of upcoming events.
- Displayed in **vertical scroll**.
- Must implement **infinite scrolling**:
  - Fetch the next page **only when the user scrolls to the end**.
  - Show a loading spinner while fetching the next page.

#### Example Event Schema:
{
  "eventName": "Winter Wonderland Fair",
  "cityName": "West Douglas",
  "date": "2024-03-24T00:00:00.000Z",
  "weather": "Snowy 26C",
  "distanceKm": "4264.1226847222415",
  "img_url": "https://drive.google.com/file/d/1lS1XAo47YvNSoFp1NE5rmhTSQ8qNBWEh/view"
}


💡 Design & Technical Decisions
1. Tech Stack Choice
MongoDB: Flexible document storage for user data.

Express.js: Lightweight backend framework for REST APIs.

React.js: Component-based frontend for modularity and reusability.

Node.js: Asynchronous, event-driven backend.

JWT Authentication: Secure token-based user sessions.

2. Responsive UI
CSS flex and grid layouts for adaptive designs.

media queries to handle varied screen sizes.

Mobile-first approach for better accessibility.

3. State Management
React Context API for global states (auth, events).

Avoided Redux to keep complexity low for this stage.

4. Performance Optimizations
Lazy loading event images and API calls.

API pagination for large datasets.


5. Scalability Considerations
Modular backend routes and controllers.

Separate config files for environment variables.

Organized folder structure for future expansion.



📜 License
This project is licensed under the MIT License.

---













