import React from 'react'

type Props = {
  search: string
  setSearch: (v: string) => void
  minBeds: number
  setMinBeds: (v: number) => void
  sort: 'price-asc' | 'price-desc'
  setSort: (v: 'price-asc' | 'price-desc') => void
}

export default function ControlsBar({ search, setSearch, minBeds, setMinBeds, sort, setSort }: Props) {
  return (
    <div className="panel controls">
      <input
        className="input"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search properties..."
        aria-label="Search properties"
      />
      <select
        className="select"
        value={minBeds}
        onChange={e => setMinBeds(Number(e.target.value))}
        aria-label="Minimum bedrooms"
        title="Filter by minimum bedrooms"
      >
        <option value={0}>Min Beds: Any</option>
        <option value={1}>1+</option>
        <option value={2}>2+</option>
        <option value={3}>3+</option>
        <option value={4}>4+</option>
      </select>

      <select
        className="select"
        value={sort}
        onChange={e => setSort(e.target.value as any)}
        aria-label="Sort by price"
        title="Sort by price"
      >
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
      </select>
    </div>
  )
}
