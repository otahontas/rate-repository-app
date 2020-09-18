import { useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { credentials: { username, password }}});
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    return { data };
  };

  return [signIn, result];
};


export default useSignIn;
