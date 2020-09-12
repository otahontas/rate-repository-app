import ApolloClient from 'apollo-boost';
const ip = '192.168.1.178';

const createApolloClient = () => {
  return new ApolloClient({
    uri: `http://${ip}:5000/graphql`,
  });
};

export default createApolloClient;
