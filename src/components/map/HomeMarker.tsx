import React from 'react';
import { MapMarker } from './MapMarker';

type Props = {
  address: string,
  lat: number,
  lng: number,
}

export const HomeMarker = ({ address, lat, lng }: Props): JSX.Element => {
  return (
    <MapMarker
      lat={lat}
      lng={lng}
      color='black'
      address={address} />
  )
}