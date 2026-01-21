import { useEffect, useState } from "react";
import api from "../../api/axios";

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    const fetchProfessionals = async () => {
      const res = await api.get("/professionals");
      setProfessionals(res.data);
    };
    fetchProfessionals();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Professionals</h2>
      <ul className="space-y-2">
        {professionals.map((p) => (
          <li key={p._id} className="border p-3 rounded">
            <p><b>{p.name}</b></p>
            <p>Status: {p.isActive ? "Active" : "Inactive"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Professionals;
