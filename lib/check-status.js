import { supabase } from "../lib/supabaseClientanon";

export async function getManufacturerStatus(walletAddress) {
    try {
        console.log("🔍 Querying Supabase for wallet address:", walletAddress);

        const { data, error } = await supabase
            .from("manufacturers") // Ensure table name is correct
            .select("status")
            .eq("wallet_address", walletAddress)
            .single(); // Expect only one record

        console.log("🟢 Query Result:", data);
        console.log("🔴 Query Error:", error);

        if (error) {
            console.error("❌ Supabase error:", error);
            return "ID not found"; // Return message instead of throwing an error
        }

        return data ? data.status : "ID not found"; // If no data, return "ID not found"
    } catch (error) {
        console.error("❌ Database error:", error);
        return "ID not found"; // Return message even if an exception occurs
    }
}
