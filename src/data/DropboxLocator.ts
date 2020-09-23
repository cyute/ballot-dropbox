import { DropboxLocation, DropboxLocator } from "./types";
import { michigan } from './locations/michigan';
import { ohio } from './locations/ohio';

const michiganLocations: DropboxLocation[] = michigan.map(location => {
  return { ...location, state: 'MI' };
});

const ohioLocations: DropboxLocation[] = ohio.map(location => {
  return { ...location, state: 'OH' };
});

const locations = [...michiganLocations, ...ohioLocations];

const dropboxLocator: DropboxLocator = {
  filterByCityAndState: (targetCity: string, targetState: string): DropboxLocation[] => {
    return locations.filter(({jurisdiction, city, state}) => {
      if (targetCity === city && targetState === state) {
        return true;
      }
      if (targetCity === jurisdiction && targetState === state) {
        return true;
      }
      return false;
    });
  },
};

export default dropboxLocator;