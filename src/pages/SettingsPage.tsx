import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, User as UserIcon } from "lucide-react";
import Header from "../components/Header";
import Alert from "../components/Alert";
import type { User } from "../types";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(userStr);
    setUser(parsedUser);
    setFormData({
      name: parsedUser.name,
      email: parsedUser.email,
      department: "BCA",
      phone: "",
    });
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (user) {
        const updatedUser = { ...user, name: formData.name };
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      setSuccessMessage("Settings saved successfully!");
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={user.name} role={user.role} onLogout={handleLogout} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your profile and preferences
          </p>
        </div>

        {successMessage && (
          <Alert
            type="success"
            title="Success!"
            message={successMessage}
            dismissible
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mb-4">
                  <UserIcon size={40} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                <p className="text-sm text-gray-500 mt-2">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Settings Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Profile Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Contact support to change your email
                  </p>
                </div>

                <div>
                  <label className="label">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Account Type:</span>{" "}
                    {user.role === "teacher"
                      ? "Teacher/Mentor"
                      : "Student/Mentee"}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Additional Settings */}
            <div className="card mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Preferences
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Email Notifications
                    </p>
                    <p className="text-sm text-gray-600">
                      Get notified about upcoming sessions
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <hr className="my-4" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Meeting Reminders
                    </p>
                    <p className="text-sm text-gray-600">
                      Receive reminders 15 minutes before sessions
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
