# TodoApp - Full Stack Application

A full-stack todo application with user authentication built with React and Node.js.

## Features

- User registration and login
- JWT-based authentication
- Create, read, update, and delete todos
- Responsive design

## Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database

### Installation

1. Clone the repository
2. Install dependencies for both client and server:

   ```bash
   npm run install-all
   ```

3. Set up environment variables:
   - Copy `server/.env.example` to `server/.env`
   - Fill in your MongoDB connection string and other required variables

4. Start the development servers:
   ```bash
   npm run dev
   ```
   This will start both the client (port 3000) and server (port 3001) concurrently.

## Production Deployment (Render)

This application is configured to be deployed as a single service on Render, serving both the API and the React app from the same domain.

### Deployment Steps

1. **Connect your repository to Render**

2. **Configure the service**:
   - **Runtime**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start:prod`

3. **Environment Variables** (set in Render dashboard):

   ```
   NODE_ENV=production
   PORT=10000
   DB=your_mongodb_connection_string
   DB_PASSWORD=your_db_password
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   FRONTEND_URL=https://your-app-name.onrender.com
   ```

4. **Deploy**

### How it works

- The server serves the built React app as static files
- API routes are prefixed with `/api/v1/`
- All other routes serve the React app (SPA routing)
- CORS is configured to allow requests from the same domain

## API Endpoints

- `POST /api/v1/users/signup` - User registration
- `POST /api/v1/users/login` - User login
- `GET /api/v1/tasks` - Get user's todos
- `POST /api/v1/tasks` - Create a new todo
- `PATCH /api/v1/tasks/:id` - Update a todo
- `DELETE /api/v1/tasks/:id` - Delete a todo

## Project Structure

```
todoapp/
├── client/          # React frontend
├── server/          # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
└── package.json     # Root package.json for orchestration
```
