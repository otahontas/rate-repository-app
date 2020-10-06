import React from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import { format } from 'date-fns';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import theme from '../theme';
import Text from './Text';
import Button from './Button';
import formatInThousands from '../utils/formatInThousands';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  headerContainer: {
    marginBottom: 10
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
  },
  rating: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderStyle: "solid",
  },
  countItem: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  languageText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);
  const reviewNodes = repository?.reviews?.edges
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (<FlatList
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem = {({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem repository={repository} isHeader githubUrl={repository.url} />}
  />
    );
};

const ReviewItem = ({ review }) => {

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.rating}>
            <Text fontWeight="bold" color="primary">{review.rating}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
          >
            {review.user.username}
          </Text>
          <Text 
            style={styles.descriptionText}
            color="textSecondary"
          >
            {format(new Date(review.createdAt), "dd.mm.yyyy")}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  )
}


const CountItem = ({ label, count }) => {
  return (
    <View style={styles.countItem}>
      <Text style={styles.countItemCount} testID={label} fontWeight="bold">
        {formatInThousands(count)}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ repository, isHeader, githubUrl }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = repository;

  const headerContainerStyle = isHeader ? styles.headerContainer : null;
  const style = {...styles.container, ...headerContainerStyle}

  return (
    <View style={style}>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
            testID="fullName"
          >
            {fullName}
          </Text>
          <Text 
            style={styles.descriptionText}
            color="textSecondary"
            testID="description"
          >
            {description}
          </Text>
          {language ? (
            <View style={styles.languageContainer}>
              <Text 
                style={styles.languageText}
                testID="language"
              >
                {language}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.middleContainer}>
        <CountItem count={stargazersCount} label="Stars" />
        <CountItem count={forksCount} label="Forks" />
        <CountItem count={reviewCount} label="Reviews" />
        <CountItem count={ratingAverage} label="Rating" />
      </View>
      <View>
          {isHeader ?
            <Button onPress={() => Linking.openURL(githubUrl)}>Open in Github</Button>
            : null}
      </View>
    </View>
  );
};

export default RepositoryItem;
