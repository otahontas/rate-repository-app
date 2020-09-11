import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';

const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 4 * theme.spacing,
    backgroundColor: theme.colors.white,
  },
});

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'space-between',
    flexGrow: 1,
    paddingBottom: 2 * theme.spacing,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 2 * theme.spacing,
  },
  infoContainer: {
    flexGrow: 1,
    width: '90%',
  },
  infoItem: {
    paddingBottom: theme.spacing / 2,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    display: 'inline-flex',
    borderRadius: 5,
    padding: theme.spacing
  }
});

const CardHeader = ({imageUrl, fullName, description, language} ) => {
  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.avatarContainer}>
        <Image style={cardHeaderStyles.avatar} source={imageUrl} />
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading" style={cardHeaderStyles.infoItem}>{fullName}</Text>
        <Text color="textSecondary" style={cardHeaderStyles.infoItem}>{description}</Text>
        <Text><Text style={cardHeaderStyles.language}>{language}</Text></Text>
      </View>
    </View>
  );
};

const cardContentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  box: {
    flexGrow: 0,
  },
});


const CardContentBox = ({ primaryText, secondaryText } ) => {
  return (
    <View style={cardContentStyles.box}>
      <Text fontWeight="bold" style={cardContentStyles.actionText}>
        {primaryText}
      </Text>
      <Text color="textSecondary" style={cardContentStyles.actionText}>
        {secondaryText}
      </Text>
    </View>
  )
};

const CardContent = ({stars, forks, reviews, ratings}) => {
  if (stars > 1000) {
    stars = stars / 1000
    stars = `${stars.toFixed(1)}k`
  }
  if (forks > 1000) {
    forks = forks / 1000
    forks = `${forks.toFixed(1)}k`
  }
  return (
    <View style={cardContentStyles.container}>
      <CardContentBox primaryText={stars} secondaryText="Stars" />
      <CardContentBox primaryText={forks} secondaryText="Forks" />
      <CardContentBox primaryText={reviews} secondaryText="Reviews" />
      <CardContentBox primaryText={ratings} secondaryText="Rating" />
    </View>
  );
};


const RepositoryItem = ({item}) => {
  const { fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage, ownerAvatarUrl } = item;
  return (
  <View style={cardStyles.container}>
    <CardHeader imageUrl={ownerAvatarUrl} fullName={fullName} description={description} language={language} />
    <CardContent stars={stargazersCount} forks={forksCount} reviews={reviewCount} ratings={ratingAverage} />
  </View>
);
}

export default RepositoryItem;
