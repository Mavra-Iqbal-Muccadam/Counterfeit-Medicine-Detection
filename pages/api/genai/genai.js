import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, dosage_form, expiry_date } = req.body; // Accept dynamic values

    if (!name || !dosage_form || !expiry_date) {
      return res.status(400).json({ error: "All fields (name, dosage_form, expiry_date) are required" });
    }

    // Construct dynamic prompt
    const prompt = `Tell me whether this medicine is valid or not based on info: Name = "${name}", Dosage Form = "${dosage_form}", Expiry Date = "${expiry_date}". 
    Gives answer in one word, Yes/No. Please only one word.`;

    // Call OpenRouter API (Qwen AI)
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen-2-7b-instruct:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 5, // Only need a one-word answer
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let aiResponse = response.data.choices?.[0]?.message?.content.trim() || "No response";

    return res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("Error fetching response:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
