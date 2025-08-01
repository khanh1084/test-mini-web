import React from "react";
import { DataTable, Badge } from "../shared";

function StudentList({ students, loading }) {
  const columns = [
    { key: "name", label: "Họ và tên" },
    {
      key: "dob",
      label: "Ngày sinh",
      render: (value) => new Date(value).toLocaleDateString("vi-VN"),
    },
    {
      key: "gender",
      label: "Giới tính",
      render: (value) => (
        <Badge variant={value === "Male" ? "primary" : "success"}>
          {value === "Male" ? "Nam" : "Nữ"}
        </Badge>
      ),
    },
    { key: "current_grade", label: "Lớp" },
    {
      key: "parent",
      label: "Phụ huynh",
      render: (value) => value?.name || "N/A",
    },
  ];

  return (
    <div className="card">
      <h2>Danh sách Học sinh</h2>
      <DataTable
        columns={columns}
        data={students}
        loading={loading}
        emptyMessage="Chưa có học sinh nào"
      />
    </div>
  );
}

export default StudentList;
