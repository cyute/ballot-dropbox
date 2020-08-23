import React, { Component, CSSProperties } from 'react';
import GoogleMapReact from 'google-map-react';
import { MarkerComponent } from './MarkerComponent';
import { Store, Destination, Home } from '../types';

type MapComponentProps = {
  store: Store;
}

type MapComponentState = {
  defaultCenter: google.maps.LatLngLiteral;
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

  renderDestinationMarker = (destination: Destination, index: number) => {
    return (
      <MarkerComponent
        key={index}
        lat={destination.location.lat}
        lng={destination.location.lng}
        color='green'
        label={destination.address} />
    )
  }

  renderHomeMarker = (home: Home) => {
    return (
      <MarkerComponent
        lat={home.location.lat}
        lng={home.location.lng}
        color='black'
        label={home.address} />
    )
  }

  render() {
    const mapStyle: CSSProperties = {
      height: '100vh',
      width: '100%',
      position: 'fixed',
    };
    const { defaultCenter, defaultZoom } = this.state;
    const { home, destinations, center, zoom } = this.props.store;
    return (
      <div style={mapStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.googleApiKey }}
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          zoom={zoom ? zoom : defaultZoom}
          center={center}
        >
          {home && home.location && this.renderHomeMarker(home)}
          {destinations.map((destination, index) => this.renderDestinationMarker(destination, index))}
        </GoogleMapReact>
      </div>
    );
  }
}