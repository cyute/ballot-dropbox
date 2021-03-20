import React, { CSSProperties } from 'react';
import GoogleMapReact from 'google-map-react';
import { RootState } from '../../store/types';
import { useSelector } from 'react-redux';
import { HomeMarker } from './HomeMarker';
import { DestinationMarker } from './DestinationMarker';
import { MapState } from '../../store/map/types';

export const GoogleMapWrapper = (): JSX.Element => {

  const defaultCenter = {
    lat: 44.6254027,
    lng: -84.9069361,
  };
  const defaultZoom =  6;

  const googleApiKey = process.env['REACT_APP_GOOGLE_API_KEY'] || '';

  const mapStyle: CSSProperties = {
    height: '100vh',
    width: '100%',
    position: 'fixed',
  };

  const { destinations, home, center, zoom } = useSelector<RootState, MapState>(state => state.map);

  return (
    <div style={mapStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleApiKey }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        zoom={zoom ? zoom : defaultZoom}
        center={center}
      >
        {home?.location && <HomeMarker address={home.address} lat={home.location.lat} lng={home.location.lng} />}
        {
          destinations.map((destination, index) => {
            return (
              <DestinationMarker
                key={index}
                address={destination.address}
                lat={destination.location.lat}
                lng={destination.location.lng}
                placeId={destination.placeId} />
            );
          })
        }
      </GoogleMapReact>
    </div>
  );
};
