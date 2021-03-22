import { michigan } from './michigan';
import { ohio } from './ohio';
import { pennsylvania } from './pennsylvania';
import { DropboxLocation } from './types';

const michiganLocations: DropboxLocation[] = michigan.map(location => ({...location, state: 'MI' }));
const ohioLocations: DropboxLocation[] = ohio.map(location => ({...location, state: 'OH' }));
const pennsylvaniaLocations: DropboxLocation[]= pennsylvania.map(location => ({ ...location, state: 'PA' }));

export const locations = [...michiganLocations, ...ohioLocations, ...pennsylvaniaLocations];