import React, { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [stats, setStats] = useState({
    totalParents: 0,
    totalStudents: 0,
    totalClasses: 0,
    totalRegistrations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch stats from API
      const [parentsRes, studentsRes, classesRes, registrationsRes] =
        await Promise.all([
          axios.get("/api/parents"),
          axios.get("/api/students"),
          axios.get("/api/classes"),
          axios.get("/api/classes/registrations/count"),
        ]);

      setStats({
        totalParents: parentsRes.data.length,
        totalStudents: studentsRes.data.length,
        totalClasses: classesRes.data.length,
        totalRegistrations: registrationsRes.data,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Dashboard - Tổng quan hệ thống</h2>
        <div className="grid">
          <div className="card">
            <h3>👨‍👩‍👧‍👦 Phụ huynh</h3>
            <p className="stats-number">{stats.totalParents}</p>
            <p>Tổng số phụ huynh</p>
          </div>

          <div className="card">
            <h3>👨‍🎓 Học sinh</h3>
            <p className="stats-number">{stats.totalStudents}</p>
            <p>Tổng số học sinh</p>
          </div>

          <div className="card">
            <h3>📚 Lớp học</h3>
            <p className="stats-number">{stats.totalClasses}</p>
            <p>Tổng số lớp học</p>
          </div>

          <div className="card">
            <h3>📝 Đăng ký</h3>
            <p className="stats-number">{stats.totalRegistrations}</p>
            <p>Tổng số đăng ký</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
