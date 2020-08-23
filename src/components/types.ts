import { DropboxLocation } from "../data/types"

export type Store = {
  home?: Home;
  destinations: Destination[];
  dropboxLocations: DropboxLocation[];
  center?: google.maps.LatLngLiteral;
  zoom?: number;
}

export type Destination = {
  address: string;
  location: google.maps.LatLngLiteral;
}

export type Home = {
  city: string;
  location: google.maps.LatLngLiteral;
}
