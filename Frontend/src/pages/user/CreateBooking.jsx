import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const CreateBooking = () => {
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedProfessionals, setSelectedProfessionals] = useState([]);
  const [startTime, setStartTime] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const s = await api.get("/service");
        const p = await api.get("/professionals");

        setServices(s.data);
        setProfessionals(p.data.filter((pro) => pro.isActive));
      } catch (error) {
        toast.error("Failed to load services or professionals");
      }
    };

    fetchData();
  }, []);
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
  const handleBooking = async () => {
    if (
      selectedServices.length === 0 ||
      selectedProfessionals.length === 0 ||
      !startTime
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      await api.post("/booking", {
        services: selectedServices,
        professionals: selectedProfessionals,
        startTime,
      });

      toast.success("Booking created successfully");
      setSelectedServices([]);
      setSelectedProfessionals([]);
      setStartTime("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Booking
      </h2>
      <h3 className="font-semibold mb-2">Select Services</h3>
      {services.map((s) => (
        <label key={s._id} className="block mb-1">
          <input
            type="checkbox"
            checked={selectedServices.includes(s._id)}
            onChange={() => toggleService(s._id)}
          />
          <span className="ml-2">
            {s.name} ({s.duration} min)
          </span>
        </label>
      ))}
      <h3 className="font-semibold mt-4 mb-2">
        Select Professionals
      </h3>
      {professionals.map((p) => (
        <label key={p._id} className="block mb-1">
          <input
            type="checkbox"
            checked={selectedProfessionals.includes(p._id)}
            onChange={() => toggleProfessional(p._id)}
          />
          <span className="ml-2">{p.name}</span>
        </label>
      ))}
      <h3 className="font-semibold mt-4 mb-2">Start Time</h3>
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleBooking}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Book Now
      </button>
    </div>
  );
};

export default CreateBooking;
