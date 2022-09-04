import { json, LoaderArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { client } from '~/lib/microcmsClient.server';
import parse from 'html-react-parser';
import type { Content } from '~/types';

export const meta: MetaFunction = ({ data }: { data?: Content }) => {
  return { title: data?.title ?? 'Not Found' };
};

export const loader = async ({ params }: LoaderArgs) => {
  const content = await client
    .get<Content>({
      endpoint: 'blog',
      contentId: params.postId,
    })
    .catch(() => {
      throw new Response('Content Not Found.', {
        status: 404,
      });
    });

  return json({ content });
};

export default function PostsId() {
  const { content } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{content.title}</h1>
      <div>
        <img src={content.image.url} alt="" />
      </div>
      <div>{parse(content.body)}</div>
    </div>
  );
}
