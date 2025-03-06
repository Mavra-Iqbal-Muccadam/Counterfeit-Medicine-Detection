import { supabase } from "../lib/supabaseClient";


export async function getManufacturerById(manufacturer_id) {
  try {
    console.log(`🔍 Querying Supabase for Manufacturer ID: ${manufacturer_id}`);

    // Query Supabase
    const { data, error } = await supabase
      .from("manufacturers") // Replace with your actual table name
      .select("*")
      .eq("manufacturer_id", manufacturer_id)
      .single(); // Fetch only one record

    if (error) {
      console.error("❌ Supabase Error:", error.message);
      return null;
    }

    console.log("✅ Manufacturer Data Retrieved:", data);
    return data;
  } catch (error) {
    console.error("❌ Unexpected Error in getManufacturerById:", error);
    return null;
  }
}
