import { DropboxLocation } from "../data/types"

export type Store = {
  home: Home;
  targetLocation: TargetLocation;
  dropboxLocations: DropboxLocation[];
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

export type TargetLocation = {
  lat?: number;
  lng?: number;
}

export type Home = {
  lat?: number;
  lng?: number;
  city?: string;
}
