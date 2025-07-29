```markdown
# ShelfWise - Book Review Platform

ShelfWise is a full-stack web application for managing a collection of books and writing reviews on them. Users can browse books, add new entries, and post or modify reviews.

---

## Project Structure

```
shelfwise/
├── backend/          # Node.js + Express REST API with MongoDB
├── frontend/         # React frontend application (JavaScript)
└── README.md         # This file - Common project overview
```

---

## Features

- Manage books: Create, Read, Update, Delete (CRUD) operations.
- Add, edit, delete reviews attached to books.
- Filter books by author or genre.
- Responsive and modern React UI with notifications.
- RESTful API using MongoDB with Mongoose.
- Modular design for easy enhancements.

---

## Tech Stack

- **Frontend:** React, React Router, Axios, Material UI, React Toastify
- **Backend:** Node.js, Express, MongoDB, Mongoose, dotenv, CORS
- **Dev Tools:** Nodemon (backend), Vite/CRA (frontend setup)

---

## Setup & Running Locally

Make sure you have [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com) installed.

### 1. Backend

- Located in `/backend`
- Create `.env` with MongoDB URI (sample in `backend/.env.example`)

### 2. Frontend

- Located in `/frontend`
- Create `.env` with API base URL (`REACT_APP_API_BASE=http://localhost:5000/api`)

---

## Scripts

From the **root**, you can run backend and frontend separately:

```
cd backend
npm install
npm run dev       # nodemon development with hot reload

cd ../frontend
npm install
npm start         # start React development server
```

---

## API Documentation

The backend exposes RESTful endpoints documented in `/backend/docs`. Refer to `backend/README.md` for API details.

---

## Contributing & Issues

Feel free to open issues and submit pull requests. Please follow the existing code style and add descriptive commit messages.

---

## License

MIT License

---

*ShelfWise was developed as a sample project for managing book reviews with modern JavaScript technologies.*

```

