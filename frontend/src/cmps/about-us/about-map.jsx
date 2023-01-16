import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export function AboutMap() {
  const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
  const zoom = 11

  const handleClick = ({ lat, lng }) => {
    setCoordinates({ lat, lng })
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '50%', margin: 'auto' }}>
      <GoogleMapReact
        onClick={handleClick}
        bootstrapURLKeys={{ key: 'AIzaSyBOVcSYZw3pTECVxLtlfMaoVIyjuehPWEM' }}
        // defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={zoom}
      >
        <AnyReactComponent {...coordinates} text="🔖" />
      </GoogleMapReact>
    </div>
  )
}
