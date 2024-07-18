import axios from "axios";

const forwardSearchApi = axios.create({
  baseURL: 'https://api.mapbox.com/search/geocode/v6/forward',
  params: {
    proximity: 'ip',
    language: 'en',
    access_token: 'pk.eyJ1IjoianVhbmRhMTUiLCJhIjoiY2t0M2ZvYjNuMGc1bzJ2cGlxYzYyM2JydCJ9.y7ltKqWLiL8DE61sZQ87Fw'
  }
})

export default forwardSearchApi