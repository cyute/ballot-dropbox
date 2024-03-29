import React from 'react';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { InlineIcon } from '@iconify/react';
import infoIcon from '@iconify/icons-fa-solid/info';

type Props = {
  address: string;
  isOutdoors: boolean;
  dropoffHours: string;
  comments: string;
}

export const Comment = ({ address, comments, dropoffHours, isOutdoors }: Props): JSX.Element => {

  const popover = (): JSX.Element => {
    return (
      <Popover id='popover-basic'>
        <Popover.Title as='h3'>{ address }</Popover.Title>
        <Popover.Content>
          { isOutdoors ? 'Outdoor' : 'Indoor' } dropbox is available { dropoffHours }
          <br/>{ comments }
        </Popover.Content>
      </Popover>
    )
  };

  return (
    <div>
      <span className='d-none d-sm-inline'>
        { isOutdoors ? 'Outdoor' : 'Indoor' } dropbox is available { dropoffHours }
        <br/>{ comments }
      </span>
      <div className='d-block d-sm-none text-center'>
        <OverlayTrigger trigger='click' placement='left' overlay={ popover() }>
          <Button variant='secondary' size='sm' onClick={(event) => event.stopPropagation()}>
            <InlineIcon icon={ infoIcon } /> 
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  );
};