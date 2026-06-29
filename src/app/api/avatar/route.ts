import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64 } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    // Extract the base64 string, ignoring the data URI prefix if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Write to public/profile.jpg
    const filePath = path.join(process.cwd(), "public", "profile.jpg");
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ success: true, message: "Avatar saved successfully" });
  } catch (error) {
    console.error("Failed to save avatar:", error);
    return NextResponse.json(
      { error: "Failed to save avatar" },
      { status: 500 }
    );
  }
}
