/* eslint-disable import/first */
import { describe, test, vi } from 'vitest';
import { expectedLoaderData } from '__mock__/loaderData';

vi.doMock('@remix-run/react', async () => {
  const remix = await vi.importActual<typeof import('@remix-run/react')>(
    '@remix-run/react'
  );
  return {
    ...remix,
    useLoaderData: vi.fn().mockReturnValue(expectedLoaderData.index),
    Link: vi.fn(),
  };
});

import { render, screen } from '@testing-library/react';
import Index, { loader } from './index';
import { client } from '~/lib/microcmsClient.server';

afterEach(() => {
  vi.clearAllMocks();
});

describe('index page', () => {
  test('should render', async () => {
    render(<Index />);
    expect(screen.getByRole('heading', { name: /Remix/i })).toBeInTheDocument();
    expect(await screen.findAllByRole('listitem')).toHaveLength(2);
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
    await expect(response.json()).resolves.toEqual(expectedLoaderData.index);
  });
});
