mexport default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{
      width: "250px",
      height: "100vh",
      background: "#1f2937",
      color: "white",
      padding: "20px"
    }}>
      <h3>SSG-PMS</h3>

      <p>Role: {user?.role}</p>

      <ul>
        <li>Dashboard</li>
        <li>Tasks</li>
        <li>Workflow</li>
        <li>Reports</li>
      </ul>
    </div>
  );
}