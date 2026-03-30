import { AlertCircle, CheckCircle, Info, XCircle, X } from "lucide-react";
import { useState } from "react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  onClose?: () => void;
  dismissible?: boolean;
}

export default function Alert({
  type,
  title,
  message,
  onClose,
  dismissible = true,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const styles = {
    success: {
      bg: "bg-success-50",
      border: "border-success-200",
      icon: CheckCircle,
      iconColor: "text-success-600",
      titleColor: "text-success-900",
      textColor: "text-success-700",
    },
    error: {
      bg: "bg-danger-50",
      border: "border-danger-200",
      icon: XCircle,
      iconColor: "text-danger-600",
      titleColor: "text-danger-900",
      textColor: "text-danger-700",
    },
    warning: {
      bg: "bg-warning-50",
      border: "border-warning-200",
      icon: AlertCircle,
      iconColor: "text-warning-600",
      titleColor: "text-warning-900",
      textColor: "text-warning-700",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: Info,
      iconColor: "text-blue-600",
      titleColor: "text-blue-900",
      textColor: "text-blue-700",
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div
      className={`${style.bg} ${style.border} border rounded-lg p-4 flex gap-3`}
    >
      <Icon className={`${style.iconColor} flex-shrink-0 mt-0.5`} size={20} />
      <div className="flex-1">
        <p className={`${style.titleColor} font-semibold`}>{title}</p>
        {message && (
          <p className={`${style.textColor} text-sm mt-1`}>{message}</p>
        )}
      </div>
      {dismissible && (
        <button
          onClick={handleClose}
          className={`${style.textColor} hover:opacity-75 transition flex-shrink-0`}
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
