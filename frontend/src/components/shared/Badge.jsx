import React from "react";

function Badge({
  children,
  variant = "primary", // "primary", "success", "danger", "secondary"
  className = "",
}) {
  return (
    <span className={`badge badge-${variant} ${className}`}>{children}</span>
  );
}

export default Badge;
