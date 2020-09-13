import { useQuery } from '@apollo/react-hooks';

import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = () => {
  const { data, error, loading } = useQuery(
    GET_AUTHORIZED_USER,
    { fetchPolicy: 'cache-and-network' }
  );
  const authorizedUser = data?.authorizedUser ?? null;
  return { authorizedUser, error, loading };
};

export default useAuthorizedUser;
