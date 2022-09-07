import { postRepository } from '~/repository/postRepository.server';

export const getPostList = async () => {
  const { getList } = postRepository();
  const contents = await getList();
  return contents;
};
