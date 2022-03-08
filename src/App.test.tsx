import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('LoadingButton test', () => {

  test('when start the app, loadingButton should be enabled', () => {
    render(<App />);
    const loadingButton = screen.getByRole('button', { name: 'save-task' });
    expect(loadingButton).toBeEnabled();
  
  
  });
  
  test('when click on loadingButton, loadingButton should be disabled', () => {
    render(<App />);
    const loadingButton = screen.getByRole('button', { name: 'save-task' });
    userEvent.click(loadingButton)
    expect(loadingButton).not.toBeEnabled();
  
  
  });

})
