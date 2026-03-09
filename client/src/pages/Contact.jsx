import { useState } from "react";
import { toast } from "react-toastify";

export const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      const res_data = await response.json();
      if (response.ok) {
        setContact({ username: "", email: "", message: "" });
        toast.success("Message sent successfully!");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log("contact", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="section-registration">
      <div className="container">
        <div className="registration-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h1 className="main-heading">Contact Us</h1>
          <p style={{ textAlign: "center", marginBottom: "2rem", color: "#666" }}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Name</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your name"
                id="username"
                required
                autoComplete="off"
                value={contact.username}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                id="email"
                required
                autoComplete="off"
                value={contact.email}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                placeholder="Enter your message"
                id="message"
                required
                autoComplete="off"
                value={contact.message}
                onChange={handleInput}
                rows="5"
              />
            </div>
            <button type="submit" className="btn btn-submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};