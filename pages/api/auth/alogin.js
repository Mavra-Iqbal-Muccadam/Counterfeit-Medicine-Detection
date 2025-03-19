import { supabase } from '../../../lib/supabaseClientservice';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // Query the database to check if the email and password match an admin record
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .eq("role", "admin")
      .single();

    if (error) {
      // Handle Supabase-specific errors
      if (error.code === "PGRST116") {
        return res.status(404).json({ message: "Invalid email or password" });
      }
      throw error;
    }

    if (!data) {
      // If no matching record is found
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // If login is successful
    return res.status(200).json({ message: "Login successful", user: data });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "An error occurred. Please try again" });
  }
}


// Example login function
const handleLogin = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Store the admin's email in local storage
    localStorage.setItem("adminEmail", email);

    // Redirect to the admin dashboard
    window.location.href = "/admin";
  } catch (error) {
    console.error("Login error:", error.message);
  }
};