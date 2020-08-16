import React from 'react';
import Container from 'react-bootstrap/Container';

export class OverlayWrapperComponent extends React.Component {
  render() {
    return (
    <Container style={{ position: 'absolute' }}>
      { this.props.children }
    </Container>
    );
  }
}