import { LngLat, Marker, Popup } from "mapbox-gl";
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

export function createUserMarker(center: LngLat): Marker {
  const popup = new Popup().setHTML(`
    <h4 class="text-black">You are here</h4>  
  `);
  const el = document.createElement('div');
  el.className = 'custom-marker';
  el.style.backgroundImage = 'url(person-svgrepo-com.png)'; // Replace 'your-icon-url.png' with the path to your custom icon
  el.style.width = '50px'; // Adjust width and height as needed
  el.style.height = '50px';
  el.style.backgroundSize = '100%';

  const marker = new Marker({
    color: '#61dadb',
    element: el,
  }).setPopup(popup).setLngLat(center)

  return marker
}