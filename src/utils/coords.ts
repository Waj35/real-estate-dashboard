// Deterministic pseudo-geocoder since the API has no coordinates.
// We map known locations to rough city centers and then scatter slightly by id.
type Base = { lat: number; lng: number }
const bases: Record<string, Base> = {
  Downtown: { lat: 37.7749, lng: -122.4194 }, // SF
  Suburbs: { lat: 37.5630, lng: -122.3255 },  // south bay-ish
}

export function coordsFor(location: string, id: number): Base {
  const base = bases[location] ?? { lat: 37.7749, lng: -122.4194 }
  // jitter by id so markers aren't identical, but keep them nearby (~±0.01 deg)
  const j1 = ((id * 73) % 100) / 10000 - 0.005
  const j2 = ((id * 41) % 100) / 10000 - 0.005
  return { lat: base.lat + j1, lng: base.lng + j2 }
}
