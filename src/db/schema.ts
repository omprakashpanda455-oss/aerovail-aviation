import { pgTable, serial, text, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const charterEnquiries = pgTable("charter_enquiries", {
  id: serial("id").primaryKey(),
  referenceId: text("reference_id").notNull().unique(),
  tripType: text("trip_type").notNull().default("one_way"), // one_way, round_trip, multi_leg
  departureCity: text("departure_city").notNull(),
  departureCode: text("departure_code").default(""),
  destinationCity: text("destination_city").notNull(),
  destinationCode: text("destination_code").default(""),
  departureDate: text("departure_date").notNull(),
  departureTime: text("departure_time").default("Flexible / Daylight"),
  returnDate: text("return_date"),
  returnTime: text("return_time"),
  multiLegDetails: jsonb("multi_leg_details"),
  passengerCount: integer("passenger_count").notNull().default(1),
  aircraftCategory: text("aircraft_category").notNull().default("recommend_best"),
  serviceType: text("service_type").notNull().default("private_jet"), // private_jet, helicopter, empty_leg, aircraft_sales, general_charter
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  countryCode: text("country_code").default("+91"),
  specialRequests: text("special_requests"),
  groundTransportRequired: boolean("ground_transport_required").default(false),
  customCateringRequired: boolean("custom_catering_required").default(false),
  petOnBoard: boolean("pet_on_board").default(false),
  estimatedBudget: text("estimated_budget"),
  currency: text("currency").default("INR"),
  status: text("status").notNull().default("pending_review"), // pending_review, sourcing_operators, quote_prepared, client_review, confirmed, completed, archived
  adminNotes: text("admin_notes"),
  quotedAmount: text("quoted_amount"),
  recommendedAircraft: text("recommended_aircraft"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const emptyLegAlerts = pgTable("empty_leg_alerts", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  email: text("email").notNull(),
  phone: text("phone"),
  preferredRoutes: text("preferred_routes"), // e.g. "Mumbai to Dubai, Delhi to London"
  preferredCategory: text("preferred_category").default("all"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  serviceInterest: text("service_interest").default("General Enquiry"),
  status: text("status").notNull().default("unread"), // unread, in_progress, responded
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const curatedEmptyLegs = pgTable("curated_empty_legs", {
  id: serial("id").primaryKey(),
  flightCode: text("flight_code").notNull().unique(),
  originCity: text("origin_city").notNull(),
  originCode: text("origin_code").notNull(),
  originCountry: text("origin_country").notNull(),
  destinationCity: text("destination_city").notNull(),
  destinationCode: text("destination_code").notNull(),
  destinationCountry: text("destination_country").notNull(),
  aircraftType: text("aircraft_type").notNull(),
  aircraftCategory: text("aircraft_category").notNull(),
  passengerCapacity: integer("passenger_capacity").notNull(),
  departureWindow: text("departure_window").notNull(),
  estimatedDuration: text("estimated_duration").notNull(),
  indicativePriceInr: integer("indicative_price_inr").notNull(),
  indicativePriceUsd: integer("indicative_price_usd").notNull(),
  regularPriceUsd: integer("regular_price_usd").notNull(),
  discountPct: integer("discount_pct").notNull(),
  availableSeats: integer("available_seats").notNull(),
  status: text("status").notNull().default("available"), // available, under_offer, booked
  operatorNote: text("operator_note"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type CharterEnquiry = typeof charterEnquiries.$inferSelect;
export type NewCharterEnquiry = typeof charterEnquiries.$inferInsert;
export type EmptyLegAlert = typeof emptyLegAlerts.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type CuratedEmptyLeg = typeof curatedEmptyLegs.$inferSelect;
