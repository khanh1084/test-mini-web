import React, { useState, useEffect } from "react";
import axios from "axios";

function ClassSchedule() {
  const [classes, setClasses] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayNames = {
    Monday: "Thứ 2",
    Tuesday: "Thứ 3",
    Wednesday: "Thứ 4",
    Thursday: "Thứ 5",
    Friday: "Thứ 6",
    Saturday: "Thứ 7",
    Sunday: "Chủ nhật",
  };

  useEffect(() => {
    fetchClasses();
  }, [selectedDay]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const url = selectedDay
        ? `/api/classes?day=${selectedDay}`
        : "/api/classes";
      const response = await axios.get(url);
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setMessage("Lỗi khi tải danh sách lớp học");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Lịch học</h2>

        <div className="form-group">
          <label htmlFor="day">Lọc theo ngày:</label>
          <select
            id="day"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">Tất cả các ngày</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {dayNames[day]}
              </option>
            ))}
          </select>
        </div>

        {message && <div className="alert alert-error">{message}</div>}

        {loading ? (
          <div className="loading">Đang tải...</div>
        ) : (
          <div className="grid">
            {classes.map((classItem) => (
              <div key={classItem.id} className="card">
                <h3>{classItem.name}</h3>
                <p>
                  <strong>Môn học:</strong> {classItem.subject}
                </p>
                <p>
                  <strong>Ngày:</strong> {dayNames[classItem.day_of_week]}
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
        )}

        {!loading && classes.length === 0 && (
          <div className="alert alert-info">
            Không có lớp học nào cho ngày đã chọn.
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassSchedule;
