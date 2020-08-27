import React, { Component } from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Icon } from '@iconify/react';
import infoIcon from '@iconify/icons-fa-solid/info';

type CommentProps = {
  address: string;
  isOutdoors: boolean;
  dropoffHours: string;
  comments: string;
}

export class Comment extends Component<CommentProps> {

  popover = (): JSX.Element => {
    const { address, comments, dropoffHours, isOutdoors } = this.props;
    return (
      <Popover id='popover-basic'>
        <Popover.Title as='h3'>{ address }</Popover.Title>
        <Popover.Content>
          { isOutdoors ? 'Outdoor' : 'Indoor' } dropbox is available { dropoffHours }
          { comments && ` Comments: ${ comments }` }
        </Popover.Content>
      </Popover>
    )
  };

  render() {
    const { comments, dropoffHours, isOutdoors } = this.props;
    return (
      <div>
        <span className='d-none d-sm-inline'>
          { isOutdoors ? 'Outdoor' : 'Indoor' } dropbox is available { dropoffHours }
          { comments && ` Comments: ${ comments }` }
        </span>
        <div className='d-block d-sm-none text-center'>
          <OverlayTrigger trigger='click' placement='left' overlay={ this.popover() }>
            <Icon icon={ infoIcon } />
          </OverlayTrigger>
        </div>
      </div>
    );
  }
}