import { Marker, Popup } from "mapbox-gl";
import { Feature } from "../interfaces";

export function createMarker(place: Feature, color?: string) {
  const [lng, lat] = place.geometry.coordinates;
  const popup = new Popup().setHTML(`
    <p class="text-slate-800">${place.properties.name}</p>
    <p  class="text-slate-800"><small>${place.properties.place_formatted}</small></p>  
  `);

  const marker = new Marker({
    color: color ?? '#61dadb',
  }).setLngLat([lng, lat]).setPopup(popup)
  return marker;
}

export function createMarkerWithCoords([lng, lat]: [number, number], color?: string) {
  const marker = new Marker({
    color: color ?? '#ff55ff',
  }).setLngLat([lng, lat])
  return marker;
}