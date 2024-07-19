import axios from "axios";

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving/',
  params: {
    alternatives: true,
    annotations: 'duration,distance',
    geometries: 'geojson',
    language: 'en',
    overview: 'full',
    steps: true,
    access_token: 'pk.eyJ1IjoianVhbmRhMTUiLCJhIjoiY2t0M2ZvYjNuMGc1bzJ2cGlxYzYyM2JydCJ9.y7ltKqWLiL8DE61sZQ87Fw'
  }
})

export default directionsApi