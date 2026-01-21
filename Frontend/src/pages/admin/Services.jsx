import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const Services = () => {
  const [services, setServices] = useState([]);

  // form states
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  // edit state
  const [editingId, setEditingId] = useState(null);

  // fetch services
  const fetchServices = async () => {
    try {
      const res = await api.get("/service");
      setServices(res.data);
    } catch (error) {
      toast.error("Failed to load services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // add or update service
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !duration || !price) {
      toast.error("All fields are required");
      return;
    }

    try {
      if (editingId) {
        // UPDATE
        await api.put(`/service/${editingId}`, {
          name,
          duration,
          price,
        });
        toast.success("Service updated successfully");
      } else {
        // CREATE
        await api.post("/service", {
          name,
          duration,
          price,
        });
        toast.success("Service added successfully");
      }

      // reset form
      setName("");
      setDuration("");
      setPrice("");
      setEditingId(null);

      fetchServices();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  // start editing
  const handleEdit = (service) => {
    setEditingId(service._id);
    setName(service.name);
    setDuration(service.duration);
    setPrice(service.price);
  };

  // delete service
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/service/${id}`);
      toast.success("Service deleted successfully");
      fetchServices();
    } catch (error) {
      toast.error("Failed to delete service");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Service Management</h1>

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          placeholder="Service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Duration (min)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className={`${
            editingId ? "bg-green-600" : "bg-blue-600"
          } text-white rounded px-4 py-2 hover:opacity-90`}
        >
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      {/* Services Table */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Duration</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-center">
                No services available
              </td>
            </tr>
          ) : (
            services.map((service) => (
              <tr key={service._id} className="border-t">
                <td className="p-3">{service.name}</td>
                <td className="p-3">{service.duration}</td>
                <td className="p-3">₹ {service.price}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Services;
