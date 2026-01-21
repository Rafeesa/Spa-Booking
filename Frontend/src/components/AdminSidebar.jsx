import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-4">
        <NavLink
          to="/admin/services"
          className="hover:text-blue-300"
        >
          Services
        </NavLink>

        <NavLink
          to="/admin/professionals"
          className="hover:text-blue-300"
        >
          Professionals
        </NavLink>

        <NavLink
          to="/admin/bookings"
          className="hover:text-blue-300"
        >
          Bookings
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
