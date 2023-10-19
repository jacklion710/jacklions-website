import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUpPage from './page';
import { auth } from '../../utils/firebase';
import {describe, expect} from '@jest/globals';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React from 'react';

jest.mock('../../utils/firebase', () => ({
  auth: {
    createUserWithEmailAndPassword: jest.fn(),
    sendEmailVerification: jest.fn()
  }
}));

describe('SignUpPage', () => {
  it('renders without crashing', () => {
    render(<SignUpPage />);
  });

  it('allows users to enter their details', async () => {
    const { getByLabelText } = render(<SignUpPage />);
    const usernameInput = getByLabelText('Username');
    const firstNameInput = getByLabelText('First Name');
    const lastNameInput = getByLabelText('Last Name');
    const emailInput = getByLabelText('Email address');
    const phoneNumberInput = getByLabelText('Phone Number (optional)');
    const passwordInput = getByLabelText('Password');
    const emailListCheckbox = getByLabelText('Sign me up for the email list');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'TestPassword1' } });
    fireEvent.click(emailListCheckbox);

    expect((usernameInput as HTMLInputElement).value).toBe('testuser');
    expect((firstNameInput as HTMLInputElement).value).toBe('Test');
    expect((lastNameInput as HTMLInputElement).value).toBe('User');
    expect((emailInput as HTMLInputElement).value).toBe('testuser@example.com');
    expect((phoneNumberInput as HTMLInputElement).value).toBe('1234567890');
    expect((passwordInput as HTMLInputElement).value).toBe('TestPassword1');
    expect((emailListCheckbox as HTMLInputElement).checked).toBe(true);
  });

  it('calls createUserWithEmailAndPassword on form submission', async () => {
    const { getByText, getByLabelText } = render(<SignUpPage />);
    const usernameInput = getByLabelText('Username');
    const firstNameInput = getByLabelText('First Name');
    const lastNameInput = getByLabelText('Last Name');
    const emailInput = getByLabelText('Email address');
    const phoneNumberInput = getByLabelText('Phone Number (optional)');
    const passwordInput = getByLabelText('Password');
    const emailListCheckbox = getByLabelText('Sign me up for the email list');
    const submitButton = getByText('Sign up');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'TestPassword1' } });
    expect((emailListCheckbox as HTMLInputElement).checked).toBe(true);
    fireEvent.click(submitButton);
    expect((auth as any).createUserWithEmailAndPassword).toHaveBeenCalledWith('testuser@example.com', 'TestPassword1');
    expect((auth as any).sendEmailVerification).toHaveBeenCalled();

    await waitFor(() => {
      expect((auth as any).createUserWithEmailAndPassword).toHaveBeenCalledWith('testuser@example.com', 'TestPassword1');
   });
   
  });

  it('calls sendEmailVerification after successful registration', async () => {
    const { getByText, getByLabelText } = render(<SignUpPage />);
    const usernameInput = getByLabelText('Username');
    const firstNameInput = getByLabelText('First Name');
    const lastNameInput = getByLabelText('Last Name');
    const emailInput = getByLabelText('Email address');
    const phoneNumberInput = getByLabelText('Phone Number (optional)');
    const passwordInput = getByLabelText('Password');
    const emailListCheckbox = getByLabelText('Sign me up for the email list');
    const submitButton = getByText('Sign up');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'TestPassword1' } });
    fireEvent.click(emailListCheckbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect((auth as any).sendEmailVerification).toHaveBeenCalled();
   });   
  });
});