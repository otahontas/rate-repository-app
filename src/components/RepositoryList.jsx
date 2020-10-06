import React, { useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  select: {
    padding: 10,
  }
});

const TouchableRepositoryLink = ({ id, children }) => {
  const history = useHistory();
  return (
    <TouchableOpacity
      onPress={() => history.push(`/repositories/${id}`)}
    >
      {children}
    </TouchableOpacity>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onEndReach, sortMode, setSortMode }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={() => <RepositoryOrderSelection sortMode={sortMode} setSortMode={setSortMode} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <TouchableRepositoryLink id={item.id}>
          <RepositoryItem repository={item} />
        </TouchableRepositoryLink>
      )}
    />
  );
};

const RepositoryOrderSelection = ({ sortMode, setSortMode }) => {
  const labels = {
    'latest': 'Latest repositories',
    'highest': 'Highest rated repositories',
    'lowest': 'Lowest rated repositorires'
  };
  return (
    <View
      style={styles.select}
    >
      <RNPickerSelect
        onValueChange={(value) => setSortMode(value)}
        items={[
          { label: labels['latest'], value: 'latest' },
          { label: labels['highest'], value: 'highest' },
          { label: labels['lowest'], value: 'lowest' },
        ]}
        value={sortMode}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [sortMode, setSortMode] = useState(null);
  const { repositories, fetchMore } = useRepositories(sortMode, 8);
  const onEndReach = () => {
    fetchMore();
  };
  return <RepositoryListContainer onEndReach={onEndReach} repositories={repositories} sortMode={sortMode} setSortMode={setSortMode} />;
};

export default RepositoryList;
