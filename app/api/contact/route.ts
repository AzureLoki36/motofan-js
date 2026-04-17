import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const MESSAGES_FILE = path.join(process.cwd(), "wiadomosci.json");

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: "Brak wymaganych pól." },
        { status: 400 }
      );
    }

    const now = new Date();
    data.timestamp = now.toISOString();
    data.dateFormatted = now.toLocaleString("pl-PL");

    let messages: unknown[] = [];
    try {
      const fileContent = await fs.readFile(MESSAGES_FILE, "utf-8");
      if (fileContent.trim()) {
        messages = JSON.parse(fileContent);
      }
    } catch {
      // File doesn't exist yet — start fresh
    }

    messages.push(data);
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Wiadomość została zapisana.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Błąd przetwarzania danych." },
      { status: 400 }
    );
  }
}
