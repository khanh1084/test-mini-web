import React, { useState, useEffect } from "react";
import axios from "axios";

function ParentForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/parents");
      setParents(response.data);
    } catch (error) {
      console.error("Error fetching parents:", error);
      setMessage("Lỗi khi tải danh sách phụ huynh");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/parents", formData);
      setFormData({ name: "", phone: "", email: "" });
      setMessage("Thêm phụ huynh thành công!");
      fetchParents();
    } catch (error) {
      console.error("Error creating parent:", error);
      setMessage("Lỗi khi thêm phụ huynh");
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
        <h2>Thêm Phụ huynh mới</h2>
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
            <label htmlFor="phone">Số điện thoại:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Đang thêm..." : "Thêm Phụ huynh"}
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Danh sách Phụ huynh</h2>
        {loading ? (
          <div className="loading">Đang tải...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ và tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((parent) => (
                <tr key={parent.id}>
                  <td>{parent.id}</td>
                  <td>{parent.name}</td>
                  <td>{parent.phone}</td>
                  <td>{parent.email}</td>
                  <td>
                    {new Date(parent.created_at).toLocaleDateString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ParentForm;
