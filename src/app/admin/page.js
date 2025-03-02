"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

const Admin = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch pending manufacturers from Supabase
    const fetchManufacturers = async () => {
      const { data, error } = await supabase
        .from("manufacturers") // Your Supabase table name
        .select("*")
        .eq("status", "pending"); // Fetch only those with status "pending"

      if (error) {
        console.error("Error fetching manufacturers:", error);
      } else {
        setManufacturers(data);
      }
      setLoading(false);
    };

    fetchManufacturers();
  }, []);

  const handleApprove = async (id) => {
    // Update the status of the manufacturer to "approved"
    const { error } = await supabase
      .from("manufacturers")
      .update({ status: "approved" })
      .eq("id", id); // Update the manufacturer with the matching ID

    if (error) {
      console.error("Error approving manufacturer:", error);
    } else {
      // After approval, fetch updated data
      setManufacturers((prev) =>
        prev.filter((manufacturer) => manufacturer.id !== id)
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>License No.</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Address</th>
            <th>Wallet Address</th>
            <th>Certification No.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer) => (
            <tr key={manufacturer.id}>
              <td>{manufacturer.name}</td>
              <td>{manufacturer.licenceNo}</td>
              <td>{manufacturer.email}</td>
              <td>{manufacturer.phone}</td>
              <td>{manufacturer.website}</td>
              <td>{manufacturer.physicalAddress}</td>
              <td>{manufacturer.walletAddress}</td>
              <td>{manufacturer.certificationNumber}</td>
              <td>
                <button onClick={() => handleApprove(manufacturer.id)}>
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
