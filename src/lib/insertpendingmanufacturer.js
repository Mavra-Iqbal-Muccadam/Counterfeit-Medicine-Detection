import { createClient } from '@supabase/supabase-js';

// ✅ Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("🛠 [DEBUG] Initializing Supabase Client...");
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 🔍 Ensure environment variables are set
if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ [ERROR] Missing Supabase environment variables!");
}

/**
 * Inserts transaction data into the database.
 * - Explicitly maps input fields to database columns.
 * - Prevents duplicate transactions by checking `transaction_hash`.
 * @param {Object} transactionData - The transaction details.
 * @returns {Object} - Success message or error.
 */
async function insertTransaction(transactionData) {
  try {
    console.log("📝 [DEBUG] Preparing to insert data into database:", transactionData);

    // ✅ Extract data from input object
    const { license_number, wallet_address, status, transaction_hash } = transactionData;

    // 🔍 Ensure all required fields are present
    if (!license_number || !wallet_address || !status || !transaction_hash) {
      console.error("❌ [ERROR] Missing required fields:", transactionData);
      return { success: false, error: "Missing required fields!" };
    }

    console.log("🔍 [DEBUG] Checking for duplicate transaction_hash:", transaction_hash);

    // ✅ Check if `transaction_hash` already exists to prevent duplicates
    const { data: existingTransaction, error: fetchError } = await supabase
      .from("pending_manufacturers") // Table name
      .select("id") // Selecting only the ID to check existence
      .eq("transaction_hash", transaction_hash)
      .single();

    console.log("🔍 [DEBUG] Duplicate Check Response:", existingTransaction, fetchError);

    // 🚨 If an error occurs during duplicate check, log and return error
    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("❌ [ERROR] Failed to check existing transactions:", fetchError);
      return { success: false, error: "Database lookup error!" };
    }

    // 🚨 If transaction already exists, warn and return error
    if (existingTransaction) {
      console.warn("⚠️ [WARNING] Transaction already exists:", transaction_hash);
      return { success: false, error: "Duplicate transaction detected!" };
    }

    console.log("🚀 [DEBUG] Proceeding to insert data into 'pending_manufacturers' table...");

    // ✅ Insert transaction data into database
    const { data, error } = await supabase
      .from("pending_manufacturers") // Table Name
      .insert([
        {
          license_number: license_number, // ✅ Maps to "license_number" column
          wallet_address: wallet_address, // ✅ Maps to "wallet_address" column
          status: status, // ✅ Maps to "status" column
          transaction_hash: transaction_hash, // ✅ Maps to "transaction_hash" column
          created_at: new Date().toISOString(), // ✅ Ensures correct timestamp format
        },
      ])
      .select(); // ✅ Forces Supabase to return inserted rows for debugging

    console.log("🔍 [DEBUG] Insert Response:", data, error);

    // 🚨 Handle potential insertion error
    if (error) {
      console.error("❌ [ERROR] Supabase Insert Failed:", error);
      return { success: false, error: "Database insertion failed!" };
    }

    console.log("✅ [SUCCESS] Data inserted into database:", data);
    return { success: true, data };

  } catch (error) {
    console.error("❌ [ERROR] Database Transaction Failed:", error);
    return { success: false, error: "Failed to store data in the database." };
  }
}

export default insertTransaction;
