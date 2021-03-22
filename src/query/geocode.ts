import { useQuery, useQueries, UseQueryResult } from 'react-query';
import Axios from 'axios';
import querystring from 'querystring';
import { LocationResponse } from './types';

const API_ENDPOINT = `${process.env['REACT_APP_API_ENDPOINT']}/location`;

const getLocation = async (address: string): Promise<LocationResponse | Error> => {
  const url = API_ENDPOINT + `?${ querystring.stringify({ address }) }`
  try {
    const { data } = await Axios.get<LocationResponse>(url);
    return data;
  } catch (error) {
    console.error('Location not Found', error);
    throw new Error('Location Not Found');
  }
}

export const useGeocodeHome = (home: string): UseQueryResult<LocationResponse, Error> => {
  const queryOptions = { enabled: !!home, staleTime: Infinity };
  return useQuery(['home', home], () => getLocation(home), queryOptions);
}

export const useGeocodeLocations = (locations: string[]): UseQueryResult<unknown, unknown>[] => {
  const queries = locations.map(location => ({
    queryKey: ['location', location],
    queryFn: () => getLocation(location),
    enabled: !!location,
    staleTime: Infinity,
  }));
  return useQueries(queries);
}