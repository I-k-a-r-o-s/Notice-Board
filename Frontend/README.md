# MERN Notes App

A full-stack MERN (MongoDB, Express, React, Node.js) application for creating, viewing, and managing notes.

---

## Features

- Create, view, and delete notes
- RESTful API backend (Node.js, Express, MongoDB)
- Modern React frontend (Vite, functional components)
- Axios for API requests

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud instance)

---

## Getting Started

### 1. Clone the Repository

---

### 2. Setup and Run the Backend

```bash
cd Backend
npm install
```

- Create a `.env` file in the `Backend` folder with the following content:
  ```
  MONGO_URI=your_mongodb_connection_string
  PORT=5000
  ```
- Start the backend server:
  ```bash
  npm run dev
  ```
  The backend will run on [http://localhost:5000](http://localhost:5000).

---

### 3. Setup and Run the Frontend

Open a new terminal window/tab:

```bash
cd Frontend
npm install
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

---

## Usage

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Create, view, and manage your notes.
- The frontend communicates with the backend API at `http://localhost:5000`.

---

## Project Structure

```
MERN/
  Backend/    # Express + MongoDB API
  Frontend/   # React app (Vite)
```

---

## Customization

- Update MongoDB connection string in `Backend/.env`.
- Change API endpoints in `Frontend/src/lib/axios.js` if needed.

---
