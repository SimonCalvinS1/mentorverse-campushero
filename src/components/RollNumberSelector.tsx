import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { RollNumberRange, StudentList } from "../types";

interface RollNumberSelectorProps {
  allStudents: StudentList[];
  onSelectionChange: (selectedRolls: number[]) => void;
  selectedRolls?: number[];
}

export default function RollNumberSelector({
  allStudents,
  onSelectionChange,
  selectedRolls = [],
}: RollNumberSelectorProps) {
  const [ranges, setRanges] = useState<RollNumberRange[]>([]);
  const [startRoll, setStartRoll] = useState<string>("");
  const [endRoll, setEndRoll] = useState<string>("");
  const [customRolls, setCustomRolls] = useState<string>("");
  const [previewMode, setPreviewMode] = useState<"ranges" | "custom">("ranges");

  const updateSelectedRolls = (
    newRanges: RollNumberRange[],
    customList: string,
  ) => {
    const selected = new Set<number>();

    // Add from ranges
    newRanges.forEach((range) => {
      for (let i = range.start; i <= range.end; i++) {
        selected.add(i);
      }
    });

    // Add custom rolls
    if (customList.trim()) {
      const customNumbers = customList
        .split(",")
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n));
      customNumbers.forEach((n) => selected.add(n));
    }

    onSelectionChange(Array.from(selected).sort((a, b) => a - b));
  };

  const addRange = () => {
    if (!startRoll || !endRoll) {
      alert("Please enter both start and end roll numbers");
      return;
    }

    const start = parseInt(startRoll);
    const end = parseInt(endRoll);

    if (start > end) {
      alert("Start roll number must be less than or equal to end roll number");
      return;
    }

    if (start < 1 || end > 100) {
      alert("Roll numbers must be between 1 and 100");
      return;
    }

    const newRange = { start, end };
    const newRanges = [...ranges, newRange];
    setRanges(newRanges);
    setStartRoll("");
    setEndRoll("");

    updateSelectedRolls(newRanges, customRolls);
  };

  const removeRange = (index: number) => {
    const newRanges = ranges.filter((_, i) => i !== index);
    setRanges(newRanges);
    updateSelectedRolls(newRanges, customRolls);
  };

  const handleCustomRollsChange = (value: string) => {
    setCustomRolls(value);
    updateSelectedRolls(ranges, value);
  };

  const selectedStudents = selectedRolls
    .map((roll) => allStudents.find((s) => s.rollNumber === roll))
    .filter(Boolean) as StudentList[];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Select Students
      </h3>

      <div className="space-y-6">
        {/* Tab-like selection between ranges and custom */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setPreviewMode("ranges")}
            className={`pb-3 px-2 font-medium transition-colors ${
              previewMode === "ranges"
                ? "text-primary-600 border-b-2 border-primary-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            By Range
          </button>
          <button
            onClick={() => setPreviewMode("custom")}
            className={`pb-3 px-2 font-medium transition-colors ${
              previewMode === "custom"
                ? "text-primary-600 border-b-2 border-primary-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Custom Selection
          </button>
        </div>

        {previewMode === "ranges" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Roll Number
                </label>
                <input
                  type="number"
                  value={startRoll}
                  onChange={(e) => setStartRoll(e.target.value)}
                  placeholder="e.g., 1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Roll Number
                </label>
                <input
                  type="number"
                  value={endRoll}
                  onChange={(e) => setEndRoll(e.target.value)}
                  placeholder="e.g., 12"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  min="1"
                />
              </div>
            </div>

            <button
              onClick={addRange}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add Range
            </button>

            {ranges.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Added Ranges:</h4>
                <div className="space-y-2">
                  {ranges.map((range, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
                    >
                      <span className="font-medium text-gray-900">
                        Roll {range.start} - {range.end}
                      </span>
                      <button
                        onClick={() => removeRange(index)}
                        className="text-danger-600 hover:bg-danger-50 p-2 rounded transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {previewMode === "custom" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Roll Numbers (comma-separated)
            </label>
            <textarea
              value={customRolls}
              onChange={(e) => handleCustomRollsChange(e.target.value)}
              placeholder="e.g., 1, 3, 5, 8, 12"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-2">
              Enter roll numbers separated by commas
            </p>
          </div>
        )}

        {/* Student Preview */}
        {selectedRolls.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">
              Selected Students ({selectedRolls.length})
            </h4>
            <div className="max-h-48 overflow-y-auto">
              <div className="grid grid-cols-1 gap-2">
                {selectedStudents.map((student) => (
                  <div
                    key={student.rollNumber}
                    className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {student.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Roll: {student.rollNumber}
                      </p>
                    </div>
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                      {student.email}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedRolls.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-600">No students selected yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
