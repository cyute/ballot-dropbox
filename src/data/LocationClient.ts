import axios from 'axios';
import querystring from 'querystring';
import { LocationResponse, ErrorType } from './types';

export class LocationClient {
  private API_ENDPOINT = `${process.env['REACT_APP_API_ENDPOINT']}/location`;

  get = async (address: string): Promise<LocationResponse> => {
    try {
      const response = await axios.get<LocationResponse>(this.API_ENDPOINT + `?${ querystring.stringify({ address }) }`);
      return { location: response.data.location };
    }
    catch (error) {
      console.log('error', error);
      return { error: ErrorType.NOT_FOUND };
    }
  }
}