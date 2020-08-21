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
