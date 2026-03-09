import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Booking = () => {
  const { user } = useAuth();
  const [selectedServices, setSelectedServices] = useState([]);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const cardioPrice = 3000;
  const strengthPrice = 3000;
  const trainerPrice = 10000;

  const token = localStorage.getItem("token");

  const fetchMyBooking = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/booking/mybooking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setBooking(data);
      }
    } catch (err) {
      setBooking(null); // no booking found
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooking();
  }, []);

  const handleCheckboxChange = (serviceName, price) => {
    const service = { name: serviceName, price };
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.name === serviceName);
      return exists
        ? prev.filter((s) => s.name !== serviceName)
        : [...prev, service];
    });
  };

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const future = new Date();
    future.setDate(now.getDate() + 30);

    const formatDate = (d) => d.toISOString().split("T")[0];

    const bookingData = {
      services: selectedServices,
      total: totalPrice,
      startDate: formatDate(now),
      endDate: formatDate(future),
    };

    const res = await fetch("http://localhost:4000/api/booking/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();

    if (res.ok) {
      setBooking(data.booking);
      toast.success("Booking successful!");
    } else {
      toast.error(data.message || "Booking failed, Login for booking");
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel your booking?")) return;

    const res = await fetch("http://localhost:4000/api/booking/cancel", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Booking canceled");
      setBooking(null);
      setSelectedServices([]);
    } else {
      toast.error(data.message || "Cancel failed");
    }
  };

  if (loading) {
    return (
      <section className="section-registration">
        <div className="container">
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontSize: "2rem", color: "#333" }}>Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-registration">
      <div className="container">
        <div className="registration-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h1 className="main-heading">
            Welcome {user && user.username ? user.username : ""} to LifeFitness
          </h1>
          <p style={{ textAlign: "center", marginBottom: "2rem", color: "#666" }}>
            Choose your fitness services and start your transformation journey today.
          </p>

          {booking ? (
            <div className="booking-details">
              <h3 style={{ color: "#fd6104", marginBottom: "2rem", textAlign: "center" }}>
                ✅ Your Active Booking
              </h3>
              <div className="booking-services">
                {booking.services.map((s, i) => (
                  <div key={i} className="service-item">
                    <span className="service-name">{s.name}</span>
                    <span className="service-price">Rs {s.price}</span>
                  </div>
                ))}
              </div>
              <div className="booking-summary">
                <div className="summary-item">
                  <strong>Total:</strong> Rs {booking.total}
                </div>
                <div className="summary-item">
                  <strong>Start Date:</strong> {booking.startDate}
                </div>
                <div className="summary-item">
                  <strong>End Date:</strong> {booking.endDate}
                </div>
              </div>
              <button className="btn btn-submit" onClick={handleCancel}>
                Cancel Booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ color: "#fd6104", marginBottom: "2rem", textAlign: "center" }}>
                Select Services
              </h3>
              
              <div className="service-options">
                <label className="service-option">
                  <input
                    type="checkbox"
                    value="cardio"
                    onChange={() => handleCheckboxChange("Cardio", cardioPrice)}
                    checked={selectedServices.some((s) => s.name === "Cardio")}
                  />
                  <div className="service-info">
                    <span className="service-name">Cardio Training</span>
                    <span className="service-price">Rs {cardioPrice}</span>
                  </div>
                </label>
                
                <label className="service-option">
                  <input
                    type="checkbox"
                    value="strength"
                    onChange={() => handleCheckboxChange("Strength", strengthPrice)}
                    checked={selectedServices.some((s) => s.name === "Strength")}
                  />
                  <div className="service-info">
                    <span className="service-name">Strength Training</span>
                    <span className="service-price">Rs {strengthPrice}</span>
                  </div>
                </label>
                
                <label className="service-option">
                  <input
                    type="checkbox"
                    value="trainer"
                    onChange={() => handleCheckboxChange("Trainer", trainerPrice)}
                    checked={selectedServices.some((s) => s.name === "Trainer")}
                  />
                  <div className="service-info">
                    <span className="service-name">Personal Trainer</span>
                    <span className="service-price">Rs {trainerPrice}</span>
                  </div>
                </label>
              </div>
              
              <div className="total-section">
                <h3 style={{ color: "#fff", textAlign: "center" }}>
                  Total Price: Rs {totalPrice}
                </h3>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-submit"
                disabled={selectedServices.length === 0}
              >
                Book Now
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
