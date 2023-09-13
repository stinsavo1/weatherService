export interface CityRequest {
  q: string;
  limit?: number;
}

export interface CityResponse {
  country: string;
  lat: number;
  local_names: { [key: string]: string };
  lon: number;
  name: string;
  state: string;
}
