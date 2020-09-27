import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Icon, InlineIcon } from '@iconify/react';
import mapMarker from '@iconify/icons-fa-solid/map-marker-alt';
import externalLink from '@iconify/icons-fa-solid/external-link-alt';

type MapMarkerProps = {
  lat: number;
  lng: number;
  color: string;
  address?: string;
  placeId?: string;
}

export class MapMarker extends Component<MapMarkerProps> {

  onClick = () => {
    const { address, placeId } = this.props;
    const href = `https://www.google.com/maps/search/?api=1&query=${address}&query_place_id=${placeId}`;
    window.open(href, '_blank');
  }

  render = (): JSX.Element => {
    const { address, color } = this.props;
    return (
      <React.Fragment>
        <Icon icon={mapMarker} width='1.5em' color={color} />
        <Card border='dark' className='mt-1' style={{ width: '10rem' }}>
          <Card.Body style={{ padding: '.4rem' }}>
            <Card.Text>{address}</Card.Text>
            <Button variant='dark' size='sm' style={{ fontSize: '1em'}} onClick={this.onClick}>
              <InlineIcon icon={externalLink} /> Open Location
            </Button>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}