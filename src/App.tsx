import React from 'react';
import './App.css';
import { MapComponent } from './components/MapComponent';
import { OverlayWrapperComponent } from './components/OverlayWrapperComponent';
import Jumbotron from 'react-bootstrap/Jumbotron';

function App() {
  return (
    <React.Fragment>
      <MapComponent />
      <OverlayWrapperComponent>
        <Jumbotron className='mt-2' style={{ backgroundColor: 'white', opacity: .75 }}>
          <h1>Michigan Ballot Drop Box Locator</h1>
          <p>
            This will be a simple tool that allows you to locate your ballot drop box based on
            your home address.
          </p>
        </Jumbotron>
      </OverlayWrapperComponent>
    </React.Fragment>
  );
}

export default App;
