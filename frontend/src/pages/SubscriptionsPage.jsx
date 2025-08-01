import React from "react";
import { SubscriptionManagement } from "../components/subscription";

function SubscriptionsPage() {
  return (
    <div className="container">
      <div className="card">
        <h2>💳 Quản lý Gói đăng ký</h2>
        <p>Quản lý các gói đăng ký và thanh toán của học sinh.</p>
      </div>
      <SubscriptionManagement />
    </div>
  );
}

export default SubscriptionsPage;
