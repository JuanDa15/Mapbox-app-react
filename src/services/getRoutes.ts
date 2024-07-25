import directionsApi from "../API/directions";
import { DirectionsResponse, Route } from "../interfaces";

export async function getRoutes(coords: string): Promise<Route[]> {
  const { data } = await directionsApi.get<DirectionsResponse>(coords);

  if (data.routes.length === 0) {
    alert('Route not found');
    return []
  }

  return data.routes
}