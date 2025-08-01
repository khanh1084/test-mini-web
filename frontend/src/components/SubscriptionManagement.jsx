import React, { useState, useEffect } from "react";
import axios from "axios";

function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    student_id: "",
    package_name: "",
    start_date: "",
    end_date: "",
    total_sessions: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSubscriptions();
    fetchStudents();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/subscriptions");
      setSubscriptions(response.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      setMessage("Lỗi khi tải danh sách gói học");
    } finally {
      setLoading(false);
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
      fetchSubscriptions();
    } catch (error) {
      console.error("Error creating subscription:", error);
      setMessage("Lỗi khi tạo gói học");
    } finally {
      setLoading(false);
    }
  };

  const handleUseSession = async (subscriptionId) => {
    try {
      await axios.patch(`/api/subscriptions/${subscriptionId}/use`);
      setMessage("Đã sử dụng 1 buổi học!");
      fetchSubscriptions();
    } catch (error) {
      console.error("Error using session:", error);
      setMessage(
        "Lỗi khi sử dụng buổi học: " +
          (error.response?.data?.detail || "Lỗi không xác định")
      );
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
        <h2>Tạo gói học mới</h2>

        {message && (
          <div
            className={`alert ${
              message.includes("thành công") || message.includes("Đã sử dụng")
                ? "alert-success"
                : "alert-error"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="student_id">Học sinh:</label>
            <select
              id="student_id"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              required
            >
              <option value="">Chọn học sinh</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} - {student.current_grade}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="package_name">Tên gói:</label>
            <input
              type="text"
              id="package_name"
              name="package_name"
              value={formData.package_name}
              onChange={handleChange}
              placeholder="Ví dụ: Gói Toán 3 tháng"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="start_date">Ngày bắt đầu:</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="end_date">Ngày kết thúc:</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="total_sessions">Tổng số buổi:</label>
            <input
              type="number"
              id="total_sessions"
              name="total_sessions"
              value={formData.total_sessions}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Đang tạo..." : "Tạo gói học"}
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Danh sách gói học</h2>
        {loading ? (
          <div className="loading">Đang tải...</div>
        ) : (
          <div className="grid">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="card">
                <h3>{subscription.package_name}</h3>
                <p>
                  <strong>Học sinh:</strong>{" "}
                  {subscription.student?.name || "N/A"}
                </p>
                <p>
                  <strong>Ngày bắt đầu:</strong>{" "}
                  {new Date(subscription.start_date).toLocaleDateString(
                    "vi-VN"
                  )}
                </p>
                <p>
                  <strong>Ngày kết thúc:</strong>{" "}
                  {new Date(subscription.end_date).toLocaleDateString("vi-VN")}
                </p>
                <p>
                  <strong>Buổi đã dùng:</strong> {subscription.used_sessions}/
                  {subscription.total_sessions}
                </p>
                <p>
                  <strong>Buổi còn lại:</strong>{" "}
                  {subscription.total_sessions - subscription.used_sessions}
                </p>

                <div style={{ marginTop: "10px" }}>
                  <span
                    className={`badge ${
                      subscription.used_sessions >= subscription.total_sessions
                        ? "badge-danger"
                        : "badge-success"
                    }`}
                  >
                    {subscription.used_sessions >= subscription.total_sessions
                      ? "Hết buổi"
                      : "Còn buổi"}
                  </span>
                </div>

                {subscription.used_sessions < subscription.total_sessions && (
                  <button
                    className="btn btn-secondary"
                    style={{ marginTop: "10px" }}
                    onClick={() => handleUseSession(subscription.id)}
                  >
                    Sử dụng 1 buổi
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && subscriptions.length === 0 && (
          <div className="alert alert-info">Chưa có gói học nào.</div>
        )}
      </div>
    </div>
  );
}

export default SubscriptionManagement;
