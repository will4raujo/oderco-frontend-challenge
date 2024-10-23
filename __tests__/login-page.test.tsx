import LoginPage from '@/app/login/page';
import { describe, it, expect } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

global.ResizeObserver = class {
  callback: any;
  constructor(callback: any) {
    this.callback = callback;
  }
  observe() { }
  unobserve() { }
  disconnect() { }
};

describe('LoginPage', () => {

  it('should render without errors', async () => {
    const { container } = render(<LoginPage />);
    expect(container).toBeDefined();
  });

  it('should handle user input', async () => {
    const { getByLabelText } = render(<LoginPage />);
    
    const emailInput = getByLabelText('Emais');
    const passwordInput = getByLabelText('Senha');
    
    fireEvent.change(emailInput, {target: { value: 'user@example.com'} });
    fireEvent.change(passwordInput, {target: { value: '12345678'} });

    });
});