import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { DropboxLocationsTable } from './DropboxLocationsTable';
import { Disclaimer } from './Disclaimer';
import { RootState } from '../../store/types';
import { useSelector } from 'react-redux';
import { UserState } from '../../store/user/types';
import { useGeocodeHome } from '../../query/geocode';
import { DropboxLocation  } from '../../data/types';
import { locations } from '../../data';

export const DropboxLocations = (): JSX.Element => {

  const [isOutdoorsOnly, setOutdoorsOnly] = useState(false);
  const [isOpen24Hours, setOpen24Hours] = useState(false);
  
  const { home } = useSelector<RootState, UserState>(state => state.user);
  const { data } = useGeocodeHome(home);

  const filterByCityAndState = (targetCity: string, targetState: string): DropboxLocation[] => {
    return locations.filter(({jurisdiction, city, state}) => {
      if (targetCity === city && targetState === state) {
        return true;
      }
      if (targetCity === jurisdiction && targetState === state) {
        return true;
      }
      return false;
    });
  };

  const getDropboxLocations = (): DropboxLocation[] => {
    if (data?.location) {
       return filterByCityAndState(data.location?.city, data.location?.state);
    }
    return [];
  }

  const dropboxLocations = getDropboxLocations();

  if (dropboxLocations.length === 0) {
    return <React.Fragment />;
  }
  return (
    <div className='table-responsive'>
      <div className='float-left'>
        <p className='lead mb-1'>
          { dropboxLocations[0].city }, { dropboxLocations[0].state }
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
        dropboxLocations={dropboxLocations}
        isOpen24Hours={isOpen24Hours}
        isOutdoorsOnly={isOutdoorsOnly}
      />
      <Disclaimer dropboxLocations={dropboxLocations} />
    </div>
  );
};
