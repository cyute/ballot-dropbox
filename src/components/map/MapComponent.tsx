import React, { Component, CSSProperties } from 'react';
import GoogleMapReact from 'google-map-react';
import { MarkerComponent } from './MarkerComponent';
import { Store } from '../types';

type MapComponentProps = {
  store: Store;
}

type MapComponentState = {
  defaultCenter: {
    lat: number,
    lng: number,
  };
  defaultZoom: number;
}

export class MapComponent extends Component<MapComponentProps, MapComponentState> {

  public readonly state: Readonly<MapComponentState> = {
    defaultCenter: {
      lat: 44.5559883,
      lng: -86.5639425,
    },
    defaultZoom: 7.25,
  };

  private googleApiKey: string = process.env['REACT_APP_GOOGLE_API_KEY'] || '';

  render() {
    const mapStyle: CSSProperties = {
      height: '100vh',
      width: '100%',
      position: 'fixed',
    };
    const { defaultCenter, defaultZoom } = this.state;
    const { home, targetLocation, center, zoom } = this.props.store;
    return (
      <div style={mapStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.googleApiKey }}
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          zoom={zoom ? zoom : defaultZoom }
          center={center}
        >
          { home && home.lat && home.lng && <MarkerComponent lat={home.lat} lng={home.lng} color='black' />}
          { targetLocation && targetLocation.lat && targetLocation.lng && <MarkerComponent lat={targetLocation.lat} lng={targetLocation.lng} color='green' />}
        </GoogleMapReact>
      </div>
    );
  }
}