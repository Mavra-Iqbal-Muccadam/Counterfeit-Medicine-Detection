// src/lib/manufacturerService.js
import { supabase } from "./supabaseClientanon";

// Fetch all manufacturers (only ID, Name, and Status)
export const fetchManufacturers = async () => {
  try {
    const { data, error } = await supabase
      .from("manufacturers")
      .select("manufacturer_id, name, status");

    if (error) throw error;
    console.log("Raw Data from Database:", data); // Log the raw data
    return data;
  } catch (error) {
    console.error("❌ Error fetching manufacturers:", error);
    return [];
  }
};

// Fetch full manufacturer details by ID
export const fetchManufacturerDetails = async (id) => {
  try {
    const { data, error } = await supabase
      .from("manufacturers")
      .select(
        "name, physical_address, phone, licence_no, email, wallet_address, certification_url, certification_no, website_url, date_of_issue, reg_date"
      )
      .eq("manufacturer_id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("❌ Error fetching manufacturer details:", error);
    return null;
  }
};




// Update manufacturer status to "Accepted"
export const acceptManufacturer = async (id) => {
  try {
    console.log("🚧 Starting DB update for manufacturer:", id);
    const { data, error } = await supabase
      .from('manufacturers') // Make sure table name is correct
      .update({ status: "accepted" })
      .eq("manufacturer_id", id);

    if (error) {
      throw error;
    }

    console.log("✅ DB Update successful:", data);
    // Explicitly return true since data may be []
    return true;

  } catch (error) {
    console.error("❌ Error accepting manufacturer:", error);
    return null;
  }
};




// Update manufacturer status to "Rejected"
export const rejectManufacturer = async (id) => {
  try {
    const { data, error } = await supabase
      .from("manufacturers")
      .update({ status: "rejected" })
      .eq("manufacturer_id", id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("❌ Error rejecting manufacturer:", error);
    return null;
  }
};