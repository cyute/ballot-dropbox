import React from 'react';
import { DropboxLocation } from '../../data/types';

type Props = {
  dropboxLocations: DropboxLocation[];
}

export const Disclaimer = ({ dropboxLocations }: Props): JSX.Element => {

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
};
