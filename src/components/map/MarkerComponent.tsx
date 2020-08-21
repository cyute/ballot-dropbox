import React, { Component } from 'react';
import { Icon } from '@iconify/react';
import mapMarker from '@iconify/icons-fa-solid/map-marker-alt';

type MarkerComponentProps = {
  lat: number;
  lng: number;
  color: string;
}

export class MarkerComponent extends Component<MarkerComponentProps> {

  render() {
    return (
       <Icon icon={mapMarker} width='1.5em' color={ this.props.color } />
    );
  }
}