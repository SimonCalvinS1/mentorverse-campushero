import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Calendar, Users } from "lucide-react";
import Header from "../components/Header";
import SessionCard from "../components/SessionCard";
import type { Session, User } from "../types";

// Sample data
const SAMPLE_SESSIONS: Session[] = [
  {
    id: "1",
    teacherId: "teacher1@college.edu",
    teacherName: "Dr. Rajesh Kumar",
    studentIds: [1, 2, 3],
    studentNames: ["Amit Patel", "Bhavna Sharma", "Chetan Rao"],
    title: "Advanced Database Systems",
    description: "Discussion on query optimization and indexing strategies",
    scheduledTime: new Date(Date.now() + 86400000), // Tomorrow
    duration: 45,
    status: "scheduled",
    createdAt: new Date(),
  },
  {
    id: "2",
    teacherId: "teacher1@college.edu",
    teacherName: "Dr. Rajesh Kumar",
    studentIds: [4, 5, 6, 7],
    studentNames: [
      "Deepak Verma",
      "Esha Patel",
      "Farhan Khan",
      "Giselle Desai",
    ],
    title: "Web Development Technologies",
    description: "Latest frameworks and best practices in web development",
    scheduledTime: new Date(Date.now() + 172800000), // Day after tomorrow
    duration: 60,
    status: "scheduled",
    createdAt: new Date(),
  },
];

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<Session[]>(SAMPLE_SESSIONS);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "scheduled" | "ongoing" | "completed"
  >("all");

  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userStr));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const handleCreateSession = () => {
    navigate("/teacher/create-session");
  };

  const handleJoin = (sessionId: string) => {
    console.log("Joining session:", sessionId);
    // TODO: Implement video meeting join
    alert("Meeting link would be opened here");
  };

  const handleEdit = (sessionId: string) => {
    navigate(`/teacher/edit-session/${sessionId}`);
  };

  const handleCancel = (sessionId: string) => {
    setSessions(
      sessions.map((s) =>
        s.id === sessionId ? { ...s, status: "cancelled" as const } : s,
      ),
    );
  };

  const filteredSessions =
    filterStatus === "all"
      ? sessions
      : sessions.filter((s) => s.status === filterStatus);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={user.name} role="teacher" onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white mb-8 shadow-lg">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-primary-100 mb-6">
            Manage your mentor sessions and connect with your students
          </p>

          <button
            onClick={handleCreateSession}
            className="inline-flex items-center gap-2 bg-black text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
          >
            <Plus size={20} />
            Create New Session
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Sessions
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-1">
                  {sessions.length}
                </p>
              </div>
              <Calendar size={32} className="text-blue-600 opacity-20" />
            </div>
            <p className="text-xs text-gray-600 mt-4">
              {sessions.filter((s) => s.status === "scheduled").length}{" "}
              scheduled
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Upcoming Sessions
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-1">
                  {sessions.filter((s) => s.status === "scheduled").length}
                </p>
              </div>
              <Calendar size={32} className="text-success-600 opacity-20" />
            </div>
            <p className="text-xs text-gray-600 mt-4">In the next 30 days</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Students Met
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-1">
                  {new Set(sessions.flatMap((s) => s.studentIds)).size}
                </p>
              </div>
              <Users size={32} className="text-blue-600 opacity-20" />
            </div>
            <p className="text-xs text-gray-600 mt-4">Across all sessions</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 border-b border-gray-200">
          {(["all", "scheduled", "ongoing", "completed"] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`pb-3 px-4 font-medium transition-colors capitalize ${
                  filterStatus === status
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {status}
              </button>
            ),
          )}
        </div>

        {/* Sessions List */}
        <div className="space-y-6">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onJoin={() => handleJoin(session.id)}
                onEdit={() => handleEdit(session.id)}
                onCancel={() => handleCancel(session.id)}
                userRole="teacher"
              />
            ))
          ) : (
            <div className="card text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No {filterStatus === "all" ? "" : filterStatus} sessions
              </h3>
              <p className="text-gray-600 mb-6">
                {filterStatus === "all"
                  ? "Create your first session to get started"
                  : `No ${filterStatus} sessions at the moment`}
              </p>
              {filterStatus === "all" && (
                <button
                  onClick={handleCreateSession}
                  className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 inline-flex items-center gap-2"
                >
                  <Plus size={18} />
                  Create Session
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
