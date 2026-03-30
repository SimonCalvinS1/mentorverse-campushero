import { useNavigate } from "react-router-dom";
import { Home, ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <p className="text-3xl font-bold text-gray-300 mb-2">
            Page Not Found
          </p>
          <p className="text-gray-400 mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          <Home size={20} />
          Back to Home
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
