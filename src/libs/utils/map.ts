export function calculateDistance(p1: google.maps.LatLng, p2: google.maps.LatLng): number {
  // Convert latitude and longitude to radians
  const lat1 = (p1.lat() * Math.PI) / 180;
  const lon1 = (p1.lng() * Math.PI) / 180;
  const lat2 = (p2.lat() * Math.PI) / 180;
  const lon2 = (p2.lng() * Math.PI) / 180;

  // Convert latitude and longitude to Cartesian coordinates
  const x1 = Math.cos(lat1) * Math.cos(lon1);
  const y1 = Math.cos(lat1) * Math.sin(lon1);
  const z1 = Math.sin(lat1);
  const x2 = Math.cos(lat2) * Math.cos(lon2);
  const y2 = Math.cos(lat2) * Math.sin(lon2);
  const z2 = Math.sin(lat2);

  // Calculate the Euclidean distance
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dz = z2 - z1;
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

  // Convert the distance to kilometers
  const earthRadiusKm = 6371;
  return distance * earthRadiusKm;
}
