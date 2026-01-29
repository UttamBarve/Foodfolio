import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    isActive: true,
    image: null,
  });

  const token = localStorage.getItem("admin-token");

  // 🔹 Fetch menu items
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await apiRequest("/api/menu", "GET", null, token);
        setMenu(data);
      } catch (err) {
        console.error("Failed to fetch menu", err);
      }
    };

    fetchMenu();
  }, [token]);

  // 🔹 Open modal (Add / Edit)
  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        category: item.category,
        price: item.price,
        isActive: item.isActive,
        image: null, // reset image on edit
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        category: "",
        price: "",
        isActive: true,
        image: null,
      });
    }

    setShowModal(true);
  };

  // 🔹 Handle form change (supports file input)
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files
        ? files[0]
        : name === "isActive"
        ? value === "true"
        : value,
    }));
  };

  // 🔹 Save (Create / Update)
  const handleSave = async () => {
    if (isSaving) return; // ⛔ prevent double click

    try {
      setIsSaving(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("isActive", formData.isActive);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editingItem) {
        const updated = await apiRequest(
          `/api/menu/${editingItem._id}`,
          "PUT",
          data,
          token
        );

        setMenu((prev) =>
          prev.map((m) =>
            m._id === editingItem._id ? updated : m
          )
        );
      } else {
        const created = await apiRequest(
          "/api/menu",
          "POST",
          data,
          token
        );

        setMenu((prev) => [...prev, created]);
      }

      setShowModal(false);
    } catch (err) {
      alert("Failed to save menu item");
    } finally {
      setIsSaving(false); // 🔓 unlock button
    }
  };

  // 🔹 Delete menu item
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;

    try {
      await apiRequest(`/api/menu/${id}`, "DELETE", null, token);
      setMenu((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert("Failed to delete menu item");
    }
  };

  return (
    <>
      <h1>Menu Management</h1>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {menu.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No menu items found
                </td>
              </tr>
            ) : (
              menu.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>${item.price}</td>
                  <td>{item.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => openModal(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button className="btn-add" onClick={() => openModal()}>
        + Add Menu Item
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingItem ? "Edit Menu Item" : "Add Menu Item"}</h2>

            <input
              type="text"
              name="name"
              placeholder="Dish name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />

            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
              className="txt"
            >
              <option className="back txt" value="true">
                Active
              </option>
              <option className="back txt" value="false">
                Inactive
              </option>
            </select>

            {/* Image Upload */}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button
                className="btn-edit"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>

              <button
                className="btn-delete"
                onClick={() => setShowModal(false)}
                disabled={isSaving}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
