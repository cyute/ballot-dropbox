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
  },
};

export type DropboxLocation = {
  county: string;
  jurisdiction: string;
  address: string;
  city: string;
  state: string;
  isOutdoors: boolean;
  dropoffHours: string;
  comments: string;
};

export type DropboxLocator = {
  filterByCityAndState: (targetCity: string, targetState: string) => DropboxLocation[];
}
