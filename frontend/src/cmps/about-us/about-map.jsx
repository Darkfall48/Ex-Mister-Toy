// Libraries
import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

export function AboutMap() {
  const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
  const zoom = 11

  const handleClick = ({ lat, lng }) => {
    setCoordinates({ lat, lng })
  }

  const Marker = ({ text }) => <div className="map-marker">{text}</div>

  return (
    <div className="map">
      <GoogleMapReact
        onClick={handleClick}
        bootstrapURLKeys={{ key: 'AIzaSyBOVcSYZw3pTECVxLtlfMaoVIyjuehPWEM' }}
        // defaultCenter={coordinates}
        // defaultZoom={zoom}
        center={coordinates}
        zoom={zoom}
      >
        {/* User Pos */}
        <Marker {...coordinates} text="🧸" />

        {/* Brand Pos */}
        <Marker lat={32.3853} lng={34.8818} text="📍" />
        <Marker lat={32.2853} lng={34.9818} text="📍" />
        <Marker lat={32.1853} lng={34.7818} text="📍" />
      </GoogleMapReact>
    </div>
  )
}
