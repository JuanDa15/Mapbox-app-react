import { LngLat, LngLatBounds, Map, Marker, SourceSpecification } from "mapbox-gl";
import { createMarkerWithCoords } from "./createMarker";
import { Route } from "../interfaces";

interface Args {
  userLocation: [number, number],
  addresses: [number, number][],
  map: Map;
  route: Route,
  updateDirectionsMarker?: (value: Marker[]) => void,
  drawMarkers?: boolean
}

export function updateMapRoute({
  addresses,
  map,
  userLocation,
  route,
  updateDirectionsMarker,
  drawMarkers = true
}: Args) {
  // Clear Previus state
  if (map.getLayer('RouteString')) {
    map.removeLayer('RouteString')
    map.removeSource('RouteString')
  }


  // Create Map Bounds
  const southWestCorner = new LngLat(userLocation[0], userLocation[1]);
  const northEastCorner = new LngLat(userLocation[0], userLocation[1]);
  const bounds = new LngLatBounds(southWestCorner, northEastCorner);
  if (!drawMarkers) {
    for (const address of addresses) {
      bounds.extend(address)
    }
  }

  if (drawMarkers) {
    // Create Map Markers
    const directionsMarkers = []
    for (const address of addresses) {
      bounds.extend(address)
      const marker = createMarkerWithCoords(address).addTo(map)
      directionsMarkers.push(marker)
    }
    if (updateDirectionsMarker) updateDirectionsMarker(directionsMarkers);
  }
  // Generate source data
  const sourceData = getSourceData(route);

  // Set map features
  map.addSource('RouteString', sourceData)
  map.fitBounds(bounds, {
    padding: {
      bottom: 200,
      left: 200,
      right: 200,
      top: 200,
    },
  });

  // Setup route line
  map.addLayer({
    id: 'RouteString',
    type: 'line',
    source: 'RouteString',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#FF0',
      'line-width': 5,
    },
  })
}

function getSourceData(route: Route) {
  const sourceData: SourceSpecification = {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route.geometry.coordinates,
          },
        },
      ],
    },
  }
  return sourceData;
}