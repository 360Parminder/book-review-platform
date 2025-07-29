```markdown
# ShelfWise Frontend

React frontend application for ShelfWise — a Book Review platform.

---

## Setup

1. Ensure you have Node.js installed.
2. From the `/frontend` directory, install dependencies:

```
npm install
```

3. Create a `.env` file at the root of this folder with:

```
REACT_APP_API_BASE=http://localhost:8007/api/v1
```

(Change this URL if your backend runs elsewhere.)

---

## Available Scripts

- `npm start`  
  Runs the app in development mode at [http://localhost:5173](http://localhost:5173).

- `npm run build`  
  Builds the app for production to the `build` folder.

- `npm test`  
  Launches the test runner.

---

## Project Structure

```
src/
├── components/        # Reusable UI components (BookList, BookForm, ReviewForm...)
├── context/           # React Context for state management
├── pages/             # Route-level components (Landing, Home, BookPage)
├── config/            # Config (Api Config, External API)
├── App.js             # Main app component with routing
└── index.js           # App entry point

```

---

## Notes

- Uses React Router for navigation.
- Axios handles API calls to backend.
- Material UI components for modern styling.
- React Toastify for in-app notifications.
- State management central via React Context.

---

## Environment Variables

- `REACT_APP_API_BASE` - base url for backend API endpoints.

---

## Contact

For questions or suggestions, open an issue or contact the maintainer.
```
