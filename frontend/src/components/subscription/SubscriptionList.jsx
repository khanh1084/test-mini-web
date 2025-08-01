import React from "react";
import { CardGrid } from "../shared";
import SubscriptionCard from "./SubscriptionCard";

function SubscriptionList({ subscriptions, loading, onUseSession }) {
  return (
    <div className="card">
      <h2>Danh sách gói học</h2>
      <CardGrid
        items={subscriptions}
        renderCard={(subscription) => (
          <SubscriptionCard
            subscription={subscription}
            onUseSession={onUseSession}
          />
        )}
        loading={loading}
        emptyMessage="Chưa có gói học nào"
      />
    </div>
  );
}

export default SubscriptionList;
