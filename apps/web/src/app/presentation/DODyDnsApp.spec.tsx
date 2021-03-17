import React from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import { DODyDnsApp } from './DODyDnsApp';

describe('DODyDnsApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <DODyDnsApp />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });

  // it('should have a greeting as the title', () => {
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   );
  //
  //   expect(getByText('Welcome to web!')).toBeTruthy();
  // });
});
