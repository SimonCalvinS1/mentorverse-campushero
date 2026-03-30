import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Header from "../components/Header";
import RollNumberSelector from "../components/RollNumberSelector";
import Alert from "../components/Alert";
import type { User, StudentList } from "../types";

// Sample students list
const SAMPLE_STUDENTS: StudentList[] = [
  { rollNumber: 1, name: "Amit Patel", email: "amit@college.edu" },
  { rollNumber: 2, name: "Bhavna Sharma", email: "bhavna@college.edu" },
  { rollNumber: 3, name: "Chetan Rao", email: "chetan@college.edu" },
  { rollNumber: 4, name: "Deepak Verma", email: "deepak@college.edu" },
  { rollNumber: 5, name: "Esha Patel", email: "esha@college.edu" },
  { rollNumber: 6, name: "Farhan Khan", email: "farhan@college.edu" },
  { rollNumber: 7, name: "Giselle Desai", email: "giselle@college.edu" },
  { rollNumber: 8, name: "Harshit Singh", email: "harshit@college.edu" },
];

export default function CreateSessionPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scheduledTime: "",
    scheduledDate: "",
    duration: "45",
  });

  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userStr));

    // TODO: Load session data if editing
    if (sessionId) {
      console.log("Loading session:", sessionId);
    }
  }, [navigate, sessionId]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a session title");
      return;
    }

    if (!formData.scheduledDate || !formData.scheduledTime) {
      alert("Please select date and time");
      return;
    }

    if (selectedStudents.length === 0) {
      alert("Please select at least one student");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccess("Session created successfully!");
      setTimeout(() => {
        navigate("/teacher/dashboard");
      }, 1500);
      setIsLoading(false);
    }, 1000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={user.name} role="teacher" onLogout={handleLogout} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/teacher/dashboard")}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {sessionId ? "Edit Session" : "Create New Session"}
          </h1>
        </div>

        {success && (
          <Alert
            type="success"
            title="Success!"
            message={success}
            dismissible={false}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Details */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Session Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label">Session Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Advanced Database Systems"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what will be covered in this session..."
                    rows={4}
                    className="input-field resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Date</label>
                    <input
                      type="date"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Time</label>
                    <input
                      type="time"
                      name="scheduledTime"
                      value={formData.scheduledTime}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Duration (minutes)</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    className="input-field"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      {sessionId ? "Update Session" : "Create Session"}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Student Selection Sidebar */}
          <div className="lg:col-span-1">
            <RollNumberSelector
              allStudents={SAMPLE_STUDENTS}
              selectedRolls={selectedStudents}
              onSelectionChange={setSelectedStudents}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
