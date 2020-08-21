import React, { Component, CSSProperties } from 'react';
import GoogleMapReact from 'google-map-react';
import { MarkerComponent } from './MarkerComponent';
import { Store } from '../types';

type MapComponentProps = {
  center: any;
  zoom: number;
  store: Store;
}

export class MapComponent extends Component<MapComponentProps> {

  static defaultProps = {
    center: { lat: 44.5559883, lng: -86.5639425 },
    zoom: 7.25
  };

  render() {
    const googleApiKey: string = process.env['REACT_APP_GOOGLE_API_KEY'] || '';
    const mapStyle: CSSProperties = {
      height: '100vh',
      width: '100%',
      position: 'fixed',
    };
    const { home, targetLocation } = this.props.store;
    return (
      <div style={mapStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleApiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          { home && <MarkerComponent lat={home.lat} lng={home.lng} color='black' />}
          { targetLocation && <MarkerComponent lat={targetLocation.lat} lng={targetLocation.lng} color='red' />}
        </GoogleMapReact>
      </div>
    );
  }
}