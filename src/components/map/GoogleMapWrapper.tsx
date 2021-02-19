import React, { Component, CSSProperties } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapMarker } from './MapMarker';
import { RootState } from '../../store/types';
import { connect, ConnectedProps } from 'react-redux';
import { Destination, Home } from '../../store/map/types';

type MapState = {
  defaultCenter: google.maps.LatLngLiteral;
  defaultZoom: number;
}

const mapStateToProps = (state: RootState) => ({
  map: state.map,
});

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>

class GoogleMapWrapper extends Component<PropsFromRedux, MapState> {

  public readonly state: Readonly<MapState> = {
    defaultCenter: {
      lat: 44.6254027,
      lng: -84.9069361,
    },
    defaultZoom: 6,
  };

  private googleApiKey: string = process.env['REACT_APP_GOOGLE_API_KEY'] || '';

  renderDestinationMarker = (destination: Destination, index: number): JSX.Element => {
    return (
      <MapMarker
        key={index}
        lat={destination.location.lat}
        lng={destination.location.lng}
        color='green'
        address={destination.address}
        placeId={destination.placeId}
      />
    )
  }

  renderHomeMarker = (home: Home): JSX.Element => {
    return (
      <MapMarker
        lat={home.location.lat}
        lng={home.location.lng}
        color='black'
        address={home.address} />
    )
  }

  render = (): JSX.Element => {
    const mapStyle: CSSProperties = {
      height: '100vh',
      width: '100%',
      position: 'fixed',
    };
    const { defaultCenter, defaultZoom } = this.state;
    const { center, zoom, destinations } = this.props.map;
    const { home } = this.props.map;
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

export default connector(GoogleMapWrapper);