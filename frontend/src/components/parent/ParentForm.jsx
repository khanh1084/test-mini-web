import React, { useState } from "react";
import axios from "axios";
import { FormField, AlertMessage, ActionButton } from "../shared";

function ParentForm({ onParentCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/parents", formData);
      setFormData({ name: "", phone: "", email: "" });
      setMessage("Thêm phụ huynh thành công!");
      if (onParentCreated) onParentCreated();
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
    <div className="card">
      <h2>Thêm Phụ huynh mới</h2>

      <AlertMessage message={message} onClose={() => setMessage("")} />

      <form onSubmit={handleSubmit}>
        <FormField
          label="Họ và tên"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <FormField
          type="tel"
          label="Số điện thoại"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <FormField
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <ActionButton
          type="submit"
          loading={loading}
          loadingText="Đang thêm..."
        >
          Thêm Phụ huynh
        </ActionButton>
      </form>
    </div>
  );
}

export default ParentForm;
