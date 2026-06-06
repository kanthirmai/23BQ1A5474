import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/notificationService";
import { calculatePriority } from "../utils/priority";
import "../App.css";

export default function PriorityInbox() {
  const [allNotifications, setAllNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState("Dashboard");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data = await fetchNotifications();

    setAllNotifications(data);

    const top10 = [...data]
      .sort((a, b) => calculatePriority(b) - calculatePriority(a))
      .slice(0, 10);

    setNotifications(top10);
  };

  const displayedNotifications =
    activeView === "PriorityInbox"
      ? notifications
      : activeView === "AllNotifications"
        ? allNotifications
        : activeView === "Placement"
          ? allNotifications.filter((n) => n.Type === "Placement")
          : activeView === "Result"
            ? allNotifications.filter((n) => n.Type === "Result")
            : activeView === "Event"
              ? allNotifications.filter((n) => n.Type === "Event")
              : [];

  const searchedNotifications = displayedNotifications.filter((notification) =>
    notification.Message.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>🎓 CampusHub</h2>

        <ul>
          <li onClick={() => setActiveView("Dashboard")}>📊 Dashboard</li>

          <li onClick={() => setActiveView("AllNotifications")}>
            📨 All Notifications
          </li>

          <li onClick={() => setActiveView("PriorityInbox")}>
            ⭐ Priority Inbox
          </li>

          <li onClick={() => setActiveView("Placement")}>🎯 Placements</li>

          <li onClick={() => setActiveView("Result")}>📑 Results</li>

          <li onClick={() => setActiveView("Event")}>🎉 Events</li>

          <li>⚙️ Settings</li>
        </ul>

        <div className="profile">
          <h4>Admin User</h4>
          <p>Placement Cell</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="header">
          <h1>Campus Notifications Dashboard</h1>
          <p>Intelligent Priority Ranking based on Type Weight and Recency</p>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* STATS */}
        <div className="stats">
          <div className="stat-card">
            <h2>{allNotifications.length}</h2>
            <p>Total Notifications</p>
          </div>

          <div className="stat-card">
            <h2>{notifications.length}</h2>
            <p>Priority Inbox</p>
          </div>

          <div className="stat-card">
            <h2>
              {allNotifications.filter((n) => n.Type === "Placement").length}
            </h2>
            <p>Placements</p>
          </div>

          <div className="stat-card">
            <h2>
              {allNotifications.filter((n) => n.Type === "Result").length}
            </h2>
            <p>Results</p>
          </div>

          <div className="stat-card">
            <h2>{allNotifications.filter((n) => n.Type === "Event").length}</h2>
            <p>Events</p>
          </div>
        </div>

        {/* DASHBOARD PAGE */}
        {activeView === "Dashboard" && (
          <>
            <div className="section-title">📈 Dashboard Overview</div>

            <div className="notification-grid">
              {notifications.slice(0, 5).map((notification, index) => (
                <div key={notification.ID} className="notification-card">
                  <div className="card-top">
                    <h3>
                      #{index + 1} {notification.Message}
                    </h3>

                    <span
                      className={`badge ${notification.Type.toLowerCase()}`}
                    >
                      {notification.Type}
                    </span>
                  </div>

                  <p className="card-date">📅 {notification.Timestamp}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* OTHER PAGES */}
        {activeView !== "Dashboard" && (
          <>
            <div className="section-title">
              {activeView === "AllNotifications" && "📨 All Notifications"}

              {activeView === "PriorityInbox" && "⭐ Top 10 Priority Inbox"}

              {activeView === "Placement" && "🎯 Placement Notifications"}

              {activeView === "Result" && "📑 Result Notifications"}

              {activeView === "Event" && "🎉 Event Notifications"}
            </div>

            <div className="notification-grid">
              {searchedNotifications.map((notification, index) => (
                <div key={notification.ID} className="notification-card">
                  <div className="card-top">
                    <h3>
                      #{index + 1} {notification.Message}
                    </h3>

                    <span
                      className={`badge ${notification.Type.toLowerCase()}`}
                    >
                      {notification.Type}
                    </span>
                  </div>

                  <p className="card-date">📅 {notification.Timestamp}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
