export enum ErrorType {
  NOT_FOUND = 'NOT_FOUND',
}

export type LocationResponse = {
  error?: ErrorType,
  location?: {
    address: string,
    city: string,
    state: string,
    location: {
      lat: number,
      lng: number,
    },
    placeId: string,
  },
};
