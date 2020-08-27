import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Icon } from '@iconify/react';
import mapMarker from '@iconify/icons-fa-solid/map-marker-alt';

type MapMarkerProps = {
  lat: number;
  lng: number;
  color: string;
  label?: string
}

export class MapMarker extends Component<MapMarkerProps> {

  render() {
    const { color, label } = this.props;
    return (
      <React.Fragment>
        <Icon icon={mapMarker} width='1.5em' color={color} />
        <Card style={{ width: '10rem' }}>
          <Card.Body style={{ padding: '.4rem' }}>
            {label}
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}