import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);

  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedProfessionals, setSelectedProfessionals] = useState([]);
  const [startTime, setStartTime] = useState("");
  useEffect(() => {
    fetchBookings();
    fetchOptions();
  }, []);
  const fetchBookings = async () => {
    try {
      const res = await api.get("/booking");
      setBookings(res.data);
    } catch (error) {
      toast.error("Failed to load bookings");
    }
  };
  const fetchOptions = async () => {
    try {
      const s = await api.get("/service");
      const p = await api.get("/professionals");

      setServices(s.data);
      setProfessionals(p.data.filter((pro) => pro.isActive));
    } catch {
      toast.error("Failed to load options");
    }
  };
  const handleEdit = (booking) => {
  setEditingBooking(booking);

  setSelectedServices(
    booking.services.map((s) =>
      typeof s === "string" ? s : s._id
    )
  );

  setSelectedProfessionals(
    booking.professionals.map((p) =>
      typeof p === "string" ? p : p._id
    )
  );

  setStartTime(booking.startTime.slice(0, 16));
};
  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };
  const toggleProfessional = (id) => {
    setSelectedProfessionals((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };
  const handleUpdate = async () => {
    try {
      await api.put(`/booking/${editingBooking._id}`, {
        services: selectedServices,
        professionals: selectedProfessionals,
        startTime,
      });

      toast.success("Booking updated successfully");
      setEditingBooking(null);
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>

      {bookings.map((b) => (
        <div key={b._id} className="border p-4 mb-4 rounded">
          <p><b>Status:</b> {b.status}</p>
          <p><b>Start:</b> {new Date(b.startTime).toLocaleString()}</p>

          {b.status !== "completed" && (
            <button
              className="mt-2 text-blue-600"
              onClick={() => handleEdit(b)}
            >
              Edit
            </button>
          )}
        </div>
      ))}
      {editingBooking && (
        <div className="border p-4 mt-6 rounded">
          <h3 className="font-semibold mb-2">Edit Booking</h3>

          <p className="font-medium">Services</p>
          {services.map((s) => (
            <label key={s._id} className="block">
              <input
                type="checkbox"
                checked={selectedServices.includes(s._id)}
                onChange={() => toggleService(s._id)}
              />
              <span className="ml-2">{s.name}</span>
            </label>
          ))}

          <p className="font-medium mt-4">Professionals</p>
          {professionals.map((p) => (
            <label key={p._id} className="block">
              <input
                type="checkbox"
                checked={selectedProfessionals.includes(p._id)}
                onChange={() => toggleProfessional(p._id)}
              />
              <span className="ml-2">{p.name}</span>
            </label>
          ))}

          <p className="font-medium mt-4">Start Time</p>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={handleUpdate}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Update Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
