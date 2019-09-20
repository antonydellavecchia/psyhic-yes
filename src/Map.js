//import React, { Component, useState, useReducer, useEffect, useRef } from 'react';
//import ReactMapGL, { LinearInterpolator } from 'react-map-gl';
//
//export default function Map () {
//  const mapRef = useRef(null)
//  const [viewport, setViewport] = useState({
//    width: 1600,
//    height: 800,
//    latitude: -87.627,
//    longitude: 41.02,
//    zoom: 15.45
//  })
//
//  console.log('hello')
//  const animate = (timestamp) => {
//    mapRef.current.getMap().rotateTo((timestamp / 1000) % 360, {duration: 0});
//
//    requestAnimationFrame(animate)
//  }
//  
//  const mapLoaded = (e) => {
//    //animate(0)
//  }
//  
//  return (
//    <ReactMapGL
//      {...viewport}
//      onViewportChange={(viewport) => setViewport(viewport)}
//      mapStyle="mapbox://styles/mapbox/dark-v9"
//    />
//  );
//}

import React, {useState, useRef} from 'react';
import ReactMapGL from 'react-map-gl';

export default function Map() {
  const mapRef = useRef(null)
  
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 62.567032,
    longitude:  8.875528,
    zoom: 3,
    pitch: 5
  })

  const start = { lat: 62.567032, lon: 8.875528}
  const end = { lat: 45.524951, lon: -73.585697 }
  const sigmoid = (time) => {
    return 2 * (1 / (1 + Math.exp(-1 * time)) - 0.5)
  }

  
  
  const animate = (timestamp) => {
    let map = mapRef.current.getMap()
    const currentPos = {
      lat: 2 * Math.atan(timestamp / 10000) / Math.PI * end.lat + (1 - 2 * Math.atan(timestamp / 10000) / Math.PI) * start.lat,
      lon: 2 * Math.atan(timestamp / 10000) / Math.PI * end.lon + (1 - 2 * Math.atan(timestamp / 10000) / Math.PI) * start.lon
    }
    
    map.setCenter(currentPos)
    map.rotateTo((timestamp / 100) % 360, {duration: 0});
    map.zoomTo(3 * Math.cos(timestamp / 1000) + 12)



    requestAnimationFrame(animate)
  }
  
  const mapLoaded = (e) => {
    animate(0)
  }
  
  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v9"
      onLoad={mapLoaded}
    />
  );

}
