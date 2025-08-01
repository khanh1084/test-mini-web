import React from "react";
import StudentForm from "../components/StudentForm";

function StudentsPage() {
  return (
    <div className="container">
      <div className="card">
        <h2>👨‍🎓 Quản lý Học sinh</h2>
        <p>Thêm mới và quản lý thông tin học sinh, liên kết với phụ huynh.</p>
      </div>
      <StudentForm />
    </div>
  );
}

export default StudentsPage;
