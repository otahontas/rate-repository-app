import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, error, loading } = useQuery(
    GET_REPOSITORY,
    { variables: { id }},
    { fetchPolicy: 'cache-and-network' }
  );
  const repository = data?.repository ?? [];
  return { repository, error, loading };
};

export default useRepository;
