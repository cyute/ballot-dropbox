import React from 'react';
import { MapMarker } from './MapMarker';

type Props = {
  lat: number;
  lng: number;
  address: string;
  placeId: string;
}

export const DestinationMarker = ({ lat, lng, address, placeId }: Props): JSX.Element => {
  return (
    <MapMarker
      lat={lat}
      lng={lng}
      color='green'
      address={address}
      placeId={placeId}
    />
  );
};