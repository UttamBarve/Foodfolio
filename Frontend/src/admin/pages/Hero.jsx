import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    subtitle: "",
    title: "",
    text: "",
    image: null,
  });

  const token = localStorage.getItem("admin-token");

  // 🔹 Fetch hero slides (admin)
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await apiRequest(
          "/api/hero/admin",
          "GET",
          null,
          token
        );
        setSlides(data);
      } catch (err) {
        console.error("Failed to fetch hero slides", err);
      }
    };

    fetchSlides();
  }, [token]);

  // 🔹 Open modal (Add / Edit)
  const openModal = (slide = null) => {
    if (slide) {
      setEditingSlide(slide);
      setFormData({
        subtitle: slide.subtitle,
        title: slide.title,
        text: slide.text,
        image: null, // reset image on edit
      });
    } else {
      setEditingSlide(null);
      setFormData({
        subtitle: "",
        title: "",
        text: "",
        image: null,
      });
    }

    setShowModal(true);
  };

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // 🔹 Save slide (Create / Update)
  const handleSave = async () => {
    if (isSaving) return; // ⛔ prevent multiple clicks

    try {
      setIsSaving(true);

      const data = new FormData();
      data.append("subtitle", formData.subtitle);
      data.append("title", formData.title);
      data.append("text", formData.text);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editingSlide) {
        const updated = await apiRequest(
          `/api/hero/${editingSlide._id}`,
          "PUT",
          data,
          token
        );

        setSlides((prev) =>
          prev.map((s) =>
            s._id === editingSlide._id ? updated : s
          )
        );
      } else {
        const created = await apiRequest(
          "/api/hero",
          "POST",
          data,
          token
        );

        setSlides((prev) => [...prev, created]);
      }

      setShowModal(false);
    } catch {
      alert("Failed to save hero slide");
    } finally {
      setIsSaving(false); // 🔓 unlock button
    }
  };

  // 🔹 Delete slide
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hero slide?")) return;

    try {
      await apiRequest(
        `/api/hero/${id}`,
        "DELETE",
        null,
        token
      );
      setSlides((prev) => prev.filter((s) => s._id !== id));
    } catch {
      alert("Failed to delete hero slide");
    }
  };

  return (
    <>
      <h1>Hero Slides</h1>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {slides.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No hero slides found
                </td>
              </tr>
            ) : (
              slides.map((slide) => (
                <tr key={slide._id}>
                  <td>
                    <img
                      src={slide.image}
                      alt="slide"
                      className="hero-preview"
                    />
                  </td>
                  <td>{slide.title}</td>
                  <td>{slide.subtitle}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => openModal(slide)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(slide._id)}
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
        + Add Hero Slide
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Hero Slide</h2>

            <input
              type="text"
              name="subtitle"
              placeholder="Subtitle"
              value={formData.subtitle}
              onChange={handleChange}
            />

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />

            {/* Image Upload */}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />

            <input
              type="text"
              name="text"
              placeholder="Text"
              value={formData.text}
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

export default Hero;
