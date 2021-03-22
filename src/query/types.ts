export type GeocodedLocation = {
  address: string,
  city: string,
  state: string,
  location: {
    lat: number,
    lng: number,
  },
  placeId: string,
};

export type LocationResponse = {
  location?: GeocodedLocation,
};