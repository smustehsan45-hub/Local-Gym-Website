import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminBookings = () => {
  const { authorizationToken } = useAuth();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/admin/bookings", {
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await res.json();
      console.log("Fetched Bookings:", data);
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const cancelBooking = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/admin/bookings/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Booking canceled successfully");
        fetchBookings(); // Refresh list after deletion
      } else {
        alert(data.message || "Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <section className="admin-bookings-section">
      <div className="container">
        <h1>All Bookings</h1>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Services</th>
                <th>Total</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.username}</td>
                  <td>
                    {b.services.map((s, i) => (
                      <span key={i}>
                        {s.name} ({s.price}){" "}
                      </span>
                    ))}
                  </td>
                  <td>{b.total}</td>
                  <td>{new Date(b.startDate).toLocaleDateString()}</td>
                  <td>{new Date(b.endDate).toLocaleDateString()}</td>
                  <td>
                    <button className="btn" onClick={() => cancelBooking(b._id)}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};
