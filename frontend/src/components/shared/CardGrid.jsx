import React from "react";

function CardGrid({
  items, // Array of objects
  renderCard, // Function to render each card content
  loading, // Boolean
  emptyMessage = "Không có dữ liệu", // String
  className = "grid", // Custom grid className
}) {
  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!items || items.length === 0) {
    return <div className="alert alert-info">{emptyMessage}</div>;
  }

  return (
    <div className={className}>
      {items.map((item) => (
        <div key={item.id} className="card">
          {renderCard(item)}
        </div>
      ))}
    </div>
  );
}

export default CardGrid;
