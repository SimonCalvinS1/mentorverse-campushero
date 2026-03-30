# MeetHub Project Instructions

This file provides project-specific instructions for development, maintenance, and enhancement.

## Project Overview

MeetHub is a React-based mentor-mentee online meeting platform for 5 BCA students. It allows teachers to select students by roll number ranges and schedule video meeting sessions.

**Tech Stack**: React 19 + TypeScript + Vite + Tailwind CSS + React Router

## Development Setup

### Prerequisites

- Node.js 16+ with npm 7+
- VS Code with recommended extensions

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Opens at http://localhost:5173/

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx       # Navigation header
│   ├── SessionCard.tsx  # Session display card
│   ├── RollNumberSelector.tsx  # Roll number input component
│   ├── Alert.tsx        # Alert notifications
│   ├── LoadingSpinner.tsx  # Loading indicator
│   └── index.ts         # Component exports
├── pages/               # Page components
│   ├── LoginPage.tsx    # Authentication
│   ├── TeacherDashboard.tsx  # Teacher main view
│   ├── StudentDashboard.tsx  # Student main view
│   ├── CreateSessionPage.tsx  # Session creation/editing
│   ├── SettingsPage.tsx # User settings
│   ├── NotFoundPage.tsx # 404 error
│   └── index.ts         # Page exports
├── types/               # TypeScript type definitions
├── styles/              # Global CSS and Tailwind setup
├── hooks/               # Custom React hooks (future)
├── App.tsx             # Main routing component
└── main.tsx            # Entry point
```

## Key Features

### 1. Roll Number Selection Component

Located: `src/components/RollNumberSelector.tsx`

Features:

- Select by range (e.g., 1-12)
- Select by custom list (1, 3, 5, 8)
- Mix both approaches
- Real-time preview of selected students

### 2. Authentication

- Demo credentials provided in LoginPage
- Session-based (sessionStorage)
- Role-based access control

### 3. Responsive Design

- Tailwind CSS for styling
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)

## Development Guidelines

### Code Style

- Use TypeScript with strict mode
- Follow React functional component patterns
- Use custom hooks for logic reuse
- Consistent naming: PascalCase for components, camelCase for variables

### Component Structure

```typescript
interface ComponentProps {
  // Define props interface
}

export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### Types

All shared types are in `src/types/index.ts`. Add new types there.

### Styling

- Use Tailwind CSS classes
- Custom components defined in `src/styles/index.css`
- Available custom classes: `.btn`, `.card`, `.input-field`, `.label`, `.badge`

## Routing

Routes are defined in `src/App.tsx`:

```
/                          → Redirect to /login
/login                     → LoginPage
/teacher/dashboard         → TeacherDashboard
/teacher/create-session    → CreateSessionPage (create mode)
/teacher/edit-session/:id  → CreateSessionPage (edit mode)
/student/dashboard         → StudentDashboard
/settings                  → SettingsPage
/* (any other path)        → NotFoundPage
```

## Important Notes for Future Development

### Backend Integration

1. Replace mock data in pages with API calls
2. Create service/API layer in `src/api/` or `src/services/`
3. Use environment variables for API URLs
4. Implement proper error handling

### Sample API Hook Pattern

```typescript
// Example: custom hook for fetching sessions
export const useSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API call here
  }, []);

  return { sessions, loading };
};
```

### Video Meeting Integration

- Current: Mock meeting join
- TODO: Integrate Jitsi, Zoom, or WebRTC
- Meeting link should open when joining a session

## Demo Credentials

Teachers:

- Email: `teacher1@college.edu` | Password: `teacher123`
- Email: `teacher2@college.edu` | Password: `teacher123`

Students:

- Email: `student1@college.edu` | Password: `student123`
- Email: `student2@college.edu` | Password: `student123`
- Email: `student3@college.edu` | Password: `student123`

## Customization Points

### Add New Student

Edit `SAMPLE_STUDENTS` in `src/pages/CreateSessionPage.tsx`

### Change Color Scheme

Edit `tailwind.config.ts` - primary, success, warning, danger colors

### Modify Session Statuses

Edit `Session` type in `src/types/index.ts`

### Add New Pages

1. Create page component in `src/pages/`
2. Add export in `src/pages/index.ts`
3. Add route in `src/App.tsx`

## Troubleshooting

### Port 5173 already in use

```bash
npm run dev -- --port 3000  # Use different port
```

### Dependencies issues

```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind CSS not working

- Ensure `src/styles/index.css` is imported in `main.tsx`
- Check that `tailwind.config.ts` has correct content paths

## Next Steps

1. **Database Integration**: Connect to SQL backend (MySQL/PostgreSQL)
2. **Authentication**: Implement backend authentication
3. **Video Meetings**: Integrate video conferencing API
4. **Notifications**: Add email and in-app notifications
5. **Admin Panel**: Create admin dashboard for system management

## Contact & Support

For questions about the implementation, refer to comments in the code or check the main README.md file.

---

**Last Updated**: March 30, 2026
**Version**: 1.0.0 (MVP)
