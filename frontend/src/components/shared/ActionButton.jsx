import React from "react";

function ActionButton({
  children,
  loading = false,
  loadingText = "Đang xử lý...",
  variant = "primary", // "primary", "secondary", "danger"
  type = "button",
  onClick,
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn ${variant !== "primary" ? `btn-${variant}` : "btn"}`}
      onClick={onClick}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? loadingText : children}
    </button>
  );
}

export default ActionButton;
