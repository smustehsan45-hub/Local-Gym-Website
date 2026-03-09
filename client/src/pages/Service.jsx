import React from "react";
import { useAuth } from "../store/auth";

export const Service = () => {
  const { services, loading } = useAuth();

  if (loading) {
    return (
      <section className="section-services">
        <div className="container">
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontSize: "2rem", color: "white" }}>Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!Array.isArray(services) || services.length === 0) {
    return (
      <section className="section-services">
        <div className="container">
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontSize: "2rem", color: "white" }}>No services found.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Our Services</h1>

        <div className="grid grid-three-cols">
          {services.map((curElem, index) => {
            const { provider, price, service, description } = curElem;

            return (
              <div className="card" key={index}>
                <div className="card-details">
                  <h2 className="service-title">{service}</h2>
                  <p className="service-description">{description}</p>
                  <div className="service-meta">
                    <span className="service-provider">By: {provider}</span>
                    <span className="service-price">{price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <a href="/booking">
            <button className="btn">
              Book Now
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};
