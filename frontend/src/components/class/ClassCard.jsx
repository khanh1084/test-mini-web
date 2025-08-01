import React from "react";
import { Badge } from "../shared";

function ClassCard({ classItem }) {
  const dayNames = {
    Monday: "Thứ 2",
    Tuesday: "Thứ 3",
    Wednesday: "Thứ 4",
    Thursday: "Thứ 5",
    Friday: "Thứ 6",
    Saturday: "Thứ 7",
    Sunday: "Chủ nhật",
  };

  const currentStudents = classItem.current_students || 0;
  const maxStudents = classItem.max_students;
  const isFull = currentStudents >= maxStudents;

  return (
    <>
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
        <strong>Sĩ số:</strong> {currentStudents}/{maxStudents}
      </p>
      <Badge variant={isFull ? "danger" : "success"}>
        {isFull ? "Đầy lớp" : "Còn chỗ"}
      </Badge>
    </>
  );
}

export default ClassCard;
