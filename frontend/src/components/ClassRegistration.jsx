import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div className="container">
      <div className="card">
        <h2>Đăng ký học sinh vào lớp</h2>

        {message && (
          <div
            className={`alert ${
              message.includes("thành công") ? "alert-success" : "alert-error"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="class">Chọn lớp:</label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              required
            >
              <option value="">Chọn lớp</option>
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name} - {classItem.subject} -{" "}
                  {classItem.day_of_week} {classItem.time_slot}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="student">Chọn học sinh:</label>
            <select
              id="student"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              required
            >
              <option value="">Chọn học sinh</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} - {student.current_grade} -{" "}
                  {student.parent?.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Danh sách lớp học</h2>
        <div className="grid">
          {classes.map((classItem) => (
            <div key={classItem.id} className="card">
              <h3>{classItem.name}</h3>
              <p>
                <strong>Môn học:</strong> {classItem.subject}
              </p>
              <p>
                <strong>Ngày:</strong> {classItem.day_of_week}
              </p>
              <p>
                <strong>Thời gian:</strong> {classItem.time_slot}
              </p>
              <p>
                <strong>Giáo viên:</strong> {classItem.teacher_name}
              </p>
              <p>
                <strong>Sĩ số:</strong> {classItem.current_students || 0}/
                {classItem.max_students}
              </p>
              <div className="badge badge-primary">
                {classItem.current_students >= classItem.max_students
                  ? "Đầy lớp"
                  : "Còn chỗ"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClassRegistration;
