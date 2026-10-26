export interface AircraftCategoryInfo {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  passengers: string;
  rangeNm: number;
  rangeKm: number;
  flightHours: string;
  cruisingSpeed: string;
  cabinHeight: string;
  baggageCapacity: string;
  representativeModels: string[];
  bestSuitedFor: string[];
  popularRoutes: { from: string; to: string; time: string }[];
  image: string;
  description: string;
}

export const AIRCRAFT_CATEGORIES: AircraftCategoryInfo[] = [
  {
    id: "turboprop",
    name: "Executive Turboprop",
    badge: "Regional & Short Runway Specialist",
    tagline: "Unmatched regional agility, cost efficiency, and access to remote Indian airfields.",
    passengers: "4 – 8 Passengers",
    rangeNm: 1500,
    rangeKm: 2780,
    flightHours: "Up to 3.5 Hours",
    cruisingSpeed: "520 km/h (280 kts)",
    cabinHeight: "1.45 m (4.8 ft)",
    baggageCapacity: "5 - 7 Suitcases (55 cu ft)",
    representativeModels: ["Beechcraft King Air 250 / 350i", "Pilatus PC-12 NGX", "Piaggio Avanti EVO"],
    bestSuitedFor: [
      "Accessing shorter runways and regional non-metro airstrips",
      "Short intercity business shuttles across India (e.g., Delhi–Jaipur, Mumbai–Surat)",
      "High-efficiency executive travel with minimal runway requirements",
    ],
    popularRoutes: [
      { from: "New Delhi (DEL)", to: "Jaipur (JAI)", time: "45 mins" },
      { from: "Mumbai (BOM)", to: "Pune (PNQ)", time: "30 mins" },
      { from: "Bengaluru (BLR)", to: "Goa (GOI)", time: "1h 10m" },
    ],
    image: "https://images.pexels.com/photos/32346742/pexels-photo-32346742.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description:
      "Turboprops offer tremendous flexibility across India's domestic landscape, operating comfortably out of high-elevation, regional, and short-strip airfields while maintaining executive cabin refinement.",
  },
  {
    id: "light_jet",
    name: "Light Jet",
    badge: "Swift Domestic & Regional Express",
    tagline: "Speed, comfort, and direct nonstop access between all major Indian metros.",
    passengers: "4 – 7 Passengers",
    rangeNm: 1950,
    rangeKm: 3600,
    flightHours: "Up to 3.5 – 4.0 Hours",
    cruisingSpeed: "790 km/h (425 kts)",
    cabinHeight: "1.50 m (4.9 ft)",
    baggageCapacity: "6 - 8 Suitcases (65 cu ft)",
    representativeModels: ["Embraer Phenom 300E", "Cessna Citation CJ4 Gen2", "Learjet 75 Liberty"],
    bestSuitedFor: [
      "Rapid same-day roundtrips between key financial hubs",
      "Leisure getaways to Goa, Udaipur, and Sri Lanka",
      "Small executive teams requiring seamless private terminal transfers",
    ],
    popularRoutes: [
      { from: "Mumbai (BOM)", to: "New Delhi (DEL)", time: "1h 45m" },
      { from: "Bengaluru (BLR)", to: "Mumbai (BOM)", time: "1h 25m" },
      { from: "New Delhi (DEL)", to: "Udaipur (UDR)", time: "1h 05m" },
    ],
    image: "https://images.pexels.com/photos/40222457/pexels-photo-40222457.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description:
      "Light jets combine jet-speed performance with runway accessibility, making them the preferred choice for rapid inter-city travel across the Indian subcontinent.",
  },
  {
    id: "midsize_jet",
    name: "Midsize & Super-Midsize Jet",
    badge: "Cross-Subcontinent & Middle East Reach",
    tagline: "Stand-up cabin comfort, generous luggage space, and nonstop international range.",
    passengers: "8 – 10 Passengers",
    rangeNm: 3400,
    rangeKm: 6300,
    flightHours: "Up to 6.5 – 7.5 Hours",
    cruisingSpeed: "860 km/h (465 kts)",
    cabinHeight: "1.78 m (5.8 ft) Stand-up",
    baggageCapacity: "10 - 14 Suitcases (120 cu ft)",
    representativeModels: ["Bombardier Challenger 3500", "Cessna Citation Latitude / Longitude", "Embraer Praetor 600", "Hawker 900XP"],
    bestSuitedFor: [
      "Nonstop flights from India to Dubai, Abu Dhabi, Doha, and Singapore",
      "Full stand-up cabin movement and enclosed lavatory comfort",
      "Family vacation charters with substantial luggage requirements",
    ],
    popularRoutes: [
      { from: "Mumbai (BOM)", to: "Dubai (DXB)", time: "3h 15m" },
      { from: "New Delhi (DEL)", to: "Singapore (XSP)", time: "5h 20m" },
      { from: "Bengaluru (BLR)", to: "Male (MLE)", time: "2h 00m" },
    ],
    image: "/images/hero-jet.jpg",
    description:
      "Midsize and Super-Midsize aircraft deliver true intercontinental performance, spacious stand-up cabins, high-speed Wi-Fi capability, and generous luggage bays for discerning business delegations.",
  },
  {
    id: "heavy_jet",
    name: "Heavy & Ultra Long Range Jet",
    badge: "Global Intercontinental Flagship",
    tagline: "Uncompromised luxury, multi-zone staterooms, and worldwide non-stop range.",
    passengers: "12 – 16 Passengers",
    rangeNm: 7500,
    rangeKm: 13900,
    flightHours: "Up to 14 – 16 Hours Nonstop",
    cruisingSpeed: "920 km/h (495 kts)",
    cabinHeight: "1.91 m (6.25 ft) Full Stand-up",
    baggageCapacity: "18 - 25 Suitcases (195 cu ft)",
    representativeModels: ["Gulfstream G650ER / G700", "Bombardier Global 7500", "Dassault Falcon 8X", "Challenger 650"],
    bestSuitedFor: [
      "Nonstop intercontinental journeys: India to London, New York, Zurich, or Tokyo",
      "Dedicated sleeping zones, master bedrooms, and full-service galleys",
      "State dignitaries, corporate leadership summits, and VIP delegations",
    ],
    popularRoutes: [
      { from: "New Delhi (DEL)", to: "London (FAB)", time: "8h 45m" },
      { from: "Mumbai (BOM)", to: "Paris (LFPB)", time: "9h 10m" },
      { from: "Bengaluru (BLR)", to: "Geneva (GVA)", time: "9h 30m" },
    ],
    image: "/images/jet-interior.jpg",
    description:
      "The pinnacle of private aviation. Offering whisper-quiet acoustic soundproofing, circadian lighting, full private staterooms, and intercontinental range connecting India directly with global capitals.",
  },
  {
    id: "vip_helicopter",
    name: "Twin-Engine VIP Helicopter",
    badge: "Urban Transfers & Point-to-Point Precision",
    tagline: "Bypass traffic, land at certified private helipads, luxury resorts, and high-altitude locations.",
    passengers: "4 – 6 Passengers",
    rangeNm: 420,
    rangeKm: 780,
    flightHours: "Up to 2.5 Hours",
    cruisingSpeed: "260 km/h (140 kts)",
    cabinHeight: "1.30 m Executive Cabin",
    baggageCapacity: "4 - 5 Soft Bags (40 cu ft)",
    representativeModels: ["AgustaWestland AW109 / AW139", "Bell 429 GlobalRanger", "Airbus H145 / H130"],
    bestSuitedFor: [
      "Helipad-to-helipad city transfers (e.g. Mumbai rooftop / Mahalaxmi to Pune)",
      "Luxury resort & vineyard arrivals in Goa, Rajasthan, and Coorg",
      "Pilgrimage access and remote Himalayan destinations",
    ],
    popularRoutes: [
      { from: "Mumbai (Juhu/Mahalaxmi)", to: "Pune Helipad", time: "28 mins" },
      { from: "New Delhi (Rohini Heliport)", to: "Jaipur Resort", time: "55 mins" },
      { from: "Dehradun (DED)", to: "Kedarnath / Badrinath", time: "35 mins" },
    ],
    image: "/images/vip-helicopter.jpg",
    description:
      "Twin-engine executive helicopters provide the ultimate luxury of time, delivering discreet door-to-door transit between city helipads, industrial estates, remote estates, and private resorts.",
  },
];
