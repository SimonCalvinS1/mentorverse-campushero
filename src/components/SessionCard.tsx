import { Video, Calendar, Users, Clock } from "lucide-react";
import type { Session } from "../types";

interface SessionCardProps {
  session: Session;
  onJoin?: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
  userRole: "teacher" | "student";
}

export default function SessionCard({
  session,
  onJoin,
  onEdit,
  onCancel,
  userRole,
}: SessionCardProps) {
  const statusColors = {
    scheduled: "bg-amber-100 text-amber-800",
    ongoing: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusLabels = {
    scheduled: "Scheduled",
    ongoing: "Ongoing",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {session.title}
          </h3>
          <p className="text-sm text-gray-600">{session.description}</p>
        </div>
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[session.status]}`}
        >
          {statusLabels[session.status]}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2 text-blue-600" />
          {formatDate(session.scheduledTime)}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Clock size={16} className="mr-2 text-blue-600" />
          {session.duration} minutes
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Users size={16} className="mr-2 text-blue-600" />
          {userRole === "teacher"
            ? `${session.studentIds.length} student${session.studentIds.length !== 1 ? "s" : ""}`
            : `Mentor: ${session.teacherName}`}
        </div>

        {session.meetingLink && (
          <div className="flex items-center text-sm text-blue-600">
            <Video size={16} className="mr-2" />
            <span className="font-medium">Meeting Link Available</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end">
        {session.status === "scheduled" && userRole === "teacher" && (
          <>
            <button
              onClick={onEdit}
              className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 text-sm"
            >
              Edit
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 text-sm"
            >
              Cancel
            </button>
          </>
        )}

        {(session.status === "scheduled" || session.status === "ongoing") &&
          userRole === "student" && (
            <button
              onClick={onJoin}
              className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 text-sm"
            >
              Join Meeting
            </button>
          )}

        {session.status === "ongoing" && userRole === "teacher" && (
          <button
            onClick={onJoin}
            className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 text-sm"
          >
            Open Meeting
          </button>
        )}
      </div>
    </div>
  );
}
