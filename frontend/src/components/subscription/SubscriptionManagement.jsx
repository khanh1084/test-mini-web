import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertMessage } from "../shared";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionList from "./SubscriptionList";

function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSubscriptions();
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

  return (
    <div className="container">
      <SubscriptionForm onSubscriptionCreated={fetchSubscriptions} />

      {message && (
        <AlertMessage message={message} onClose={() => setMessage("")} />
      )}

      <SubscriptionList
        subscriptions={subscriptions}
        loading={loading}
        onUseSession={handleUseSession}
      />
    </div>
  );
}

export default SubscriptionManagement;
