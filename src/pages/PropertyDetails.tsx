import React, { useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useProperties } from '../hooks/useProperties'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { coordsFor } from '../utils/coords'
import GMap from '../components/GMap'

function genPriceSeries(price: number, id: number){
  const points = 8
  const arr = Array.from({length: points}, (_, i) => {
    const factor = Math.sin((i+1) * 1.2 + id) * 0.03
    const noise = ( ( (id*37 + i*17) % 13) - 6 ) / 300
    const v = Math.round(price * (1 + factor + noise))
    return { month: `M${i+1}`, price: v }
  })
  return arr
}

export default function PropertyDetails(){
  const { id } = useParams()
  const nav = useNavigate()
  const { properties } = useProperties()
  const prop = properties.find(p => String(p.id) === id)

  const data = useMemo(() => prop ? genPriceSeries(prop.price, prop.id) : [], [prop])

  const coords = useMemo(() => prop ? (prop.lat && prop.lng ? {lat: prop.lat, lng: prop.lng} : coordsFor(prop.location, prop.id)) : {lat:0,lng:0}, [prop])

  if (!prop){
    return (
      <div className="container">
        <div className="panel">
          <p>Property not found.</p>
          <button className="btn" onClick={() => nav(-1)}>Go Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <div className="brand"><span className="dot"></span>Real Estate Dashboard</div>
        <Link className="link" to="/">← Back to list</Link>
      </div>

      <div className="details">
        <div className="hero panel">
          <img src={prop.image} alt={prop.title} />
          <div className="kv">
            <div className="item">🏷️ Price: <strong>${prop.price.toLocaleString()}</strong></div>
            <div className="item">🛏️ Bedrooms: <strong>{prop.bedrooms}</strong></div>
            <div className="item">📍 Location: <strong>{prop.location}</strong></div>
          </div>
          <h2 style={{margin:'6px 0 8px'}}>{prop.title}</h2>
          <p className="muted">A lovely property located in {prop.location}. This detail page shows
            a sample chart of synthetic price history as a bonus.</p>
        </div>

        <aside className="sidebar">
          <div className="chartBox">
            <h3 style={{marginTop:0}}>Price History</h3>
            <div style={{width:'100%', height:260}}>
              <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="footer-note">* Data is illustrative.</div>
          </div>
        
          <div style={{height:12}} />
          {typeof prop.lat === 'number' && typeof prop.lng === 'number' ? (
            <div className="chartBox">
              <h3 style={{marginTop:0}}>Location</h3>
              <GMap lat={prop.lat!} lng={prop.lng!} title={prop.title} />
            </div>
          ) : null}
        </aside>
        
      </div>
    </div>
  )
}
