import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormField, AlertMessage, CardGrid } from "../shared";
import ClassCard from "./ClassCard";

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

  const dayOptions = daysOfWeek.map((day) => ({
    value: day,
    label: {
      Monday: "Thứ 2",
      Tuesday: "Thứ 3",
      Wednesday: "Thứ 4",
      Thursday: "Thứ 5",
      Friday: "Thứ 6",
      Saturday: "Thứ 7",
      Sunday: "Chủ nhật",
    }[day],
  }));

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

        <FormField
          type="select"
          label="Lọc theo ngày"
          name="day"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          options={dayOptions}
          placeholder="Tất cả các ngày"
        />

        <AlertMessage message={message} onClose={() => setMessage("")} />

        <CardGrid
          items={classes}
          renderCard={(classItem) => <ClassCard classItem={classItem} />}
          loading={loading}
          emptyMessage="Không có lớp học nào cho ngày đã chọn"
        />
      </div>
    </div>
  );
}

export default ClassSchedule;
