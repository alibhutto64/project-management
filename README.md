# ShowcasePM - Project Management Showcase

A MERN stack application demonstrating project management features including:
- AI Task Assistant
- Inbox Aggregator
- Visual Roadmap
- Idea Voting Board

## Setup Instructions

### Prerequisites
- Node.js v16+
- MongoDB
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
```bash
cd server && npm install
cd ../client && npm install
```

3. Configure environment variables:
```bash
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret
```

### Running the Application
Start both server and client in development mode:
```bash
# In one terminal:
cd server && npm start

# In another terminal:
cd client && npm start
```

### Available Scripts
- `server/`
  - `start`: Start the server
  - `dev`: Start with nodemon
- `client/`
  - `start`: Start React dev server
  - `build`: Create production build

## Features
- **AI Task Assistant**: POST `/api/tasks/assist` with task description
- **Inbox Aggregator**: View aggregated items from multiple sources
- **Visual Roadmap**: Drag-and-drop timeline of tasks
- **Idea Board**: Upvote/downvote ideas with real-time updates

## Deployment
For production deployment, configure:
- Proper JWT secret
- MongoDB Atlas URI
- Environment variables
- HTTPS