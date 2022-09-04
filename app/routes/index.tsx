import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { client } from '~/lib/microcmsClient.server';
import type { Content } from '~/types';

export const loader = async () => {
  const { contents } = await client.getList<Content>({
    endpoint: 'blog',
  });
  return json({ contents });
};

export default function Index() {
  const { contents } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Welcome to Remix</h1>
      <ul>
        {contents.map((content) => (
          <li key={content.id}>
            <Link to={`/posts/${content.id}`}>{content.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
