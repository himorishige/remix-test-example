import { client } from '~/lib/microcmsClient.server';
import type { Content } from '~/types';

export const postRepository = () => {
  const getList = async () => {
    const { contents } = await client.getList<Content>({
      endpoint: 'blog',
    });
    return contents;
  };

  return { getList };
};
