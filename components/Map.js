import React, { useState } from 'react'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import { getCenter } from 'geolib'

const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({})
  console.log(selectedLocation)
  const cordinates = searchResults.map((res) => ({
    longitude: res.long,
    latitude: res.lat,
  }))
  const center = getCenter(cordinates)
  const [viewport, setViewport] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 11,
  })
  return (
    <ReactMapGl
      mapStyle="mapbox://styles/jupiiiter/ckzb70tz5000815le3evlp7xc"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onMove={(evt) => setViewport(evt.viewState)}
    >
      {searchResults?.map((res) => (
        <div key={res.long}>
          <Marker
            offsetTop={-20}
            offsetLeft={-10}
            longitude={res.long}
            latitude={res.lat}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
          >
            <p
              href="#"
              role="img"
              onClick={() => setSelectedLocation(res)}
              className="animate-bounce cursor-pointer text-2xl"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {selectedLocation.long === res.long ? (
            <Popup
              closeOnClick={true}
              latitude={res.lat}
              longitude={res.long}
              anchor="bottom"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                background: '#fff',
                zIndex: 100,
                willChange: 'transform',
                textAlign: 'center',
                padding: '5px 0',
              }}
            >
              <div> {res.title}</div>
            </Popup>
          ) : (
            ''
          )}
        </div>
      ))}
    </ReactMapGl>
  )
}

export default Map
