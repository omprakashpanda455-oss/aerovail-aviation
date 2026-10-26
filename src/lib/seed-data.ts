import { db } from "@/db";
import { curatedEmptyLegs, charterEnquiries } from "@/db/schema";
import { sql } from "drizzle-orm";

export const INITIAL_EMPTY_LEGS = [
  {
    flightCode: "ARV-EL-8812",
    originCity: "Mumbai",
    originCode: "BOM",
    originCountry: "India",
    destinationCity: "Dubai (DWC)",
    destinationCode: "DXB",
    destinationCountry: "UAE",
    aircraftType: "Bombardier Challenger 605",
    aircraftCategory: "Super-Midsize Jet",
    passengerCapacity: 10,
    departureWindow: "Flexible (Next 48–72h)",
    estimatedDuration: "3h 20m",
    indicativePriceInr: 1650000,
    indicativePriceUsd: 19800,
    regularPriceUsd: 38500,
    discountPct: 48,
    availableSeats: 10,
    status: "available",
    operatorNote: "Full aircraft charter. VIP catering and Kalina GA terminal handling included.",
  },
  {
    flightCode: "ARV-EL-7104",
    originCity: "New Delhi",
    originCode: "DEL",
    originCountry: "India",
    destinationCity: "London (Farnborough)",
    destinationCode: "FAB",
    destinationCountry: "United Kingdom",
    aircraftType: "Gulfstream G550",
    aircraftCategory: "Heavy / Ultra Long Range",
    passengerCapacity: 14,
    departureWindow: "Within 4 Days",
    estimatedDuration: "8h 40m",
    indicativePriceInr: 4950000,
    indicativePriceUsd: 59500,
    regularPriceUsd: 112000,
    discountPct: 47,
    availableSeats: 14,
    status: "available",
    operatorNote: "Direct nonstop repositioning. Multi-zone stateroom with bedroom configuration.",
  },
  {
    flightCode: "ARV-EL-5420",
    originCity: "Bengaluru",
    originCode: "BLR",
    originCountry: "India",
    destinationCity: "Male",
    destinationCode: "MLE",
    destinationCountry: "Maldives",
    aircraftType: "Embraer Praetor 600",
    aircraftCategory: "Super-Midsize Jet",
    passengerCapacity: 9,
    departureWindow: "This Weekend",
    estimatedDuration: "2h 05m",
    indicativePriceInr: 1280000,
    indicativePriceUsd: 15400,
    regularPriceUsd: 28000,
    discountPct: 45,
    availableSeats: 9,
    status: "available",
    operatorNote: "Direct reposition to Velana VIP terminal. Ideal for private island connection.",
  },
  {
    flightCode: "ARV-EL-3918",
    originCity: "New Delhi",
    originCode: "DEL",
    originCountry: "India",
    destinationCity: "Goa (Mopa)",
    destinationCode: "GOI",
    destinationCountry: "India",
    aircraftType: "Cessna Citation CJ4",
    aircraftCategory: "Light Jet",
    passengerCapacity: 7,
    departureWindow: "Tomorrow Morning",
    estimatedDuration: "2h 15m",
    indicativePriceInr: 680000,
    indicativePriceUsd: 8200,
    regularPriceUsd: 14500,
    discountPct: 43,
    availableSeats: 7,
    status: "available",
    operatorNote: "Repositioning flight from Indira Gandhi GA apron to Goa Mopa VIP enclave.",
  },
  {
    flightCode: "ARV-EL-2041",
    originCity: "Mumbai",
    originCode: "BOM",
    originCountry: "India",
    destinationCity: "Udaipur",
    destinationCode: "UDR",
    destinationCountry: "India",
    aircraftType: "Beechcraft King Air 350i",
    aircraftCategory: "Executive Turboprop",
    passengerCapacity: 8,
    departureWindow: "Flexible / Next 3 Days",
    estimatedDuration: "1h 15m",
    indicativePriceInr: 390000,
    indicativePriceUsd: 4700,
    regularPriceUsd: 8500,
    discountPct: 44,
    availableSeats: 8,
    status: "available",
    operatorNote: "Direct luxury turboprop repositioning. Fast boarding at Kalina Terminal.",
  },
  {
    flightCode: "ARV-EL-6299",
    originCity: "Singapore",
    originCode: "XSP",
    originCountry: "Singapore",
    destinationCity: "Chennai",
    destinationCode: "MAA",
    destinationCountry: "India",
    aircraftType: "Dassault Falcon 2000LXS",
    aircraftCategory: "Heavy Jet",
    passengerCapacity: 10,
    departureWindow: "Within 5 Days",
    estimatedDuration: "3h 50m",
    indicativePriceInr: 2150000,
    indicativePriceUsd: 25800,
    regularPriceUsd: 48000,
    discountPct: 46,
    availableSeats: 10,
    status: "available",
    operatorNote: "Return leg from Seletar Executive Airport. High-speed Ka-band Wi-Fi enabled.",
  },
];

export async function ensureDatabaseSeeded() {
  try {
    // Check if table exists by querying
    const countResult = await db.select({ count: sql<number>`count(*)` }).from(curatedEmptyLegs);
    const count = Number(countResult[0]?.count ?? 0);

    if (count === 0) {
      for (const item of INITIAL_EMPTY_LEGS) {
        await db.insert(curatedEmptyLegs).values(item).onConflictDoNothing();
      }
    }
  } catch (error) {
    // Table might not be pushed yet during initial build phase
    console.warn("DB seed notice:", error);
  }
}
