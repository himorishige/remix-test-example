import { describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Index, { loader } from './index';
import { client } from '~/lib/microcmsClient.server';
import { expectedLoaderData } from '__mock__/loaderData';

afterEach(() => {
  vi.clearAllMocks();
});

describe('index page', () => {
  test('should render', async () => {
    render(<Index />);
    expect(screen.getByRole('heading', { name: /Remix/i })).toBeInTheDocument();
  });
});

describe('loader', () => {
  const spy = vi.spyOn(client, 'getList');
  spy.mockResolvedValue({
    contents: expectedLoaderData.index.contents,
    totalCount: 2,
    limit: 0,
    offset: 0,
  });

  it('should return a response', async () => {
    const response = await loader();

    expect(response).toBeInstanceOf(Response);
    expect(response).toBeOk();
    await expect(response.json()).resolves.toEqual(
      expectedLoaderData.index.contents
    );
  });
});
