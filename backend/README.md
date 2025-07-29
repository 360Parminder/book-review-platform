
```markdown
# ShelfWise Backend

Node.js + Express REST API server for ShelfWise with MongoDB database.

---

## Setup

1. Ensure Node.js and MongoDB are installed.
2. From the `/backend` directory, install dependencies:

```
npm install
```

3. Setup your environment variables:

Create `.env` with contents similar to:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shelfwise
```

Adjust `MONGODB_URI` to your MongoDB connection string.

---

## Available Scripts

- `npm start`  
  Runs the server once.

- `npm run dev`  
  Runs the server with `nodemon` for auto-restarting on changes (development mode).

---

## API Endpoints

Base URL: `/api`

### Books

- `GET /api/books` - List all books with optional query filters (`?genre=&author=`)
- `POST /api/books` - Create new book
- `GET /api/books/:id` - Get single book with reviews
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book (also deletes related reviews)

### Reviews

- `POST /api/books/:id/reviews` - Add a review for a book
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review

---

## Project Structure

```
src/
├── models/          # Mongoose schemas (Book.js, Review.js)
├── routes/          # Express route handlers
├── services/        # Business logic and DB queries
├── app.js           # Express app setup and middleware
├── db.js            # MongoDB connection setup
└── index.js         # Server start file
```

---

## Notes

- Uses Mongoose for data modeling.
- Error handling and validation done per route.
- CORS enabled for frontend requests.
- Environment variables managed with `dotenv`.

---

## Contact

For backend issues, file tickets or reach out via the project channels.

---

*Developed as part of ShelfWise — Book Review Platform.*
```

If you want me to generate `.env.example` files or package.json scripts as well, just ask!