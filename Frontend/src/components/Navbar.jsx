import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-slate-700 text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-wide">
        Spa Booking
      </h1>
      <div className="flex items-center gap-4">
        {!token ? (
          <>
            <Link
              to="/login"
              className="hover:text-blue-400 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-300">
              Welcome <span className="font-semibold text-white">{name || role}</span>
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
    </header>
  );
};

export default Navbar;
