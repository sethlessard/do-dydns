import React from 'react';
import { render } from '@testing-library/react';
import DODynDnsApp from './DODynDnsApp';

test('renders learn react link', () => {
  const { getByText } = render(<DODynDnsApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
