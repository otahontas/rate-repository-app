import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import {useHistory} from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const TouchableRepositoryLink = ({ id, children }) => {
  const history = useHistory();
  return (
     <TouchableOpacity
      onPress={() => history.push(`/repositories/${id}`)}
     >
       {children}
    </TouchableOpacity>
  )
}

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <TouchableRepositoryLink id={item.id}>
          <RepositoryItem repository={item} />
        </TouchableRepositoryLink>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
