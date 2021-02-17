export interface MapState {
  home?: Home;
  destinations: Destination[];
  center?: google.maps.LatLngLiteral;
  zoom?: number;
}

export interface Home  {
  address: string;
  city: string;
  state: string;
  location: google.maps.LatLngLiteral;
}

export type Destination = {
  address: string;
  placeId: string;
  location: google.maps.LatLngLiteral;
}