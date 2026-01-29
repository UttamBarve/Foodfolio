import { useState } from "react";
import { apiRequest } from "../../services/api";

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "1",
    date: "",
    time: "08:00am",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiRequest("/api/reservations", "POST", formData);

      alert("Reservation request submitted!");

      setFormData({
        name: "",
        phone: "",
        guests: "1",
        date: "",
        time: "08:00am",
        message: "",
      });
    } catch (err) {
      setError("Failed to submit reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="form reservation-form bg-black-10">

          {/* LEFT FORM */}
          <form className="form-left" onSubmit={handleSubmit}>
            <h2 className="headline-1 text-center">
              Online Reservation
            </h2>

            <p className="form-text text-center">
              Booking request{" "}
              <a href="tel:+88123123456" className="link">
                +88-123-123456
              </a>{" "}
              or fill out the order form
            </p>

            <div className="input-wrapper">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input-field"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="input-field"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-wrapper">

              <div className="icon-wrapper">
                <ion-icon name="person-outline"></ion-icon>
                <select
                  name="guests"
                  className="input-field"
                  value={formData.guests}
                  onChange={handleChange}
                >
                  {[1,2,3,4,5,6,7].map(n => (
                    <option key={n} value={n}>
                      {n} Person
                    </option>
                  ))}
                </select>
                <ion-icon name="chevron-down"></ion-icon>
              </div>

              <div className="icon-wrapper">
                <ion-icon name="calendar-clear-outline"></ion-icon>
                <input
                  type="date"
                  name="date"
                  className="input-field"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="icon-wrapper">
                <ion-icon name="time-outline"></ion-icon>
                <select
                  name="time"
                  className="input-field"
                  value={formData.time}
                  onChange={handleChange}
                >
                  {[
                    "08:00am","09:00am","10:00am","11:00am","12:00pm",
                    "01:00pm","02:00pm","03:00pm","04:00pm",
                    "05:00pm","06:00pm","07:00pm","08:00pm",
                    "09:00pm","10:00pm"
                  ].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ion-icon name="chevron-down"></ion-icon>
              </div>

            </div>

            <textarea
              name="message"
              placeholder="Message"
              className="input-field"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit" className="btn btn-secondary" disabled={loading}>
              <span className="text text-1">
                {loading ? "Submitting..." : "Book A Table"}
              </span>
              <span className="text text-2">
                {loading ? "Submitting..." : "Book A Table"}
              </span>
            </button>

            {error && (
              <p style={{ marginTop: "10px", color: "red", textAlign: "center" }}>
                {error}
              </p>
            )}
          </form>

          {/* RIGHT INFO (UNCHANGED) */}
          <div
            className="form-right text-center"
            style={{
              backgroundImage:
                "url('/assets/images/form-pattern.png')",
            }}
          >
            <h2 className="headline-1">Contact Us</h2>

            <p className="contact-label">Booking Request</p>
            <a
              href="tel:+88123123456"
              className="body-1 contact-number"
            >
              +88-123-123456
            </a>

            <div className="separator"></div>

            <p className="contact-label">Location</p>
            <address className="body-4">
              Restaurant St, Delicious City, <br />
              London 9578, UK
            </address>

            <p className="contact-label">Lunch Time</p>
            <p className="body-4">
              Monday to Sunday <br />
              11.00 am - 2.30pm
            </p>

            <p className="contact-label">Dinner Time</p>
            <p className="body-4">
              Monday to Sunday <br />
              05.00 pm - 10.00pm
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Reservation;
