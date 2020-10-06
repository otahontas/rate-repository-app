import { useQuery } from '@apollo/react-hooks';

import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useUserReviews = () => {
  const { data, error, loading, refetch } = useQuery(
    GET_AUTHORIZED_USER,
    { variables: { includeReviews: true }},
    { fetchPolicy: 'cache-and-network' }
  );
  const reviews = data?.authorizedUser?.reviews ?? [];
  return { reviews, error, loading, refetch };
};

export default useUserReviews;
