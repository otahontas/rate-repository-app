import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from './useSignIn';

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const createUser = async ({username, password}) => {
    const { newUserData } = await mutate({ variables: { user: { username, password} }});
    console.log(`Created user with ${newUserData}, logging in`);
    return await signIn({username, password});
  };

  return [createUser, result];
};


export default useCreateUser;
