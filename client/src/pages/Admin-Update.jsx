import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  const [data, setData] = useState({ username: "", email: "", phone: "" });
  const params = useParams();
  const { authorizationToken } = useAuth();

  // Get single user data
  const getsingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json"
        }
      });
      const userData = await response.json();
      if (response.ok) {
        setData(userData);
      } else {
        toast.error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching user data.");
    }
  };

  useEffect(() => {
    getsingleUserData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/admin/users/update/${params.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast.success("Updated successfully");
      } else {
        toast.error("Not updated");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating user data.");
    }
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update User Data</h1>
        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="username" value={data.username} onChange={handleInput} placeholder="Username" />
          <input type="email" name="email" value={data.email} onChange={handleInput} placeholder="Email" />
          <input type="text" name="phone" value={data.phone} onChange={handleInput} placeholder="Phone" />
          <button type="submit">Update</button>
        </form>
      </div>
    </section>
  );
};