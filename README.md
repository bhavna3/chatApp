# Real-Time Chat Application

A modern real-time chat application built with React, Node.js, Socket.io, and MongoDB.

## Features

- Real-time messaging
- User authentication
- Message history
- Modern UI with Material-UI
- Responsive design
- Dark mode

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

## Setup

1. Clone the repository
2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd client
   npm install
   ```

## Running the Application

1. Start the MongoDB server (make sure it's running on port 27017)

2. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

3. Start the React development server:
   ```bash
   cd client
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
chat-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   └── App.js         # Main App component
│   └── package.json
├── server/                 # Node.js backend
│   ├── server.js          # Express and Socket.io server
│   └── package.json
└── README.md
```

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - Socket.io-client
  - date-fns

- Backend:
  - Node.js
  - Express
  - Socket.io
  - MongoDB
  - Mongoose

## License

MIT 