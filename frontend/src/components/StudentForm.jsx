import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    current_grade: "",
    parent_id: "",
  });
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchParents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setMessage("Lỗi khi tải danh sách học sinh");
    } finally {
      setLoading(false);
    }
  };

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
      fetchStudents();
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

  return (
    <div className="container">
      <div className="card">
        <h2>Thêm Học sinh mới</h2>
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
            <label htmlFor="name">Họ và tên:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Ngày sinh:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Giới tính:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="current_grade">Lớp hiện tại:</label>
            <input
              type="text"
              id="current_grade"
              name="current_grade"
              value={formData.current_grade}
              onChange={handleChange}
              placeholder="Ví dụ: Grade 5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="parent_id">Phụ huynh:</label>
            <select
              id="parent_id"
              name="parent_id"
              value={formData.parent_id}
              onChange={handleChange}
              required
            >
              <option value="">Chọn phụ huynh</option>
              {parents.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name} - {parent.phone}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Đang thêm..." : "Thêm Học sinh"}
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Danh sách Học sinh</h2>
        {loading ? (
          <div className="loading">Đang tải...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Lớp</th>
                <th>Phụ huynh</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{new Date(student.dob).toLocaleDateString("vi-VN")}</td>
                  <td>
                    <span
                      className={`badge ${
                        student.gender === "Male"
                          ? "badge-primary"
                          : "badge-success"
                      }`}
                    >
                      {student.gender === "Male" ? "Nam" : "Nữ"}
                    </span>
                  </td>
                  <td>{student.current_grade}</td>
                  <td>{student.parent?.name || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentForm;
