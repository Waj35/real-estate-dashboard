import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PropertyList from './pages/PropertyList'
import PropertyDetails from './pages/PropertyDetails'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<PropertyList />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="*" element={<div className="container"><div className="panel">Not found</div></div>} />
    </Routes>
  )
}
