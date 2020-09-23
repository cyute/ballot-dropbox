import React, { Component } from 'react';
import { DropboxLocation } from '../../data/types';

type DisclaimerProps = {
  dropboxLocations: DropboxLocation[];
}

export class Disclaimer extends Component<DisclaimerProps> {

  render = (): JSX.Element => {
    const { dropboxLocations } = this.props;
    if (dropboxLocations && dropboxLocations.length > 0 && dropboxLocations[0].state === 'MI') {
      return (
        <div>
          <small className='text-danger' style={{ fontWeight: 300 }}>
            <sup>*</sup> Voters must only use the drop box in their jurisdiction
          </small>
        </div>
      )
    }
    return <React.Fragment />;
  }
}
