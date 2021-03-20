import React from 'react';

export const Title = (): JSX.Element => {
  return (
    <React.Fragment>
      <h1 className='d-none d-sm-block display-4'>Ballot Drop Box Locator</h1>
      <h1 style={{ fontSize: '1.75em' }} className='d-block d-sm-none display-4'>Ballot Drop Box Locator</h1>
    </React.Fragment>
  )
}