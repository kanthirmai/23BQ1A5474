import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/notificationService";
import { calculatePriority } from "../utils/priority";

export default function PriorityInbox() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data = await fetchNotifications();

    const top10 = data
      .sort((a, b) => calculatePriority(b) - calculatePriority(a))
      .slice(0, 10);

    setNotifications(top10);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Priority Inbox
      </h1>

      {notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        notifications.map((n, index) => (
          <div
            key={n.ID}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3>
              {index + 1}. {n.Message}
            </h3>

            <p>
              <strong>Type:</strong> {n.Type}
            </p>

            <p>
              <strong>Timestamp:</strong> {n.Timestamp}
            </p>

            <p>
              <strong>Priority Score:</strong> {calculatePriority(n).toFixed(2)}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
