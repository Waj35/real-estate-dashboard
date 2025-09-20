import React, { useMemo, useState } from 'react'
import { useProperties } from '../hooks/useProperties'
import PropertyCard from '../components/PropertyCard'
import ControlsBar from '../components/ControlsBar'

export default function PropertyList() {
  const { properties, loading, error } = useProperties()

  const [search, setSearch] = useState('')
  const [minBeds, setMinBeds] = useState(0)
  const [sort, setSort] = useState<'price-asc' | 'price-desc'>('price-asc')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = properties.filter(p =>
      (minBeds ? p.bedrooms >= minBeds : true) &&
      (q ? p.title.toLowerCase().includes(q) : true)
    )
    list.sort((a, b) => sort === 'price-asc' ? a.price - b.price : b.price - a.price)
    return list
  }, [properties, search, minBeds, sort])

  return (
    <div className="container">
      <div className="header">
        <div className="brand"><span className="dot"></span>Real Estate Dashboard</div>
      </div>

      <ControlsBar
        search={search} setSearch={setSearch}
        minBeds={minBeds} setMinBeds={setMinBeds}
        sort={sort} setSort={setSort}
      />

      {loading && <div className="panel" style={{padding:16}}>Loading properties…</div>}
      {error && <div className="panel" style={{padding:16}} role="alert">{error}</div>}

      {!loading && filtered.length === 0 && (
        <div className="panel empty">No properties found. Try adjusting your filters.</div>
      )}

      <div className="grid">
        {filtered.map(p => <PropertyCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
