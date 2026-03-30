import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, UserCheck, LogIn } from "lucide-react";
import Alert from "../components/Alert";

export default function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<
    "teacher" | "student" | null
  >(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sample credentials for demo
  const DemoAccount = {
    teachers: [
      {
        email: "teacher1@college.edu",
        password: "teacher123",
        name: "Dr. Rajesh Kumar",
      },
      {
        email: "teacher2@college.edu",
        password: "teacher123",
        name: "Dr. Priya Singh",
      },
    ],
    students: [
      {
        email: "student1@college.edu",
        password: "student123",
        name: "Amit Patel",
        roll: 1,
      },
      {
        email: "student2@college.edu",
        password: "student123",
        name: "Bhavna Sharma",
        roll: 2,
      },
      {
        email: "student3@college.edu",
        password: "student123",
        name: "Chetan Rao",
        roll: 3,
      },
    ],
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !selectedRole) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const accounts =
        selectedRole === "teacher"
          ? DemoAccount.teachers
          : DemoAccount.students;
      const user = accounts.find(
        (acc) => acc.email === email && acc.password === password,
      );

      if (user) {
        // Store user session
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            id: email,
            name: user.name,
            email: user.email,
            role: selectedRole,
            rollNumber: "roll" in user ? user.roll : undefined,
          }),
        );

        navigate(
          selectedRole === "teacher"
            ? "/teacher/dashboard"
            : "/student/dashboard",
        );
      } else {
        setError(
          "Invalid email or password. Try teacher1@college.edu / teacher123 or student1@college.edu / student123",
        );
      }

      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-blue-600 font-bold text-2xl">M</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">MentorVerse</h1>
          <p className="text-primary-100 text-white">
            Mentor-Mentee Online Meeting Platform
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          {error && <Alert type="error" title="Login Failed" message={error} />}

          {/* Role Selection */}
          {!selectedRole ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Select Your Role
              </h2>

              <button
                onClick={() => setSelectedRole("teacher")}
                className="w-full p-6 border-2 border-gray-300 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                    <UserCheck className="text-blue-600" size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Teacher</p>
                    <p className="text-sm text-gray-600">Mentor/Faculty</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole("student")}
                className="w-full p-6 border-2 border-gray-300 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                    <User className="text-blue-600" size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Student</p>
                    <p className="text-sm text-gray-600">Mentee/Learner</p>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedRole === "teacher" ? "Teacher" : "Student"} Login
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    selectedRole === "teacher"
                      ? "teacher@college.edu"
                      : "student@college.edu"
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 w-full flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </button>

              {/* Demo Credentials */}
              <div className="bg-gray-50 rounded-lg p-4 mt-6">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  📝 Demo Credentials:
                </p>
                {selectedRole === "teacher" ? (
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Email: teacher1@college.edu</p>
                    <p>Password: teacher123</p>
                  </div>
                ) : (
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Email: student1@college.edu</p>
                    <p>Password: student123</p>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-6">
          © 2026 MentorVerse. All rights reserved.
        </p>
      </div>
    </div>
  );
}
