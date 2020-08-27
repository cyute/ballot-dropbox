import React from 'react';
import Container from 'react-bootstrap/Container';

export class OverlayWrapper extends React.Component {
  render() {
    return (
      <Container style={{ position: 'absolute' }}>
        {this.props.children}
      </Container>
    );
  }
}