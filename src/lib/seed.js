const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  console.log("Seeding initial data...");

  const legs = [
    {
      flight_code: "ARV-EL-8812",
      origin_city: "Mumbai",
      origin_code: "BOM",
      origin_country: "India",
      destination_city: "Dubai (DWC)",
      destination_code: "DXB",
      destination_country: "UAE",
      aircraft_type: "Bombardier Challenger 605",
      aircraft_category: "Super-Midsize Jet",
      passenger_capacity: 10,
      departure_window: "Flexible (Next 48–72h)",
      estimated_duration: "3h 20m",
      indicative_price_inr: 1650000,
      indicative_price_usd: 19800,
      regular_price_usd: 38500,
      discount_pct: 48,
      available_seats: 10,
      status: "available",
      operator_note: "Full aircraft charter. VIP catering and Kalina GA terminal handling included.",
    },
    {
      flight_code: "ARV-EL-7104",
      origin_city: "New Delhi",
      origin_code: "DEL",
      origin_country: "India",
      destination_city: "London (Farnborough)",
      destination_code: "FAB",
      destination_country: "United Kingdom",
      aircraft_type: "Gulfstream G550",
      aircraft_category: "Heavy / Ultra Long Range",
      passenger_capacity: 14,
      departure_window: "Within 4 Days",
      estimated_duration: "8h 40m",
      indicative_price_inr: 4950000,
      indicative_price_usd: 59500,
      regular_price_usd: 112000,
      discount_pct: 47,
      available_seats: 14,
      status: "available",
      operator_note: "Direct nonstop repositioning. Multi-zone stateroom with bedroom configuration.",
    },
    {
      flight_code: "ARV-EL-5420",
      origin_city: "Bengaluru",
      origin_code: "BLR",
      origin_country: "India",
      destination_city: "Male",
      destination_code: "MLE",
      destination_country: "Maldives",
      aircraft_type: "Embraer Praetor 600",
      aircraft_category: "Super-Midsize Jet",
      passenger_capacity: 9,
      departure_window: "This Weekend",
      estimated_duration: "2h 05m",
      indicative_price_inr: 1280000,
      indicative_price_usd: 15400,
      regular_price_usd: 28000,
      discount_pct: 45,
      available_seats: 9,
      status: "available",
      operator_note: "Direct reposition to Velana VIP terminal. Ideal for private island connection.",
    },
    {
      flight_code: "ARV-EL-3918",
      origin_city: "New Delhi",
      origin_code: "DEL",
      origin_country: "India",
      destination_city: "Goa (Mopa)",
      destination_code: "GOI",
      destination_country: "India",
      aircraft_type: "Cessna Citation CJ4",
      aircraft_category: "Light Jet",
      passenger_capacity: 7,
      departure_window: "Tomorrow Morning",
      estimated_duration: "2h 15m",
      indicative_price_inr: 680000,
      indicative_price_usd: 8200,
      regular_price_usd: 14500,
      discount_pct: 43,
      available_seats: 7,
      status: "available",
      operator_note: "Repositioning flight from Indira Gandhi GA apron to Goa Mopa VIP enclave.",
    },
    {
      flight_code: "ARV-EL-2041",
      origin_city: "Mumbai",
      origin_code: "BOM",
      origin_country: "India",
      destination_city: "Udaipur",
      destination_code: "UDR",
      destination_country: "India",
      aircraft_type: "Beechcraft King Air 350i",
      aircraft_category: "Executive Turboprop",
      passenger_capacity: 8,
      departure_window: "Flexible / Next 3 Days",
      estimated_duration: "1h 15m",
      indicative_price_inr: 390000,
      indicative_price_usd: 4700,
      regular_price_usd: 8500,
      discount_pct: 44,
      available_seats: 8,
      status: "available",
      operator_note: "Direct luxury turboprop repositioning. Fast boarding at Kalina Terminal.",
    },
    {
      flight_code: "ARV-EL-6299",
      origin_city: "Singapore",
      origin_code: "XSP",
      origin_country: "Singapore",
      destination_city: "Chennai",
      destination_code: "MAA",
      destination_country: "India",
      aircraft_type: "Dassault Falcon 2000LXS",
      aircraft_category: "Heavy Jet",
      passenger_capacity: 10,
      departure_window: "Within 5 Days",
      estimated_duration: "3h 50m",
      indicative_price_inr: 2150000,
      indicative_price_usd: 25800,
      regular_price_usd: 48000,
      discount_pct: 46,
      available_seats: 10,
      status: "available",
      operator_note: "Return leg from Seletar Executive Airport. High-speed Ka-band Wi-Fi enabled.",
    },
  ];

  for (const leg of legs) {
    await pool.query(
      `INSERT INTO curated_empty_legs 
      (flight_code, origin_city, origin_code, origin_country, destination_city, destination_code, destination_country, aircraft_type, aircraft_category, passenger_capacity, departure_window, estimated_duration, indicative_price_inr, indicative_price_usd, regular_price_usd, discount_pct, available_seats, status, operator_note)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      ON CONFLICT (flight_code) DO NOTHING`,
      [
        leg.flight_code,
        leg.origin_city,
        leg.origin_code,
        leg.origin_country,
        leg.destination_city,
        leg.destination_code,
        leg.destination_country,
        leg.aircraft_type,
        leg.aircraft_category,
        leg.passenger_capacity,
        leg.departure_window,
        leg.estimated_duration,
        leg.indicative_price_inr,
        leg.indicative_price_usd,
        leg.regular_price_usd,
        leg.discount_pct,
        leg.available_seats,
        leg.status,
        leg.operator_note,
      ]
    );
  }

  // Sample enquiry for quote tracking demo
  await pool.query(
    `INSERT INTO charter_enquiries
    (reference_id, trip_type, departure_city, departure_code, destination_city, destination_code, departure_date, departure_time, passenger_count, aircraft_category, service_type, full_name, email, phone, country_code, special_requests, status, admin_notes, quoted_amount)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    ON CONFLICT (reference_id) DO NOTHING`,
    [
      "ARV-2026-X8K21",
      "round_trip",
      "Mumbai (BOM)",
      "BOM",
      "Dubai (DXB)",
      "DXB",
      "2026-11-15",
      "Morning (08:00 - 12:00)",
      6,
      "midsize_jet",
      "private_jet",
      "Siddharth Singhania",
      "siddharth@singhania-sample.com",
      "9820012345",
      "+91",
      "VIP tarmac vehicle escort requested at Kalina GA Terminal and Al Maktoum Executive DWC.",
      "quote_prepared",
      "Bombardier Challenger 3500 proposed. Sourced from certified operator.",
      "₹ 19,20,000 + Taxes",
    ]
  );

  console.log("Seeding complete.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
