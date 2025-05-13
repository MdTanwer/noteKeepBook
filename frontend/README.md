# Pocket Notes Frontend

## Overview

This is the frontend application for Pocket Notes, a modern note-taking web application that allows users to create, organize, and manage their notes in an intuitive interface. Built with React and modern web technologies, the application provides a seamless and responsive user experience across devices.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Components](#components)
6. [State Management](#state-management)
7. [Styling](#styling)
8. [Responsive Design](#responsive-design)
9. [API Integration](#api-integration)
10. [Docker](#docker)

## Features

- User authentication (register, login, logout)
- Notes management (create, read, update, delete)
- Group organization for notes
- Color-coded groups for visual organization
- Mobile-responsive design
- Real-time input and updates
- Toast notifications for user feedback
- Secure token-based authentication

## Tech Stack

- **React**: UI library for building the user interface
- **React Router**: For navigation and routing
- **Context API**: For state management
- **Axios**: For API requests
- **React Toastify**: For notifications
- **React Helmet**: For document head management
- **CSS**: For styling components
- **Vite**: For fast development and building
- **Docker**: For containerization

## Project Structure

The project follows a modular architecture with clear separation of concerns:

```
frontend/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, fonts, and other assets
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── styles/           # CSS stylesheets
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   ├── App.css           # Application styles
│   ├── index.css         # Global styles
│   └── main.jsx          # Entry point
├── .dockerignore         # Docker ignore configuration
├── .gitignore            # Git ignore configuration
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package.json          # Project dependencies
└── vite.config.js        # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Backend API running (see backend documentation)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:5000/api
```

4. Run the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Components

### Key Components

1. **Sidebar**: Displays groups and provides navigation

   - Group list with color indicators
   - Create new group functionality
   - Group selection

2. **NotesContainer**: Main note display and interaction area

   - Display notes for selected group
   - Create new notes
   - Edit and delete notes
   - Empty state for no notes

3. **Modal**: Reusable modal component for forms

   - Used for creating/editing groups and notes
   - Customizable header, body, and footer

4. **NoteCard**: Individual note display
   - Title and content display
   - Timestamp formatting
   - Edit and delete actions

## State Management

The application uses React Context API for state management:

1. **AuthContext**: Manages authentication state

   - User login/registration
   - Authentication status
   - User profile information
   - Token management

2. **NoteContext**: Manages notes and groups
   - CRUD operations for notes
   - CRUD operations for groups
   - Current selected group
   - Loading states

## Styling

The application uses custom CSS for styling:

- Modular CSS files for components
- Responsive design principles
- Color theming for groups
- Clean and intuitive user interface

The design follows these key principles:

- Simple and clean UI
- Consistent spacing and typography
- Responsive layouts for all screen sizes
- Visual feedback for user actions

## Responsive Design

The frontend is fully responsive and works on devices of all sizes:

- **Desktop**: Full sidebar and content area side by side
- **Tablet**: Adaptable layout with collapsible sidebar
- **Mobile**: Full-screen views with navigation between lists and content

Responsive features include:

- Flexible layouts using CSS Flexbox
- Media queries for different screen sizes
- Touch-friendly interface elements
- Optimized spacing for small screens

## API Integration

The frontend communicates with the backend API using Axios:

- Request interceptors for adding authentication tokens
- Response interceptors for handling errors
- Centralized API service for consistent communication
- Error handling and user feedback

## Docker

You can run the application with Docker:

```bash
# Build and run with Docker
docker build -t pocket-notes-frontend .
docker run -p 3000:80 pocket-notes-frontend

# Or use docker-compose
docker-compose up -d
```

## Deployment

Build the application for production:

```bash
npm run build
```

The built application will be in the `dist` directory, ready to be deployed to any static hosting service.

## Local Development

Start the development server:

```bash
npm run dev
```

This will start a development server at http://localhost:5173 with hot module replacement.

---

© 2023 Pocket Notes. All rights reserved.
