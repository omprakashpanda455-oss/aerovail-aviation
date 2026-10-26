import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { charterEnquiries, contactMessages, emptyLegAlerts, curatedEmptyLegs } from "@/db/schema";
import { desc, sql } from "drizzle-orm";

export async function GET() {
  try {
    const enquiries = await db
      .select()
      .from(charterEnquiries)
      .orderBy(desc(charterEnquiries.createdAt))
      .limit(50);

    const contacts = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(50);

    const alerts = await db
      .select()
      .from(emptyLegAlerts)
      .orderBy(desc(emptyLegAlerts.createdAt))
      .limit(50);

    const emptyLegs = await db
      .select()
      .from(curatedEmptyLegs)
      .orderBy(desc(curatedEmptyLegs.createdAt));

    const totalEnquiries = enquiries.length;
    const pendingEnquiries = enquiries.filter((e) => e.status === "pending_review").length;
    const confirmedEnquiries = enquiries.filter((e) => e.status === "confirmed").length;

    return NextResponse.json({
      stats: {
        totalEnquiries,
        pendingEnquiries,
        confirmedEnquiries,
        totalContacts: contacts.length,
        totalSubscribers: alerts.length,
        activeEmptyLegs: emptyLegs.length,
      },
      enquiries,
      contacts,
      alerts,
      emptyLegs,
    });
  } catch (error: unknown) {
    console.error("Admin API error:", error);
    return NextResponse.json({ error: "Failed to load dashboard data" }, { status: 500 });
  }
}
