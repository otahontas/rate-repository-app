import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import {useHistory} from 'react-router-native';
import RNPickerSelect from 'react-native-picker-select';

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
      ListHeaderComponent={() => <RepositoryOrderSelection />}
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

const RepositoryOrderSelection = () => {
  return (
   <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
