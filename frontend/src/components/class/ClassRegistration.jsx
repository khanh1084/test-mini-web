import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormField, AlertMessage, ActionButton, CardGrid } from "../shared";
import ClassCard from "./ClassCard";

function ClassRegistration() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("/api/classes");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

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
    if (!selectedClass || !selectedStudent) {
      setMessage("Vui lòng chọn lớp và học sinh");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `/api/classes/${selectedClass}/register?student_id=${selectedStudent}`
      );
      setSelectedClass("");
      setSelectedStudent("");
      setMessage("Đăng ký thành công!");
      fetchClasses();
    } catch (error) {
      console.error("Error registering student:", error);
      setMessage(
        "Lỗi khi đăng ký: " +
          (error.response?.data?.detail || "Lỗi không xác định")
      );
    } finally {
      setLoading(false);
    }
  };

  const classOptions = classes.map((classItem) => ({
    value: classItem.id,
    label: `${classItem.name} - ${classItem.subject} - ${classItem.day_of_week} ${classItem.time_slot}`,
  }));

  const studentOptions = students.map((student) => ({
    value: student.id,
    label: `${student.name} - ${student.current_grade} - ${student.parent?.name}`,
  }));

  return (
    <div className="container">
      <div className="card">
        <h2>Đăng ký học sinh vào lớp</h2>

        <AlertMessage message={message} onClose={() => setMessage("")} />

        <form onSubmit={handleSubmit}>
          <FormField
            type="select"
            label="Chọn lớp"
            name="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            options={classOptions}
            required
          />

          <FormField
            type="select"
            label="Chọn học sinh"
            name="student"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            options={studentOptions}
            required
          />

          <ActionButton
            type="submit"
            loading={loading}
            loadingText="Đang đăng ký..."
          >
            Đăng ký
          </ActionButton>
        </form>
      </div>

      <div className="card">
        <h2>Danh sách lớp học</h2>
        <CardGrid
          items={classes}
          renderCard={(classItem) => <ClassCard classItem={classItem} />}
          emptyMessage="Chưa có lớp học nào"
        />
      </div>
    </div>
  );
}

export default ClassRegistration;
