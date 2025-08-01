import React from "react";
import { ClassSchedule } from "../components/class";

function ClassesPage() {
  return (
    <div className="container">
      <div className="card">
        <h2>📚 Quản lý Lớp học</h2>
        <p>Xem và quản lý lịch học, thông tin các lớp học trong hệ thống.</p>
      </div>
      <ClassSchedule />
    </div>
  );
}

export default ClassesPage;
