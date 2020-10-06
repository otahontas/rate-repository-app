import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, first) => {
  const variables = { id, first }
  const { data, fetchMore, loading, ...result } = useQuery(
    GET_REPOSITORY,
    { variables },
    { fetchPolicy: 'cache-and-network' }
  );
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges
              ],
            },
          }
        };

        return nextResult;
      },
    });
  };
  return { 
    repository: data?.repository ?? [],
    fetchMore: handleFetchMore, 
    loading, 
    ...result };
};

export default useRepository;
