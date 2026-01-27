// dto/open-meteo-response.dto.ts
export interface OpenMeteoCurrent {
  temperature_2m: number;
  relative_humidity_2m: number;
  rain: number;
  weather_code: number;
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  current: OpenMeteoCurrent;
}
