
# AI Chatbot

A full-stack AI-powered chatbot application using Express, Socket.io, and Google GenAI for the backend, and React, Vite, Tailwind CSS, and Socket.IO client for the frontend.

# Screen shot

![AI Chatbot Screenshot](https://ik.imagekit.io/6i2qiqf2n/chatbot-screenshot.png?updatedAt=1756654380081)

## Features

- Real-time chat with AI responses
- WebSocket communication using Socket.io
- Backend powered by Express and Google GenAI
- Frontend built with React, Vite, and Tailwind CSS

## Project Structure

```
aichatbot/
├── Backend/
│   ├── server.js           # Express + Socket.io server
│   ├── src/
│   │   ├── app.js          # Express app setup
│   │   └── Services/
│   │       └── ai.service.js # Google GenAI integration
│   ├── package.json
│   └── .env                # Environment variables
├── Frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Tailwind styles
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── readme.md
```

## Getting Started

### Backend

1. Install dependencies:
	```powershell
	cd Backend
	npm install
	```
2. Set up your `.env` file with required API keys (e.g., Google GenAI).
3. Start the server:
	```powershell
	node server.js
	```

### Frontend

1. Install dependencies:
	```powershell
	cd Frontend
	npm install
	```
2. Start the development server:
	```powershell
	npm run dev
	```
3. Open `http://localhost:5173` in your browser.

## Usage

- Open the frontend in your browser.
- Type a message in the chat interface.
- The backend processes your message and responds using Google GenAI.

## Technologies Used

- **Backend:** Node.js, Express, Socket.io, Google GenAI
- **Frontend:** React, Vite, Tailwind CSS, Socket.IO client

## License

MIT