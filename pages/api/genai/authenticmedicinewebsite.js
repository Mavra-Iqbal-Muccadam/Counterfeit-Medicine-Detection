import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { website } = req.body;
  if (!website) {
    return res.status(400).json({ message: 'Website URL is required' });
  }

  try {
    console.log(`🔍 Scraping: ${website}`);

    let pageContent = '';

    // 🚀 Use Cheerio for fast scraping
    try {
      const { data } = await axios.get(website, {
        headers: {
          "User-Agent": "Mozilla/5.0", // Prevents 403 errors on some sites
        },
        timeout: 5000, // ⏳ Timeout after 5 seconds if the website is unreachable
      });

      const $ = cheerio.load(data);
      pageContent = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 5000); // Clean text & limit size

      if (!pageContent) {
        throw new Error("Empty website content");
      }
    } catch (cheerioError) {
      console.error('❌ Website Unreachable or Not Found:', cheerioError.message);
      return res.status(404).json({
        message: 'Website is unreachable or does not exist.',
        error: cheerioError.message,
      });
    }

    console.log(`📄 Extracted Content: ${pageContent.substring(0, 500)}...`); // Debug

    // 🔥 Send Content to Qwen AI (via OpenRouter API)
    const prompt = `Analyze this website content and determine the probability (in percentage) that this website belongs to a legitimate medicine manufacturer. Only return a percentage value as an integer between 0 and 100. Do not include any words, just the number. Content: ${pageContent}`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen-2-7b-instruct:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 5, // Expecting a single percentage value
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let probability = response.data.choices[0]?.message?.content?.trim();

    // ✅ Extract only a number
    const probabilityMatch = probability.match(/\d+/);
    probability = probabilityMatch ? probabilityMatch[0] : "Unknown"; // Default to "Unknown" if no number found

    console.log(`✅ Qwen AI Probability Score: ${probability}`);

    res.status(200).json({
      website,
      probability,
      message: `${probability}%`,
    });

  } catch (error) {
    console.error('❌ Server Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
