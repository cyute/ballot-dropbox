import React, { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';

export const OverlayWrapper: FunctionComponent = ({ children }): JSX.Element => {
  return (
    <Container style={{ position: 'absolute' }}>
      {children}
    </Container>
  );
};
