import React from 'react'
import type { Property } from '@/types'
import { Link } from 'react-router-dom'

export default function PropertyCard({ p }: { p: Property }) {
  return (
    <Link to={`/property/${p.id}`} className="card link" aria-label={`Open ${p.title}`}>
      <div className="card">
        <img src={p.image} alt={p.title} loading="lazy" />
        <div className="card-body">
          <span className="badge">🏠 {p.bedrooms} bd · {p.location}</span>
          <div className="title">{p.title}</div>
          <div className="price">${p.price.toLocaleString()}</div>
        </div>
      </div>
    </Link>
  )
}
