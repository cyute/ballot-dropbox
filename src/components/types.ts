import { DropboxLocation } from "../data/types"

export type Store = {
  lookup: Lookup;
  home?: Home;
  destinations: Destination[];
  dropboxLocations: DropboxLocation[];
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  isHeroContainerOpen: boolean;
  isSearchingForHome: boolean;
  isDisplayError: boolean;
}

export type Lookup = {
  address: string;
  state: string;
}

export type Destination = {
  address: string;
  location: google.maps.LatLngLiteral;
}

export type Home = {
  address: string;
  city: string;
  state: string;
  location: google.maps.LatLngLiteral;
}
