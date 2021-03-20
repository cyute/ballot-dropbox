import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { DropboxLocationsTable } from './DropboxLocationsTable';
import { Disclaimer } from './Disclaimer';
import { RootState } from '../../store/types';
import { useSelector } from 'react-redux';
import { DropboxState } from '../../store/dropbox/types';

export const DropboxLocations = (): JSX.Element => {

  const [isOutdoorsOnly, setOutdoorsOnly] = useState(false);
  const [isOpen24Hours, setOpen24Hours] = useState(false);
  const { locations } = useSelector<RootState, DropboxState>(state => state.dropbox);

  if (locations.length === 0) {
    return <React.Fragment />;
  }
  return (
    <div className='table-responsive'>
      <div className='float-left'>
        <p className='lead mb-1'>
          { locations[0].city }, { locations[0].state }
        </p>
      </div>
      <div className='float-right' style={{ lineHeight: '2rem' }}>
        <Form.Check inline 
          label='outdoors'
          type='checkbox' 
          id={`inline-radio-1`}
          checked={isOutdoorsOnly}
          onChange={() => setOutdoorsOnly(value => !value)}
        />
        <Form.Check inline
          label='24/7'
          type='checkbox'
          id={`inline-radio-2`}
          checked={isOpen24Hours} 
          onChange={() => setOpen24Hours(value => !value)}
        />
      </div>
      <DropboxLocationsTable
        dropboxLocations={locations}
        isOpen24Hours={isOpen24Hours}
        isOutdoorsOnly={isOutdoorsOnly}
      />
      <Disclaimer dropboxLocations={locations} />
    </div>
  );
};
