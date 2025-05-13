# Notes Keeper Frontend

A modern React application for the Notes Keeper project that allows users to create, organize, and manage notes.

## Live Demo

Visit the application at: [https://note-keep-book.vercel.app/](https://note-keep-book.vercel.app/)

## Features

- Create and manage notes with titles, content, and color coding
- Organize notes into customizable groups
- Filter notes by group
- Responsive design that works on all devices
- Clean and intuitive user interface
- Toast notifications for user feedback

## Technology Stack

- React.js for UI components
- React Router for navigation
- React Context API for state management
- Axios for API communication
- React Toastify for notifications
- CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

The application will be running at `http://localhost:3000`

## Project Structure

```
src/
├── components/       # Reusable UI components
├── contexts/         # React contexts for state management
│   └── NoteContext.jsx    # State management for notes and groups
├── pages/            # Application pages
│   └── Dashboard.jsx      # Main application dashboard
├── services/         # API services
│   ├── api.js             # Axios instance setup
│   ├── noteService.js     # Note API methods
│   └── groupService.js    # Group API methods
├── styles/           # CSS styles
├── App.jsx           # Main application component
└── main.jsx          # Entry point
```

## API Communication

The frontend communicates with the backend API using Axios. The base API URL is configured in `src/services/api.js`.

### Development

```
http://localhost:5000/api
```

### Production

```
https://your-production-api-url.com/api
```

## Available Services

### Note Service

- `getAllNotes(groupId?)` - Get all notes, optionally filtered by group
- `getNote(id)` - Get a specific note
- `createNote(noteData)` - Create a new note
- `updateNote(id, noteData)` - Update a note
- `deleteNote(id)` - Delete a note

### Group Service

- `getAllGroups()` - Get all groups
- `getGroup(id)` - Get a specific group
- `createGroup(groupData)` - Create a new group
- `updateGroup(id, groupData)` - Update a group
- `deleteGroup(id)` - Delete a group

## State Management

The application uses React Context API for state management. The `NoteContext` provides:

- Notes and groups data
- Loading states
- CRUD operations for notes and groups
- Group filtering functionality

## Deployment

The frontend is deployed on Vercel. Any changes pushed to the main branch will automatically trigger a new deployment.
