import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone = "", subject, message, serviceInterest = "General Enquiry" } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill out all mandatory fields (Name, Email, Subject, and Message)." },
        { status: 400 }
      );
    }

    const [saved] = await db
      .insert(contactMessages)
      .values({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
        serviceInterest,
        status: "unread",
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received by our Aviation Advisory team. We will respond promptly.",
        contactId: saved.id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating contact message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(50);

    return NextResponse.json({ messages });
  } catch (error: unknown) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json({ error: "Failed to retrieve messages" }, { status: 500 });
  }
}
