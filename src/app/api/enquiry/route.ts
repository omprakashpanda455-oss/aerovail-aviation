import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { charterEnquiries } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

function generateReferenceId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 5; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ARV-${new Date().getFullYear()}-${randomPart}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      tripType = "one_way",
      departureCity,
      departureCode = "",
      destinationCity,
      destinationCode = "",
      departureDate,
      departureTime = "Flexible / Daylight",
      returnDate,
      returnTime,
      multiLegDetails,
      passengerCount = 1,
      aircraftCategory = "recommend_best",
      serviceType = "private_jet",
      fullName,
      email,
      phone,
      countryCode = "+91",
      specialRequests = "",
      groundTransportRequired = false,
      customCateringRequired = false,
      petOnBoard = false,
      estimatedBudget = "",
      currency = "INR",
    } = body;

    // Validate required fields
    if (!departureCity || !destinationCity || !departureDate || !fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Please provide all required fields (Departure, Destination, Date, Name, Email, and Phone)." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const referenceId = generateReferenceId();

    const [enquiry] = await db
      .insert(charterEnquiries)
      .values({
        referenceId,
        tripType,
        departureCity: departureCity.trim(),
        departureCode: departureCode.trim().toUpperCase(),
        destinationCity: destinationCity.trim(),
        destinationCode: destinationCode.trim().toUpperCase(),
        departureDate,
        departureTime,
        returnDate: returnDate || null,
        returnTime: returnTime || null,
        multiLegDetails: multiLegDetails || null,
        passengerCount: Math.max(1, parseInt(passengerCount, 10) || 1),
        aircraftCategory,
        serviceType,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        countryCode,
        specialRequests: specialRequests.trim(),
        groundTransportRequired: Boolean(groundTransportRequired),
        customCateringRequired: Boolean(customCateringRequired),
        petOnBoard: Boolean(petOnBoard),
        estimatedBudget: estimatedBudget ? String(estimatedBudget).trim() : null,
        currency,
        status: "pending_review",
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: "Your charter quote request has been securely submitted to the Aerovail Aviation Flight Operations Desk.",
        referenceId: enquiry.referenceId,
        enquiry: {
          id: enquiry.id,
          referenceId: enquiry.referenceId,
          departureCity: enquiry.departureCity,
          destinationCity: enquiry.destinationCity,
          departureDate: enquiry.departureDate,
          returnDate: enquiry.returnDate,
          passengerCount: enquiry.passengerCount,
          aircraftCategory: enquiry.aircraftCategory,
          tripType: enquiry.tripType,
          status: enquiry.status,
          createdAt: enquiry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating charter enquiry:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");

    if (ref) {
      const [item] = await db
        .select()
        .from(charterEnquiries)
        .where(eq(charterEnquiries.referenceId, ref.trim().toUpperCase()));

      if (!item) {
        return NextResponse.json({ error: "Charter enquiry reference not found" }, { status: 404 });
      }
      return NextResponse.json({ enquiry: item });
    }

    const enquiries = await db
      .select()
      .from(charterEnquiries)
      .orderBy(desc(charterEnquiries.createdAt))
      .limit(100);

    return NextResponse.json({ enquiries });
  } catch (error: unknown) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}
