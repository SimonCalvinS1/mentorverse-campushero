import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./styles/index.css";
import {
  LoginPage,
  TeacherDashboard,
  StudentDashboard,
  CreateSessionPage,
  SettingsPage,
  NotFoundPage,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/create-session" element={<CreateSessionPage />} />
        <Route
          path="/teacher/edit-session/:sessionId"
          element={<CreateSessionPage />}
        />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Common Routes */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
