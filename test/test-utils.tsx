/* eslint-disable no-undef */
import { cleanup, render, RenderOptions } from '@testing-library/react';
// import { useRouter } from 'next/router';
import { jest } from '@jest/globals';

import { ToastProvider } from '@/contexts/toastContext';
import ReactQueryProvider from '@/components/ReactQueryProvider';

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';

afterEach(() => {
  cleanup();
});

// next/navigation 모킹
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}));

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ToastProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

//override render export
export { customRender as render };
