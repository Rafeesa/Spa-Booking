import AdminSidebar from "../../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
  <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
    </div>
  
  );
};

export default AdminDashboard;
