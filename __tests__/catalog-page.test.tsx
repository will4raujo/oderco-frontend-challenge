import CatalogPage from '@/app/(store)/(catalog)/page';
import { describe, it, expect } from 'vitest';
import { render} from '@testing-library/react';

global.ResizeObserver = class {
  callback: any;
  constructor(callback: any) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('CatalogPage', () => {

  it('shold render without errors', async () => {
    const { container } = render(<CatalogPage />);
    expect(container).toBeDefined();
  })
});