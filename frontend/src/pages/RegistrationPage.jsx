import React from "react";
import { ClassRegistration } from "../components/class";

function RegistrationPage() {
  return (
    <div className="container">
      <div className="card">
        <h2>📝 Đăng ký Lớp học</h2>
        <p>Đăng ký học sinh vào các lớp học phù hợp.</p>
      </div>
      <ClassRegistration />
    </div>
  );
}

export default RegistrationPage;
