import { NextResponse } from "next/server";
import jsQR from "jsqr";

export async function POST(req) {
  try {
    const { image } = await req.json();
    const buffer = Buffer.from(image.split(",")[1], "base64");

    // Decode QR Code
    const qrCode = jsQR(new Uint8ClampedArray(buffer), 300, 300); // Adjust dimensions accordingly
    return NextResponse.json({ text: qrCode?.data || "QR code not readable" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to decode QR Code" }, { status: 400 });
  }
}