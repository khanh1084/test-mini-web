import React from "react";
import { DataTable } from "../shared";

function ParentList({ parents, loading }) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Họ và tên" },
    { key: "phone", label: "Số điện thoại" },
    { key: "email", label: "Email" },
    {
      key: "created_at",
      label: "Ngày tạo",
      render: (value) => new Date(value).toLocaleDateString("vi-VN"),
    },
  ];

  return (
    <div className="card">
      <h2>Danh sách Phụ huynh</h2>
      <DataTable
        columns={columns}
        data={parents}
        loading={loading}
        emptyMessage="Chưa có phụ huynh nào"
      />
    </div>
  );
}

export default ParentList;
