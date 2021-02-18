import React, { Component, CSSProperties } from 'react';
import './App.css';
import GoogleMapWrapper from './components/map/GoogleMapWrapper';
import { OverlayWrapper } from './components/OverlayWrapper';
import HeroInputContainer from './components/HeroInputContainer';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { InlineIcon } from '@iconify/react';
import closeIcon from '@iconify/icons-fa-solid/window-close';
import searchLocationIcon from '@iconify/icons-fa-solid/search-location';
import questionCircle from '@iconify/icons-fa-solid/question-circle';
import { connect, ConnectedProps } from 'react-redux';
import { toggleHeroContainer, closeErrorAlert } from './store/user/actions';
import { RootState } from './store/types';

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const connector = connect(mapStateToProps, { toggleHeroContainer, closeErrorAlert });

type PropsFromRedux = ConnectedProps<typeof connector>

class App extends Component<PropsFromRedux, {}> {

  renderHeroCollapseButton = (): JSX.Element => {
    const style: CSSProperties = { cursor: 'pointer', color: '#333333' };
    return (
      <div onClick={() => this.props.toggleHeroContainer()} className='float-right'>
        <InlineIcon style={style} className='mt-3 mr-2' icon={closeIcon} /> 
      </div>
    );
  }

  renderHeroExpandButton = (): JSX.Element => {
    return (
      <Button className='mt-3' variant='dark' size='sm' onClick={() => this.props.toggleHeroContainer()}>
        <InlineIcon icon={searchLocationIcon} /> Open Dropbox Locator
      </Button>
    );
  }

  renderSpinner = (): JSX.Element => {
    const style: CSSProperties = { position: 'fixed', top: '47%', left: '47%' };
    return (
      <Spinner style={style} animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    );
  }

  renderError = (): JSX.Element => {
    const style: CSSProperties = { position: 'fixed', bottom: 5, left: '2%', width: '96%' };
    return (
      <Alert variant='danger' style={style} onClose={() => this.props.closeErrorAlert()} dismissible>
        We were unable to locate the address or city.  Please try again.
      </Alert>
    );
  }

  renderFAQLink = (): JSX.Element => {
    const style: CSSProperties = { position: 'fixed', bottom: 5, left: '45%' };
    return (
      <Button variant='dark' size='sm' style={style} onClick={() => window.location.href='/faq.html' }>
        <InlineIcon icon={questionCircle} /> FAQ
      </Button>
    );
  }

  render = (): JSX.Element => {
    const { isHeroContainerOpen, isSearching, isDisplayError } = this.props.user;
    return (
      <React.Fragment>
        <GoogleMapWrapper />
        <OverlayWrapper>
          { isHeroContainerOpen && <HeroInputContainer /> }
        </OverlayWrapper>
        <OverlayWrapper>
          { isHeroContainerOpen && this.renderHeroCollapseButton() }
          { !isHeroContainerOpen && this.renderHeroExpandButton() }
        </OverlayWrapper>
        <OverlayWrapper>
          { isSearching ? this.renderSpinner() : null }
        </OverlayWrapper>
        <OverlayWrapper>
          { isDisplayError ? this.renderError() : null }
          { !isDisplayError ? this.renderFAQLink() : null }
        </OverlayWrapper>
      </React.Fragment>
    );
  }
}

export default connector(App);
