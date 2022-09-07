/* eslint-disable import/first */
import { describe, test, vi } from 'vitest';
import { expectedLoaderData } from '__mock__/loaderData';

vi.doMock('@remix-run/react', async () => {
  const remix = await vi.importActual<typeof import('@remix-run/react')>(
    '@remix-run/react'
  );
  return {
    ...remix,
    useLoaderData: vi.fn().mockReturnValue(expectedLoaderData.posts.$postId),
    Link: vi.fn(),
  };
});

import { render, screen } from '@testing-library/react';
import Index, { loader } from './$postId';
import { client } from '~/lib/microcmsClient.server';

afterEach(() => {
  vi.clearAllMocks();
});

describe('index page', () => {
  test('should render', async () => {
    render(<Index />);
    expect(
      screen.getByRole('heading', { name: /ブログのタイトル/i })
    ).toBeInTheDocument();
    expect(await screen.findAllByRole('img')).toHaveLength(2);
  });
});

describe('loader', () => {
  const spy = vi.spyOn(client, 'get');
  test('should return a response', async () => {
    spy.mockResolvedValue(expectedLoaderData.posts.$postId.content);

    const response = await loader({
      request: new Request('/posts/f-zns4l3ml'),
      params: {
        postId: 'f-zns4l3ml',
      },
      context: {},
    });

    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(200);

    await expect(response.json()).resolves.toEqual(
      expectedLoaderData.posts.$postId
    );
  });

  test('should return a response with 404', async () => {
    spy.mockRejectedValue(new Response('Content Not Found.', { status: 404 }));

    await expect(loader).rejects.toThrowError();
  });
});
