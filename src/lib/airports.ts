export interface Airport {
  city: string;
  code: string;
  icao: string;
  name: string;
  country: string;
  region: "India" | "Middle East" | "Europe" | "Asia-Pacific" | "Americas";
  lat: number;
  lng: number;
}

export const AIRPORTS: Airport[] = [
  // India Tier 1 & Metros
  { city: "New Delhi", code: "DEL", icao: "VIDP", name: "Indira Gandhi International / General Aviation Terminal", country: "India", region: "India", lat: 28.5562, lng: 77.1000 },
  { city: "Mumbai", code: "BOM", icao: "VABB", name: "Chhatrapati Shivaji Maharaj / Kalina GA Terminal", country: "India", region: "India", lat: 19.0896, lng: 72.8656 },
  { city: "Bengaluru", code: "BLR", icao: "VOBL", name: "Kempegowda International / HAL Airport (Private)", country: "India", region: "India", lat: 13.1986, lng: 77.7066 },
  { city: "Hyderabad", code: "HYD", icao: "VOHS", name: "Rajiv Gandhi International / Begumpet VIP Enclave", country: "India", region: "India", lat: 17.2403, lng: 78.4294 },
  { city: "Chennai", code: "MAA", icao: "VOMM", name: "Chennai International / GA Apron", country: "India", region: "India", lat: 12.9941, lng: 80.1709 },
  { city: "Kolkata", code: "CCU", icao: "VECC", name: "Netaji Subhash Chandra Bose International", country: "India", region: "India", lat: 22.6547, lng: 88.4467 },
  { city: "Ahmedabad", code: "AMD", icao: "VAAH", name: "Sardar Vallabhbhai Patel International", country: "India", region: "India", lat: 23.0772, lng: 72.6347 },
  { city: "Goa (Dabolim / Mopa)", code: "GOI", icao: "VOGO", name: "Manohar International Airport / Dabolim VIP", country: "India", region: "India", lat: 15.3808, lng: 73.8313 },
  { city: "Jaipur", code: "JAI", icao: "VIJP", name: "Jaipur International Airport", country: "India", region: "India", lat: 26.8242, lng: 75.8122 },
  { city: "Udaipur", code: "UDR", icao: "VAUD", name: "Maharana Pratap Airport", country: "India", region: "India", lat: 24.6178, lng: 73.8961 },
  { city: "Kochi", code: "COK", icao: "VOCI", name: "Cochin International Business Jet Terminal", country: "India", region: "India", lat: 10.1518, lng: 76.4019 },
  { city: "Pune", code: "PNQ", icao: "VAPO", name: "Pune Civil Enclave", country: "India", region: "India", lat: 18.5822, lng: 73.9197 },
  { city: "Chandigarh", code: "IXC", icao: "VICG", name: "Shaheed Bhagat Singh International", country: "India", region: "India", lat: 30.6735, lng: 76.7885 },
  { city: "Varanasi", code: "VNS", icao: "VEBN", name: "Lal Bahadur Shastri International", country: "India", region: "India", lat: 25.4524, lng: 82.8593 },
  { city: "Dehradun (Rishikesh/Himalayas)", code: "DED", icao: "VIDN", name: "Jolly Grant Airport", country: "India", region: "India", lat: 30.1897, lng: 78.1803 },
  { city: "Srinagar (Kashmir)", code: "SXR", icao: "VISR", name: "Sheikh ul-Alam International", country: "India", region: "India", lat: 33.9871, lng: 74.7741 },
  { city: "Jodhpur", code: "JDH", icao: "VIJO", name: "Jodhpur Civil Airport", country: "India", region: "India", lat: 26.2511, lng: 73.0489 },
  { city: "Surat", code: "STV", icao: "VASU", name: "Surat International Airport", country: "India", region: "India", lat: 21.1139, lng: 72.7419 },

  // International Key Business & Leisure Jet Hubs
  { city: "Dubai", code: "DXB", icao: "OMDB", name: "Dubai International / Al Maktoum VIP (DWC)", country: "United Arab Emirates", region: "Middle East", lat: 25.2532, lng: 55.3657 },
  { city: "Abu Dhabi", code: "AUH", icao: "OMAA", name: "Al Bateen Executive Airport / Zayed Intl", country: "United Arab Emirates", region: "Middle East", lat: 24.4283, lng: 54.4581 },
  { city: "Doha", code: "DOH", icao: "OTHH", name: "Hamad International / Old Doha FBO", country: "Qatar", region: "Middle East", lat: 25.2731, lng: 51.6081 },
  { city: "Riyadh", code: "RUH", icao: "OERK", name: "King Khalid International Private FBO", country: "Saudi Arabia", region: "Middle East", lat: 24.9576, lng: 46.6988 },
  { city: "London (Farnborough / Luton)", code: "FAB", icao: "EGLF", name: "Farnborough Executive / Luton Signature", country: "United Kingdom", region: "Europe", lat: 51.2758, lng: -0.7763 },
  { city: "Paris (Le Bourget)", code: "LFPB", icao: "LFPB", name: "Paris Le Bourget VIP Terminal", country: "France", region: "Europe", lat: 48.9694, lng: 2.4414 },
  { city: "Geneva", code: "GVA", icao: "LSGG", name: "Geneva Cointrin Executive Terminal", country: "Switzerland", region: "Europe", lat: 46.2381, lng: 6.1089 },
  { city: "Zurich", code: "ZRH", icao: "LSZH", name: "Zurich Airport General Aviation FBO", country: "Switzerland", region: "Europe", lat: 47.4582, lng: 8.5555 },
  { city: "Nice (Cote d'Azur / Monaco)", code: "NCE", icao: "LFMN", name: "Nice Côte d'Azur Business Terminal", country: "France", region: "Europe", lat: 43.6653, lng: 7.2150 },
  { city: "Singapore (Seletar)", code: "XSP", icao: "WSSL", name: "Seletar Executive Airport", country: "Singapore", region: "Asia-Pacific", lat: 1.4169, lng: 103.8650 },
  { city: "Bangkok (Don Mueang VIP)", code: "DMK", icao: "VTBD", name: "Don Mueang Private Jet Terminal (MJets)", country: "Thailand", region: "Asia-Pacific", lat: 13.9126, lng: 100.6068 },
  { city: "Male (Maldives)", code: "MLE", icao: "VRMM", name: "Velana International VIP FBO Terminal", country: "Maldives", region: "Asia-Pacific", lat: 4.1918, lng: 73.5291 },
  { city: "Colombo", code: "CMB", icao: "VCBI", name: "Bandaranaike International / Ratmalana GA", country: "Sri Lanka", region: "Asia-Pacific", lat: 7.1808, lng: 79.8841 },
  { city: "New York (Teterboro)", code: "TEB", icao: "KTEB", name: "Teterboro Executive Airport", country: "United States", region: "Americas", lat: 40.8501, lng: -74.0608 },
];

export function calculateDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function estimateFlightTime(distanceKm: number, category = "midsize"): { hours: number; minutes: number; formatted: string } {
  // Average jet ground speed approx 780-880 km/h + 20 min taxi/climb/descent allowance
  let speedKmH = 800;
  let bufferMins = 20;

  if (category === "turboprop" || category === "helicopter") {
    speedKmH = category === "helicopter" ? 240 : 500;
    bufferMins = 10;
  } else if (category === "light_jet") {
    speedKmH = 720;
  } else if (category === "ultra_long_range" || category === "heavy_jet") {
    speedKmH = 880;
  }

  const rawMinutes = Math.round((distanceKm / speedKmH) * 60) + bufferMins;
  const hours = Math.floor(rawMinutes / 60);
  const minutes = rawMinutes % 60;
  return {
    hours,
    minutes,
    formatted: hours > 0 ? `${hours}h ${minutes.toString().padStart(2, "0")}m` : `${minutes}m`,
  };
}
