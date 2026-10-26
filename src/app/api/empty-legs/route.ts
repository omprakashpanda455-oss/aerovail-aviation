import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { curatedEmptyLegs, emptyLegAlerts } from "@/db/schema";
import { ensureDatabaseSeeded } from "@/lib/seed-data";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    await ensureDatabaseSeeded();

    const emptyLegs = await db
      .select()
      .from(curatedEmptyLegs)
      .where(eq(curatedEmptyLegs.status, "available"))
      .orderBy(desc(curatedEmptyLegs.createdAt));

    return NextResponse.json({ emptyLegs });
  } catch (error: unknown) {
    console.error("Error fetching empty legs:", error);
    return NextResponse.json({ error: "Failed to fetch empty leg opportunities" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName = "", email, phone = "", preferredRoutes = "", preferredCategory = "all" } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required to join the Empty-Leg Priority Desk." }, { status: 400 });
    }

    const [alert] = await db
      .insert(emptyLegAlerts)
      .values({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        preferredRoutes: preferredRoutes.trim(),
        preferredCategory,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: "You have been registered for private empty-leg priority notifications.",
        alert,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error registering alert:", error);
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
