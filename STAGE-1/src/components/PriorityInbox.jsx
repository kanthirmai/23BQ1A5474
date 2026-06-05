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

    console.log("Notifications:", data);
    const top10 = data
      .sort((a, b) => calculatePriority(b) - calculatePriority(a))
      .slice(0, 10);

    setNotifications(top10);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Priority Inbox</h1>

      {notifications.map((n) => (
        <div
          key={n.ID}
          style={{
            border: "1px solid gray",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>{n.Message}</h3>
          <p>Type: {n.Type}</p>
          <p>{n.Timestamp}</p>
        </div>
      ))}
    </div>
  );
}
