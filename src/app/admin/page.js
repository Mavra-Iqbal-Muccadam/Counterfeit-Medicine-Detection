"use client";
import { useState } from "react";
import "./admin.css";

const Admin = () => {
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");

  // Dummy admin data
  const adminDetails = {
    name: "Admin User",
    experience: "5 years",
    role: "Administrator",
  };

  const handleView = (user) => {
    setSelectedManufacturer(user);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Menu</h2>
        <ul>
          <li
            className={`admin-sidebar-li ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => handleTabClick("pending")}
          >
            Pending Manufacturers
          </li>
          <li
            className={`admin-sidebar-li ${activeTab === "accepted" ? "active" : ""}`}
            onClick={() => handleTabClick("accepted")}
          >
            Accepted Manufacturers
          </li>
          <li
            className={`admin-sidebar-li ${activeTab === "rejected" ? "active" : ""}`}
            onClick={() => handleTabClick("rejected")}
          >
            Rejected Manufacturers
          </li>
        </ul>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h2>Admin Dashboard</h2>
        </header>
        <div className="admin-details">
          <h3>Admin Details</h3>
          <p>Name: {adminDetails.name}</p>
          <p>Experience: {adminDetails.experience}</p>
          <p>Role: {adminDetails.role}</p>
        </div>

        <section className="admin-content">
          {activeTab === "pending" && (
            <div className="admin-table-container">
              <h3>Pending Users</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {["Ali", "Hussain", "Aoun", "Mustufa", "Irtiza", "Aizaz", "Abbas", "Husnain"].map(
                    (user) => (
                      <tr key={user}>
                        <td>{user}</td>
                        <td>Pending</td>
                        <td>
                          <button className="admin-button" style={{ marginRight: "5px" }}>
                            Accept
                          </button>
                          <button className="admin-button" style={{ marginRight: "5px" }}>
                            Reject
                          </button>
                          <button className="admin-button" onClick={() => handleView(user)}>View</button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "accepted" && (
            <div className="admin-table-container">
              <h3>Accepted Manufacturers</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {["Manufacturer E", "Manufacturer F"].map((manufacturer) => (
                    <tr key={manufacturer}>
                      <td>{manufacturer}</td>
                      <td>Accepted</td>
                      <td>
                        <button className="admin-button" onClick={() => handleView(manufacturer)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "rejected" && (
            <div className="admin-table-container">
              <h3>Rejected Manufacturers</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {["Manufacturer G", "Manufacturer H"].map((manufacturer) => (
                    <tr key={manufacturer}>
                      <td>{manufacturer}</td>
                      <td>Rejected</td>
                      <td>
                        <button className="admin-button" onClick={() => handleView(manufacturer)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedManufacturer && (
            <div className="manufacturer-details">
              <h3>Manufacturer Details for {selectedManufacturer}</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{selectedManufacturer} Manufacturing</td>
                  </tr>
                  <tr>
                    <td>License No.</td>
                    <td>12345</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{selectedManufacturer}@example.com</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>123-456-7890</td>
                  </tr>
                  <tr>
                    <td>Website</td>
                    <td>
                      www.example.com
                    </td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>123 Main St</td>
                  </tr>
                  <tr>
                    <td>Wallet Address</td>
                    <td>0xAbCdEfGhIjKlMnOpQrStUvWxYz</td>
                  </tr>
                  <tr>
                    <td>Certification No.</td>
                    <td>CERT-9876</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Admin;
