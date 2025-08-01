import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormField, AlertMessage, ActionButton } from "../shared";

function StudentForm({ onStudentCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    current_grade: "",
    parent_id: "",
  });
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      const response = await axios.get("/api/parents");
      setParents(response.data);
    } catch (error) {
      console.error("Error fetching parents:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/students", {
        ...formData,
        parent_id: parseInt(formData.parent_id),
      });
      setFormData({
        name: "",
        dob: "",
        gender: "",
        current_grade: "",
        parent_id: "",
      });
      setMessage("Thêm học sinh thành công!");
      if (onStudentCreated) onStudentCreated();
    } catch (error) {
      console.error("Error creating student:", error);
      setMessage("Lỗi khi thêm học sinh");
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

  const genderOptions = [
    { value: "Male", label: "Nam" },
    { value: "Female", label: "Nữ" },
  ];

  const parentOptions = parents.map((parent) => ({
    value: parent.id,
    label: `${parent.name} - ${parent.phone}`,
  }));

  return (
    <div className="card">
      <h2>Thêm Học sinh mới</h2>

      <AlertMessage message={message} onClose={() => setMessage("")} />

      <form onSubmit={handleSubmit}>
        <FormField
          label="Họ và tên"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <FormField
          type="date"
          label="Ngày sinh"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <FormField
          type="select"
          label="Giới tính"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={genderOptions}
          required
        />

        <FormField
          label="Lớp hiện tại"
          name="current_grade"
          value={formData.current_grade}
          onChange={handleChange}
          placeholder="Ví dụ: Grade 5"
          required
        />

        <FormField
          type="select"
          label="Phụ huynh"
          name="parent_id"
          value={formData.parent_id}
          onChange={handleChange}
          options={parentOptions}
          required
        />

        <ActionButton
          type="submit"
          loading={loading}
          loadingText="Đang thêm..."
        >
          Thêm Học sinh
        </ActionButton>
      </form>
    </div>
  );
}

export default StudentForm;
