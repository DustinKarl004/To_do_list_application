# Full-Stack To-Do List Application

A task management application built with React.js frontend and Node.js & Express backend, with MongoDB for database. Users can add, delete, mark tasks as completed, and view their to-do items through a clean and responsive interface.

Repository: https://github.com/DustinKarl004/To_do_list_application

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Configure environment variables:
   - Create `.env` file in backend directory if it doesn't exist yet
   - Add MongoDB connection string: `MONGODB_URI=your_connection_string`
   - Add port number: `PORT=5000`
4. Start the application:
   ```bash
   # Start backend server
   cd backend && npm start
   
   # Start frontend in new terminal
   cd frontend && npm start
   ```

## API Documentation

### Tasks Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
  - Body: `{ "title": "string", "completed": boolean }`
- `PUT /api/tasks/:id` - Update task
  - Body: `{ "title": "string", "completed": boolean }`
- `DELETE /api/tasks/:id` - Delete task

## Notes & Assumptions

- MongoDB must be installed and running locally, or a cloud MongoDB instance must be configured
- Node.js version 14+ required
- Application runs on ports 3000 (frontend) and 5000 (backend) by default
- All API endpoints require proper error handling on the client side