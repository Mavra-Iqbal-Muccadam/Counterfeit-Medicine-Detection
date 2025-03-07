// src/lib/manufacturerService.js
import { supabase } from "./supabaseClientanon";

// Fetch all manufacturers (only ID, Name, and Status)
export const fetchManufacturers = async () => {
  try {
    const { data, error } = await supabase
      .from("manufacturers")
      .select("manufacturer_id, name, status"); // Ensure manufacturer_id is included

    if (error) throw error;
    console.log("📌 Raw Data from Database:", data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching manufacturers:", error.message);
    return [];
  }
};

// Fetch full manufacturer details by ID
export const fetchManufacturerDetails = async (id) => {
  try {
    // Fetch manufacturer details
    const { data: manufacturerData, error: manufacturerError } = await supabase
      .from("manufacturers")
      .select(
        "manufacturer_id, name, physical_address, phone, licence_no, email, wallet_address, certification_url, certification_no, website_url, date_of_issue, reg_date, status"
      )
      .eq("manufacturer_id", id)
      .single();

    if (manufacturerError) throw manufacturerError;

    // Format the reg_date to remove the timestamp
    if (manufacturerData && manufacturerData.reg_date) {
      manufacturerData.reg_date = new Date(manufacturerData.reg_date).toISOString().split('T')[0];
    }

    // Fetch rejection comments if the manufacturer is rejected
    let rejectionComments = [];
    if (manufacturerData.status === "rejected") {
      const { data: commentsData, error: commentsError } = await supabase
        .from("rejection_comments")
        .select("comments")
        .eq("manufacturer_id", id);

      if (commentsError) throw commentsError;
      rejectionComments = commentsData;
    }

    // Add rejection comments to the manufacturer data
    manufacturerData.rejection_comments = rejectionComments;

    return manufacturerData;
  } catch (error) {
    console.error("❌ Error fetching manufacturer details:", error.message);
    return null;
  }
};

<<<<<<< HEAD



// Update manufacturer status to "Accepted"
export const acceptManufacturer = async (id) => {
=======
// Accept Manufacturer
export const acceptManufacturer = async (manufacturer_id) => {
>>>>>>> mavra
  try {
    console.log("🚧 Starting DB update for manufacturer:", id);
    const { data, error } = await supabase
      .from('manufacturers') // Make sure table name is correct
      .update({ status: "accepted" })
      .eq("manufacturer_id", manufacturer_id)
      .select();

    if (error) {
      throw error;
    }

    console.log("✅ DB Update successful:", data);
    // Explicitly return true since data may be []
    return true;

  } catch (error) {
    console.error("❌ Error accepting manufacturer:", error.message);
    return null;
  }
};

<<<<<<< HEAD



// Update manufacturer status to "Rejected"
export const rejectManufacturer = async (id) => {
=======
// // Reject Manufacturer
// export const rejectManufacturer = async (manufacturer_id) => {
//   try {
//     const { data, error } = await supabase
//       .from("manufacturers")
//       .update({ status: "rejected" })
//       .eq("manufacturer_id", manufacturer_id)
//       .select();

//     if (error) throw error;
//     return data;
//   } catch (error) {
//     console.error("❌ Error rejecting manufacturer:", error.message);
//     return null;
//   }
// };





export const rejectManufacturer = async (manufacturer_id, comment = null) => {
>>>>>>> mavra
  try {
    // Update the manufacturer status to 'rejected'
    const { data: manufacturerData, error: manufacturerError } = await supabase
      .from("manufacturers")
      .update({ status: "rejected" })
      .eq("manufacturer_id", manufacturer_id)
      .select();

    if (manufacturerError) throw manufacturerError;

    // If a comment is provided, insert it into the rejection_comments table
    if (comment) {
      const { data: commentData, error: commentError } = await supabase
        .from("rejection_comments")
        .insert([{ manufacturer_id, comments: comment }]);

      if (commentError) throw commentError;
    }

    return manufacturerData;
  } catch (error) {
    console.error("❌ Error rejecting manufacturer:", error.message);
    return null;
  }
};