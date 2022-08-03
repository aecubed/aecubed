import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import App from '../client/components/App';

describe('Unit testing React components', () => {
  describe('Nav bar', () => {
    let text;
    beforeAll(()=> {
      text = render(<App />);
    });
    
    it('Renders a logo with a navbar', () => {
      expect(text.getByText('Home')).toHaveAttribute('href', '/');
      expect(text.getByText('About')).toHaveAttribute('href', '/about');
    });
});

});