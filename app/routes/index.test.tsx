import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Index, { loader } from './index';

describe('index page', () => {
  test('should render', async () => {
    render(<Index />);
    expect(screen.getByRole('heading', { name: /Remix/i })).toBeInTheDocument();
  });
});

describe('loader', () => {
  const expectedLoaderData = {
    message: 'Hello World',
  };
  it('should return a response', async () => {
    const response = await loader();

    expect(response).toBeInstanceOf(Response);
    expect(response).toBeOk();
    await expect(response.json()).resolves.toEqual(expectedLoaderData);
  });
});
