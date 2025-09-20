import { useEffect, useMemo, useState } from 'react'
import type { Property } from '@/types'

const ENDPOINT = 'https://s3.us-central-1.wasabisys.com/mashvisor-cdn/task-fe-listings.json'

const FALLBACK: Property[] = [
  {
    id: 1,
    title: 'Modern Apartment in City Center',
    price: 250000,
    bedrooms: 2,
    location: 'Downtown',
    image: 'https://i.postimg.cc/Bvmy8d3Y/images-1.jpg',
  },
  {
    id: 2,
    title: 'Cozy Suburban Home',
    price: 320000,
    bedrooms: 3,
    location: 'Suburbs',
    image: 'https://i.postimg.cc/85Fy7ctc/images-2.jpg',
  },
]


function withMockCoords(list: Property[]): Property[] {
  const lookup: Record<string, {lat: number, lng: number}> = {
    Downtown: { lat: 37.7749, lng: -122.4194 }, // SF
    Suburbs: { lat: 37.3382, lng: -121.8863 }, // San Jose-ish
  }
  return list.map((p, idx) => {
    const base = lookup[p.location] || { lat: 34.0522, lng: -118.2437 } // LA fallback
    const d = ((p.id * 13) % 100) / 5000
    return { ...p, lat: base.lat + d, lng: base.lng - d }
  })
}

export function useProperties() {
  const [raw, setRaw] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch(ENDPOINT)
        if (!res.ok) throw new Error('Network error')
        const data: Property[] = await res.json()
        if (isMounted) setRaw(Array.isArray(data) ? withMockCoords(data) : withMockCoords(FALLBACK))
      } catch (e) {
        console.warn('Falling back to inline data due to fetch error:', e)
        if (isMounted) {
          setError('Could not fetch remote data. Showing fallback dataset.')
          setRaw(withMockCoords(FALLBACK))
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    })()
    return () => { isMounted = false }
  }, [])

  return { properties: raw, loading, error }
}
