import React from "react";

function AlertMessage({
  message,
  type = "info", // "success", "error", "info"
  onClose,
}) {
  if (!message) return null;

  const getAlertClass = () => {
    if (message.includes("thành công") || message.includes("Đã sử dụng")) {
      return "alert-success";
    }
    if (type === "error" || message.includes("Lỗi")) {
      return "alert-error";
    }
    return `alert-${type}`;
  };

  return (
    <div className={`alert ${getAlertClass()}`}>
      {message}
      {onClose && (
        <button
          type="button"
          className="alert-close"
          onClick={onClose}
          style={{ float: "right", background: "none", border: "none" }}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default AlertMessage;
