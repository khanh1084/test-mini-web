import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Navigation from "./components/Navigation";
import AppRoutes from "./routes/AppRoutes";

// Configure axios base URL
axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return (
    <Router>
      <div>
        <header className="header">
          <h1>Hệ thống Quản lý Học sinh</h1>
          <p>Quản lý thông tin học sinh, phụ huynh và lịch học</p>
        </header>

        <Navigation />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
