import React from "react";
import { Badge, ActionButton } from "../shared";

function SubscriptionCard({ subscription, onUseSession }) {
  const usedSessions = subscription.used_sessions;
  const totalSessions = subscription.total_sessions;
  const remainingSessions = totalSessions - usedSessions;
  const isExpired = usedSessions >= totalSessions;

  return (
    <>
      <h3>{subscription.package_name}</h3>
      <p>
        <strong>Học sinh:</strong> {subscription.student?.name || "N/A"}
      </p>
      <p>
        <strong>Ngày bắt đầu:</strong>{" "}
        {new Date(subscription.start_date).toLocaleDateString("vi-VN")}
      </p>
      <p>
        <strong>Ngày kết thúc:</strong>{" "}
        {new Date(subscription.end_date).toLocaleDateString("vi-VN")}
      </p>
      <p>
        <strong>Buổi đã dùng:</strong> {usedSessions}/{totalSessions}
      </p>
      <p>
        <strong>Buổi còn lại:</strong> {remainingSessions}
      </p>

      <div style={{ marginTop: "10px" }}>
        <Badge variant={isExpired ? "danger" : "success"}>
          {isExpired ? "Hết buổi" : "Còn buổi"}
        </Badge>
      </div>

      {!isExpired && (
        <ActionButton
          variant="secondary"
          style={{ marginTop: "10px" }}
          onClick={() => onUseSession(subscription.id)}
        >
          Sử dụng 1 buổi
        </ActionButton>
      )}
    </>
  );
}

export default SubscriptionCard;
