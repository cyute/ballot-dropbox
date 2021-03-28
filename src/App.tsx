import React, { CSSProperties } from 'react';
import { GoogleMapWrapper } from './components/map/GoogleMapWrapper';
import { OverlayWrapper } from './components/util/OverlayWrapper';
import { HeroInputContainer } from './components/input/HeroInputContainer';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { InlineIcon } from '@iconify/react';
import closeIcon from '@iconify/icons-fa-solid/window-close';
import searchLocationIcon from '@iconify/icons-fa-solid/search-location';
import questionCircle from '@iconify/icons-fa-solid/question-circle';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHero, clearHome } from './store/user/slice';
import { RootState } from './store/types';
import { UserState } from './store/user/types';
import { useGeocodeHome } from './query/geocode';
import { useIsFetching, useQueryClient } from 'react-query';

export const App = (): JSX.Element => {

  const { isHeroContainerOpen, home } = useSelector<RootState, UserState>(state => state.user);
  const isFetching = useIsFetching();
  const { isError } = useGeocodeHome(home);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const closeError = () => {
    dispatch(clearHome());
    queryClient.resetQueries(['home', home]);
  }

  const HeroCollapseButton = (): JSX.Element => {
    const dispatch = useDispatch();
    const style: CSSProperties = { cursor: 'pointer', color: '#333333' };
    return (
      <div onClick={() => dispatch(toggleHero())} className='float-right'>
        <InlineIcon style={style} className='mt-3 mr-2' icon={closeIcon} /> 
      </div>
    );
  }

  const HeroExpandButton = (): JSX.Element => {
    const dispatch = useDispatch();
    return (
      <Button className='mt-3' variant='dark' size='sm' onClick={() => dispatch(toggleHero())}>
        <InlineIcon icon={searchLocationIcon} /> Open Dropbox Locator
      </Button>
    );
  }

  const LoadingSpinner = (): JSX.Element => {
    const style: CSSProperties = { position: 'fixed', top: '47%', left: '47%' };
    return (
      <Spinner style={style} animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    );
  }

  const Error = (): JSX.Element => {
    const style: CSSProperties = { position: 'fixed', bottom: 5, left: '2%', width: '96%' };
    return (
      <Alert variant='danger' style={style} onClose={() => closeError()} dismissible>
        We were unable to locate the address or city.  Please try again.
      </Alert>
    );
  }

  const FAQLink = (): JSX.Element => {
    const style: CSSProperties = { position: 'fixed', bottom: 5, left: '45%' };
    return (
      <Button variant='dark' size='sm' style={style} onClick={() => window.location.href='/faq.html' }>
        <InlineIcon icon={questionCircle} /> FAQ
      </Button>
    );
  }

  return (
    <React.Fragment>
      <GoogleMapWrapper />
      <OverlayWrapper>
        { isHeroContainerOpen ? <HeroInputContainer /> : null }
      </OverlayWrapper>
      <OverlayWrapper>
        { isHeroContainerOpen ? <HeroCollapseButton /> : <HeroExpandButton />}
      </OverlayWrapper>
      <OverlayWrapper>
        { isFetching ? <LoadingSpinner /> : null }
      </OverlayWrapper>
      <OverlayWrapper>
        { isError ? <Error /> : <FAQLink /> }
      </OverlayWrapper>
    </React.Fragment>
  );
}
