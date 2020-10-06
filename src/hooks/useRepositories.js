import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortMode, first) => {

  let orderBy;
  let orderDirection;
  switch(sortMode) {
    case "latest":
      orderBy = "CREATED_AT";
      orderDirection = "DESC";
      break;
    case "highest":
      orderBy = "RATING_AVERAGE";
      orderDirection = "DESC";
      break;
    case "lowest":
      orderBy = "RATING_AVERAGE";
      orderDirection = "ASC";
      break;
    default:
      orderBy = "CREATED_AT";
      orderDirection = "DESC";
      break;
  }
  const variables = { orderBy, orderDirection, first };

  const { data, fetchMore, loading, ...result } = useQuery(
    GET_REPOSITORIES,
    { variables },
    { fetchPolicy: 'cache-and-network' }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };
  return { 
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore, 
    loading, 
    ...result };
};

export default useRepositories;
