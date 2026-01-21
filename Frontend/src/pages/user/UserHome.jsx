import { useState } from "react";
import Services from "./Services";
import Professionals from "./Professionals";
import CreateBooking from "./CreateBooking";
import MyBookings from "./MyBookings";

const UserHome = () => {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setActiveTab("services")}
            className="bg-white p-4 rounded shadow hover:bg-blue-50"
          >
            View Services
          </button>

          <button
            onClick={() => setActiveTab("professionals")}
            className="bg-white p-4 rounded shadow hover:bg-blue-50"
          >
            Professionals
          </button>

          <button
            onClick={() => setActiveTab("create")}
            className="bg-white p-4 rounded shadow hover:bg-blue-50"
          >
            Create Booking
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className="bg-white p-4 rounded shadow hover:bg-blue-50"
          >
            My Bookings
          </button>
        </div>
        <div className="bg-white p-6 rounded shadow">
          {activeTab === "services" && <Services />}
          {activeTab === "professionals" && <Professionals />}
          {activeTab === "create" && <CreateBooking />}
          {activeTab === "bookings" && <MyBookings />}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
