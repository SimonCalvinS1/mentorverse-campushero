import { useNavigate } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";

interface HeaderProps {
  userName: string;
  role: "teacher" | "student";
  onLogout: () => void;
}

export default function Header({ userName, role, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MentorVerse</h1>
              <p className="text-xs text-gray-500">Mentor-Mentee Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/settings")}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>

            <button
              onClick={onLogout}
              className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
