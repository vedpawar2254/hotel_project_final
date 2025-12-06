import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DashboardBookings = ({ type }) => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("adminToken"); // get JWT token from login

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const url = type === "rooms"
          ? "http://localhost:3000/dashboard/rooms"
          : "http://localhost:3000/dashboard/tables";

        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // send token
          }
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Fetch error:", data.message || res.statusText);
          setBookings([]); // fallback to empty array
          return;
        }

        // ensure data is an array
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch failed:", err);
        setBookings([]);
      }
    };

    fetchBookings();
  }, [type, token]);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:3000/booking/update-status/${id}?type=${type === "rooms" ? "room" : "table"}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      setBookings(prev =>
        prev.map(b => b._id === id ? { ...b, status } : b)
      );
    } catch (err) {
      console.error("Update status failed:", err);
    }
  };

  return (
    <div className="p-10 text-white">
      <Link to="/dashboard">← Back</Link>
      <h1 className="text-3xl mb-6 text-white">
        Heyy {user ? user.displayName : 'Admin'} 👋
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {bookings.length === 0 ? (
          <p>No {type} bookings found.</p>
        ) : (
          bookings.slice().reverse().map(b => (
            <div key={b._id} className="border p-4 rounded mb-4">
              <h2 className="font-bold text-white text-2xl mb-4">
                {b.firstName} {b.lastName}
              </h2>
              <p>{b.email}</p>
              <p>Status: <b>{b.status}</b></p>

              <select
                className="bg-gray-800 p-2 rounded mt-2"
                value={b.status}
                onChange={(e) => updateStatus(b._id, e.target.value)}
              >
                <option value="hold">Hold</option>
                <option value="confirmed">Confirm</option>
                <option value="rejected">Reject</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardBookings;
