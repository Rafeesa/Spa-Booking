import { useEffect, useState } from "react";
import api from "../../api/axios";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await api.get("/service");
      setServices(res.data);
    };
    fetchServices();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Services</h2>
      <ul className="space-y-2">
        {services.map((s) => (
          <li key={s._id} className="border p-3 rounded">
            <p><b>{s.name}</b></p>
            <p>Duration: {s.duration} mins</p>
            <p>Price: ₹{s.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
