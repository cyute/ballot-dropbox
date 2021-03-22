import React, { CSSProperties } from 'react';
import GoogleMapReact from 'google-map-react';
import { RootState } from '../../store/types';
import { useSelector } from 'react-redux';
import { useGeocodeLocations, useGeocodeHome } from '../../query/geocode';
import { UserState } from '../../store/user/types';
import { MapMarker } from './MapMarker';
import homeIcon from '@iconify/icons-fa-solid/home';

export const GoogleMapWrapper = (): JSX.Element => {

  const key = process.env['REACT_APP_GOOGLE_API_KEY'] || '';
  
  const mapStyle: CSSProperties = {
    height: '100vh',
    width: '100%',
    position: 'fixed',
  };

  const { home, locations, state } = useSelector<RootState, UserState>(state => state.user);
  const { data } = useGeocodeHome(home);
  const results = useGeocodeLocations(locations);

  const defaultZoom = 6;
  const getZoom = (): number => data?.location?.location ? 11 : defaultZoom;

  const defaultCenter = { lat: 44.6254027, lng: -84.9069361 };

  const getCenter = (): { lat: number, lng: number } => {
    if (data?.location?.location) {
      const { lat, lng } = data.location.location;
      return { lat, lng }
    }
    if (state === 'MI') {
      return { lat: 44.6254027, lng: -84.9069361 };
    }
    if (state === 'OH') {
      return { lat: 41.2459212, lng: -82.9121421 };
    }
    if (state === 'PA') {
      return { lat: 41.6459212, lng: -77.4121421 };
    }
    return defaultCenter;
  }

  return (
    <div style={mapStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        zoom={getZoom()}
        center={getCenter()}
      >
        <MapMarker 
          address={data?.location?.address} 
          lat={data?.location?.location.lat ?? 0}
          lng={data?.location?.location.lng ?? 0}
          color='green'
          icon={homeIcon}
          placeId={data?.location?.placeId} />
        {
          results.map((result, index) => {
            const data = result.data as any;
            return (
              <MapMarker
                key={index}
                address={data?.location.address}
                lat={data?.location?.location.lat ?? 0}
                lng={data?.location?.location.lng ?? 0}
                placeId={data?.location?.placeId}
                color='black' />
            )
          })
        }
      </GoogleMapReact>
    </div>
  );
};
