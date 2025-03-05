import { supabase } from "../../../lib/supabaseClient";

// Fetch all manufacturers (only ID, Name, and Status)
export const fetchManufacturers = async () => {
  try {
    const { data, error } = await supabase
      .from("manufacturers")
      .select("manufacturer_id, name, status");

    if (error) throw error;
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
      .select("name, physical_address, phone, licence_no, email, wallet_address, certification_url, certification_no, website_url, date_of_issue, reg_date")
      .eq("manufacturer_id", id) // ✅ Corrected this line
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("❌ Error fetching manufacturer details:", error);
    return null;
  }
};
