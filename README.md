# MentorVerse (CampusHero) - Mentor-Mentee Online Meeting Platform

A modern, responsive web application designed for 5 BCA students to facilitate seamless mentor-mentee meeting sessions, saving time for both teachers and students.

## Project Overview

MeetHub simplifies the process of scheduling and conducting mentor-mentee sessions by allowing:

- **Teachers/Mentors**: Select students by roll number ranges or custom selections, create meeting sessions, and manage their mentoring schedules
- **Students/Mentees**: View assigned mentor sessions, join meetings, and track their mentoring progress

## Key Features

### For Teachers

- **Dashboard**: Overview of all sessions, statistics, and quick actions
- **Roll Number Selection**: Select students by:
  - Range (e.g., 1-12, 12-26)
  - Custom roll numbers (1, 3, 5, 8, 12)
  - Mix of ranges and custom selections
- **Session Management**: Create, edit, and cancel sessions
- **Session Details**: Set title, description, date, time, and duration
- **Student Filtering**: Easy student selection with preview of selected students

### For Students

- **Dashboard**: View all assigned mentor sessions
- **Session Cards**: Display mentor info, session details, and join options
- **Status Tracking**: See scheduled, ongoing, and completed sessions
- **Mentor Connection**: Know who is mentoring them

### Common Features

- **Authentication**: Role-based login (Teacher/Student)
- **Settings**: Profile management and preferences
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS for a polished appearance

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Package Manager**: npm

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.tsx      # Top navigation bar
│   ├── SessionCard.tsx # Session display component
│   ├── RollNumberSelector.tsx # Roll number selection widget
│   ├── LoadingSpinner.tsx # Loading indicator
│   ├── Alert.tsx       # Alert/notification component
│   └── index.ts        # Component exports
├── pages/              # Page components
│   ├── LoginPage.tsx   # Authentication page
│   ├── TeacherDashboard.tsx # Teacher dashboard
│   ├── StudentDashboard.tsx # Student dashboard
│   ├── CreateSessionPage.tsx # Session creation/editing
│   ├── SettingsPage.tsx # User settings
│   ├── NotFoundPage.tsx # 404 error page
│   └── index.ts        # Page exports
├── types/              # TypeScript type definitions
│   └── index.ts        # User, Session, StudentList types
├── styles/             # Global styles
│   └── index.css       # Tailwind CSS with custom components
├── hooks/              # Custom React hooks (future use)
├── App.tsx             # Main app component with routing
├── main.tsx            # Application entry point
└── vite-env.d.ts       # Vite type declarations
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm 7+

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

3. **Open in browser**
   - Navigate to `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📝 Demo Credentials

The application comes with sample demo accounts for testing:

### Teacher Login

- **Email**: `teacher1@college.edu`
- **Password**: `teacher123`

### Student Login

- **Email**: `student1@college.edu`
- **Password**: `student123`

## Design System

### Colors

- **Primary**: Sky Blue (#0ea5e9)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)

### Components

- **Buttons**: Primary, Secondary, Danger, Success variants
- **Cards**: Standard card with hover effects
- **Input Fields**: Consistent styling with focus states
- **Badges**: Status indicators

## User Workflows

### Teacher Workflow

1. Login with teacher credentials
2. View dashboard with session statistics
3. Click "Create New Session"
4. Fill in session details (title, description, date, time, duration)
5. Select students using roll number ranges or custom selection
6. Click "Create Session"
7. Manage sessions from dashboard (edit, cancel, join meeting)

### Student Workflow

1. Login with student credentials
2. View dashboard showing assigned mentor sessions
3. Review upcoming sessions with mentor information
4. Click "Join Meeting" to join a scheduled or ongoing session
5. View session history (completed sessions)

## Authentication

- **Session-based**: User data stored in browser sessionStorage
- **Role-based Access Control**: Different routes for teachers and students
- **Protected Routes**: Automatic redirect to login if required

## API Integration (Future)

The current implementation uses mock data. To integrate with a backend:

1. Replace mock data in pages with API calls
2. Update API endpoints in environment variables
3. Implement proper error handling
4. Add loading states during API calls

### Suggested Backend Endpoints

```
POST   /api/auth/login           # User authentication
GET    /api/sessions             # Get user's sessions
POST   /api/sessions             # Create new session
PUT    /api/sessions/:id         # Update session
DELETE /api/sessions/:id         # Cancel session
GET    /api/students             # Get student list
POST   /api/sessions/:id/join    # Join meeting
```

## Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.x",
    "lucide-react": "^latest"
  },
  "devDependencies": {
    "@types/react": "^18.3.x",
    "@types/react-dom": "^18.3.x",
    "@vitejs/plugin-react": "^4.x",
    "typescript": "^5.x",
    "vite": "^8.0.x",
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x"
  }
}
```

## Responsive Design

- **Mobile**: Optimized for screens < 640px
- **Tablet**: Optimized for screens 640px - 1024px
- **Desktop**: Optimized for screens > 1024px
- **Navigation**: Hamburger menu on mobile, full menu on desktop

## Next Steps & Enhancements

1. **Backend Integration**
   - Connect to SQL database (MySQL/PostgreSQL)
   - Implement authentication APIs
   - Create session management APIs

2. **Video Meeting Integration**
   - Integrate Jitsi Meet, Zoom SDK, or WebRTC
   - Implement meeting room creation
   - Add recording functionality

3. **Notifications**
   - Email notifications for scheduled sessions
   - In-app notifications
   - Reminder system (15 minutes before session start)

4. **Advanced Features**
   - Session notes/transcripts
   - Attendance tracking
   - Feedback/rating system
   - Session recordings
   - Calendar integration
   - Bulk operations for sessions

5. **Admin Panel**
   - User management
   - Session monitoring
   - Analytics and reporting
   - System administration

## License

This project is created for 5 BCA A students.

## Support & Contact

For issues, suggestions, or feature requests, please contact the development team.

---

### Quick Reference

| Page              | Path                        | Role    | Purpose                  |
| ----------------- | --------------------------- | ------- | ------------------------ |
| Login             | `/login`                    | Public  | User authentication      |
| Teacher Dashboard | `/teacher/dashboard`        | Teacher | View and manage sessions |
| Create Session    | `/teacher/create-session`   | Teacher | Create new session       |
| Edit Session      | `/teacher/edit-session/:id` | Teacher | Modify session details   |
| Student Dashboard | `/student/dashboard`        | Student | View assigned sessions   |
| Settings          | `/settings`                 | User    | Profile management       |

---

**Last Updated**: March 30, 2026  
**Version**: 1.0.0 (MVP)
