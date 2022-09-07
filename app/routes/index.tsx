import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getPostList } from '~/usecase/post';

export const loader = async () => {
  const contents = await getPostList();
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
