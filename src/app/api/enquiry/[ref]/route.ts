import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { charterEnquiries } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await params;
    if (!ref) {
      return NextResponse.json({ error: "Reference ID is required" }, { status: 400 });
    }

    const [item] = await db
      .select()
      .from(charterEnquiries)
      .where(eq(charterEnquiries.referenceId, ref.trim().toUpperCase()));

    if (!item) {
      return NextResponse.json({ error: "Enquiry reference not found" }, { status: 404 });
    }

    return NextResponse.json({ enquiry: item });
  } catch (error: unknown) {
    console.error("Error looking up reference:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await params;
    const body = await req.json();

    const { status, adminNotes, quotedAmount, recommendedAircraft } = body;

    const [updated] = await db
      .update(charterEnquiries)
      .set({
        ...(status && { status }),
        ...(adminNotes !== undefined && { adminNotes }),
        ...(quotedAmount !== undefined && { quotedAmount }),
        ...(recommendedAircraft !== undefined && { recommendedAircraft }),
        updatedAt: new Date(),
      })
      .where(eq(charterEnquiries.referenceId, ref.trim().toUpperCase()))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error: unknown) {
    console.error("Error updating enquiry:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
