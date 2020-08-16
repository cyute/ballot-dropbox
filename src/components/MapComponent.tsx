import React, { Component, CSSProperties } from 'react';
import GoogleMapReact from 'google-map-react';

type MapComponentProps = {
  center: any;
  zoom: number;
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
    return (
      <div style={mapStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleApiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        />
      </div>
    );
  }
}