import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../../components/signUp';
import { toast } from 'react-toastify';
import store from '../../app/store'; 

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Mock the authSlice module
vi.mock('../../slices/auth/authSlice', async () => {
  const actual = await vi.importActual<typeof import('../../slices/auth/authSlice')>('../../slices/auth/authSlice');

  return {
    ...actual, // Spread actual exports
    default: vi.fn(() => actual.default), // Mock default export properly
    register: vi.fn((userData) => async (dispatch) => {
      dispatch({ type: 'auth/register/pending' });
      await Promise.resolve(); // Simulate async behavior
      dispatch({ type: 'auth/register/fulfilled', payload: userData });
    }),
    reset: vi.fn(() => ({ type: 'auth/reset' })), // Mock reset action
  };
});


describe('SignUp Component', () => {
  it('submits the form and dispatches register action when all data is provided', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp onToggle={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('johndoe@google.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('re-enter password'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Verify that the register action was called with the correct data
    await waitFor(() => {
      const authSlice = require('../../slices/auth/authSlice');
      expect(authSlice.register).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('shows an error if required data is missing', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp onToggle={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );

    // Submit the form without filling out any fields
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Verify that the error toast is shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('provide all details');
    });
  });
});