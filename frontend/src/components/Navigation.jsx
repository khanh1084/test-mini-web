import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: "🏠" },
    { path: "/parents", label: "Quản lý Phụ huynh", icon: "👨‍👩‍👧‍👦" },
    { path: "/students", label: "Quản lý Học sinh", icon: "👨‍🎓" },
    { path: "/classes", label: "Lớp học", icon: "📚" },
    { path: "/registration", label: "Đăng ký lớp", icon: "📝" },
    { path: "/subscriptions", label: "Gói đăng ký", icon: "💳" },
  ];

  return (
    <nav className="nav">
      <ul>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
