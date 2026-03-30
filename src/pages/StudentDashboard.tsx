import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Video } from "lucide-react";
import Header from "../components/Header";
import SessionCard from "../components/SessionCard";
import type { Session, User } from "../types";

// Sample sessions for students
const SAMPLE_SESSIONS: Session[] = [
  {
    id: "1",
    teacherId: "teacher1@college.edu",
    teacherName: "Dr. Rajesh Kumar",
    studentIds: [1, 2, 3],
    studentNames: ["Amit Patel", "Bhavna Sharma", "Chetan Rao"],
    title: "Advanced Database Systems",
    description: "Discussion on query optimization and indexing strategies",
    scheduledTime: new Date(Date.now() + 86400000),
    duration: 45,
    status: "scheduled",
    createdAt: new Date(),
  },
  {
    id: "3",
    teacherId: "teacher2@college.edu",
    teacherName: "Dr. Priya Singh",
    studentIds: [1, 4, 5],
    studentNames: ["Amit Patel", "Deepak Verma", "Esha Patel"],
    title: "Web Development Bootcamp",
    description: "Modern web development with React and Node.js",
    scheduledTime: new Date(Date.now() + 172800000),
    duration: 60,
    status: "scheduled",
    createdAt: new Date(),
  },
];

export default function StudentDashboard() {
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
    const parsedUser = JSON.parse(userStr);
    setUser(parsedUser);

    // Filter sessions for this student
    const studentSessions = SAMPLE_SESSIONS.filter((s) =>
      s.studentIds.includes(parsedUser.rollNumber),
    );
    setSessions(studentSessions);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const handleJoin = (sessionId: string) => {
    console.log("Joining session:", sessionId);
    alert("Meeting link would be opened here");
  };

  const filteredSessions =
    filterStatus === "all"
      ? sessions
      : sessions.filter((s) => s.status === filterStatus);

  if (!user) return null;

  const upcomingSessions = sessions.filter((s) => s.status === "scheduled");
  const mentors = [...new Set(sessions.map((s) => s.teacherName))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={user.name} role="student" onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white mb-8 shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
          <p className="text-primary-100">
            {upcomingSessions.length === 0
              ? "Check back soon for upcoming mentor sessions"
              : `You have ${upcomingSessions.length} upcoming mentor session${upcomingSessions.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Scheduled Sessions
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-1">
                  {upcomingSessions.length}
                </p>
              </div>
              <Calendar size={32} className="text-primary-600 opacity-20" />
            </div>
            <p className="text-xs text-gray-600 mt-4">Waiting to be joined</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Active Mentors
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-1">
                  {mentors.length}
                </p>
              </div>
              <Users size={32} className="text-success-600 opacity-20" />
            </div>
            <p className="text-xs text-gray-600 mt-4">
              {mentors.join(", ") || "No mentors assigned"}
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Completed Sessions
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-1">
                  {sessions.filter((s) => s.status === "completed").length}
                </p>
              </div>
              <Video size={32} className="text-primary-600 opacity-20" />
            </div>
            <p className="text-xs text-gray-600 mt-4">Sessions completed</p>
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
                userRole="student"
              />
            ))
          ) : (
            <div className="card text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No {filterStatus === "all" ? "" : filterStatus} sessions
              </h3>
              <p className="text-gray-600">
                {filterStatus === "all"
                  ? "No mentor sessions assigned yet. Check back later!"
                  : `No ${filterStatus} sessions at the moment`}
              </p>
            </div>
          )}
        </div>

        {/* Upcoming Priority Session */}
        {upcomingSessions.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Next Session
            </h2>
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8 border-2 border-primary-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-600 font-semibold mb-2">
                    Your next meeting
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {upcomingSessions[0].title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {upcomingSessions[0].description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary-600" />
                      {new Date(
                        upcomingSessions[0].scheduledTime,
                      ).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-primary-600">•</span>
                      Mentor: {upcomingSessions[0].teacherName}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleJoin(upcomingSessions[0].id)}
                  className="btn-primary px-8 py-3 flex items-center gap-2 h-fit"
                >
                  <Video size={20} />
                  Join Now
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
