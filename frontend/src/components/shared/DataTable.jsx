import React from "react";

function DataTable({
  columns, // [{ key: 'name', label: 'Họ và tên', render: (value, item) => value }]
  data, // Array of objects
  loading, // Boolean
  emptyMessage = "Không có dữ liệu", // String
}) {
  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="alert alert-info">{emptyMessage}</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col) => (
              <td key={col.key}>
                {col.render ? col.render(item[col.key], item) : item[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
