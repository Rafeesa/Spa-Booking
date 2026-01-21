import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const fetchProfessionals = async () => {
    try {
      const res = await api.get("/professionals");
      setProfessionals(res.data);
    } catch (error) {
      toast.error("Failed to load professionals");
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Name is required");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/professionals/${editingId}`, {
          name,
          isActive,
        });
        toast.success("Professional updated successfully");
      } else {
        await api.post("/professionals", {
          name,
          isActive,
        });
        toast.success("Professional added successfully");
      }

      setName("");
      setIsActive(true);
      setEditingId(null);

      fetchProfessionals();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

 
  const handleEdit = (pro) => {
    setEditingId(pro._id);
    setName(pro.name);
    setIsActive(pro.isActive);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this professional?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/professionals/${id}`);
      toast.success("Professional deleted successfully");
      fetchProfessionals();
    } catch (error) {
      toast.error("Failed to delete professional");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Professional Management
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          type="text"
          placeholder="Professional name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={isActive}
          onChange={(e) => setIsActive(e.target.value === "true")}
          className="border p-2 rounded"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button
          type="submit"
          className={`${
            editingId ? "bg-green-600" : "bg-blue-600"
          } text-white rounded px-4 py-2 hover:opacity-90`}
        >
          {editingId ? "Update Professional" : "Add Professional"}
        </button>
      </form>
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {professionals.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-4 text-center">
                No professionals found
              </td>
            </tr>
          ) : (
            professionals.map((pro) => (
              <tr key={pro._id} className="border-t">
                <td className="p-3">{pro.name}</td>
                <td className="p-3">
                  {pro.isActive ? (
                    <span className="text-green-600 font-semibold">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(pro)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pro._id)}
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

export default Professionals;
