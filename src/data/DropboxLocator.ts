import { DropboxLocation, DropboxLocator } from "./types";
import { michigan } from './locations/michigan';
import { ohio } from './locations/ohio';
import { pennsylvania } from "./locations/pennsylvania";

const michiganLocations: DropboxLocation[] = michigan.map(location => ({...location, state: 'MI' }));
const ohioLocations: DropboxLocation[] = ohio.map(location => ({...location, state: 'OH' }));
const pennsylvaniaLocations: DropboxLocation[]= pennsylvania.map(location => ({ ...location, state: 'PA' }));

const locations = [...michiganLocations, ...ohioLocations, ...pennsylvaniaLocations];

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