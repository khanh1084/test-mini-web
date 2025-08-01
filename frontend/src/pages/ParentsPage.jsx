import React from "react";
import ParentForm from "../components/ParentForm";

function ParentsPage() {
  return (
    <div className="container">
      <div className="card">
        <h2>👨‍👩‍👧‍👦 Quản lý Phụ huynh</h2>
        <p>Thêm mới và quản lý thông tin phụ huynh trong hệ thống.</p>
      </div>
      <ParentForm />
    </div>
  );
}

export default ParentsPage;
