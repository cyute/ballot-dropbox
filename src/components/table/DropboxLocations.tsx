import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import DropboxLocationsTable from './DropboxLocationsTable';
import { Disclaimer } from './Disclaimer';
import { RootState } from '../../store/types';
import { connect, ConnectedProps } from 'react-redux';

type DropboxLocationsState = {
  isOutdoorsOnly: boolean;
  isOpen24Hours: boolean;
}

const mapStateToProps = (state: RootState) => ({
  dropbox: state.dropbox,
});

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>

class DropboxLocations extends Component<PropsFromRedux, DropboxLocationsState> {

  public readonly state: Readonly<DropboxLocationsState> = {
    isOutdoorsOnly: false,
    isOpen24Hours: false,
  };

  toggleOutdoors = (): void => {
    this.setState({ isOutdoorsOnly: !this.state.isOutdoorsOnly });
  }

  toggle24Hours = (): void => {
    this.setState({ isOpen24Hours: !this.state.isOpen24Hours });
  }

  render = (): JSX.Element => {
    const { locations } = this.props.dropbox;
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
            checked={this.state.isOutdoorsOnly}
            onChange={this.toggleOutdoors}
          />
          <Form.Check inline
            label='24/7'
            type='checkbox'
            id={`inline-radio-2`}
            checked={this.state.isOpen24Hours} 
            onChange={this.toggle24Hours}
          />
        </div>
        <DropboxLocationsTable
          dropboxLocations={locations}
          isOpen24Hours={this.state.isOpen24Hours}
          isOutdoorsOnly={this.state.isOutdoorsOnly}
        />
        <Disclaimer dropboxLocations={locations} />
      </div>
    );
  }
}

export default connector(DropboxLocations);