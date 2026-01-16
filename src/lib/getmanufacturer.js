import { supabase } from "../lib/supabaseClientanon";

export const getManufacturerById = async (manufacturer_id) => {
  try {
    console.log(`🔍 Fetching Manufacturer ID: ${manufacturer_id} from database...`);

    const { data, error } = await supabase
      .from("manufacturers")
      .select("*")
      .eq("manufacturer_id", manufacturer_id)
      .single();

    if (error) {
      console.error("❌ Error fetching manufacturer from DB:", error);
      return null;
    }

    console.log("✅ Manufacturer Data Fetched:", data);
    return data;
  } catch (error) {
    console.error("❌ Unexpected Error in getManufacturerById:", error);
    return null;
  }
};