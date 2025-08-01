import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormField, AlertMessage, ActionButton } from "../shared";

function SubscriptionForm({ onSubscriptionCreated }) {
  const [formData, setFormData] = useState({
    student_id: "",
    package_name: "",
    start_date: "",
    end_date: "",
    total_sessions: "",
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/subscriptions", {
        ...formData,
        student_id: parseInt(formData.student_id),
        total_sessions: parseInt(formData.total_sessions),
      });
      setFormData({
        student_id: "",
        package_name: "",
        start_date: "",
        end_date: "",
        total_sessions: "",
      });
      setMessage("Tạo gói học thành công!");
      if (onSubscriptionCreated) onSubscriptionCreated();
    } catch (error) {
      console.error("Error creating subscription:", error);
      setMessage("Lỗi khi tạo gói học");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const studentOptions = students.map((student) => ({
    value: student.id,
    label: `${student.name} - ${student.current_grade}`,
  }));

  return (
    <div className="card">
      <h2>Tạo gói học mới</h2>

      <AlertMessage message={message} onClose={() => setMessage("")} />

      <form onSubmit={handleSubmit}>
        <FormField
          type="select"
          label="Học sinh"
          name="student_id"
          value={formData.student_id}
          onChange={handleChange}
          options={studentOptions}
          required
        />

        <FormField
          label="Tên gói"
          name="package_name"
          value={formData.package_name}
          onChange={handleChange}
          placeholder="Ví dụ: Gói Toán 3 tháng"
          required
        />

        <FormField
          type="date"
          label="Ngày bắt đầu"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          required
        />

        <FormField
          type="date"
          label="Ngày kết thúc"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          required
        />

        <FormField
          type="number"
          label="Tổng số buổi"
          name="total_sessions"
          value={formData.total_sessions}
          onChange={handleChange}
          min="1"
          required
        />

        <ActionButton type="submit" loading={loading} loadingText="Đang tạo...">
          Tạo gói học
        </ActionButton>
      </form>
    </div>
  );
}

export default SubscriptionForm;
