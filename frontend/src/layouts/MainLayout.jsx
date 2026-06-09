import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function MainLayout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />
        <div style={{ padding: 20 }}>
          <h2>Welcome to SSG-PMS Dashboard</h2>
        </div>
      </div>
    </div>
  );
}