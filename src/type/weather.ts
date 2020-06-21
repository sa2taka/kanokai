export interface WeatherResponse {
  data: WeatherData[];
  city_name: string;
  lon: number;
  lat: number;
  timezone: string;
  contory_code: string;
  state_code: string;
}

export interface WeatherData {
  wind_cdir: string;
  rh: number;
  pod: string;
  timestamp_utc: string;
  pres: number;
  solar_rad: number;
  weather: Weather;
  wind_gust_spd: number;
  timestamp_local: string;
  snow_depth: number;
  clouds: number;
  ts: number;
  wind_spd: number;
  pop: number;
  wind_cdir_full: string;
  slp: number;
  dni: number;
  dewpt: number;
  snow: number;
  uv: number;
  wind_dir: number;
  clouds_hi: number;
  precip: number;
  vis: number;
  dhi: number;
  app_temp: number;
  datetime: string;
  temp: number;
  ghi: number;
  clouds_mid: number;
  clouds_low: number;
}

export interface Weather {
  icon: string;
  code: number;
  description: string;
}
