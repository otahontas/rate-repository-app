import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { format } from 'date-fns';

import theme from '../theme';
import Text from './Text';
import useUserReviews from '../hooks/useUserReviews';
import useDeleteReview from '../hooks/useDeleteReview';
import Button from './Button';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
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
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { reviews, refetch } = useUserReviews();
  const reviewNodes = reviews?.edges
    ? reviews.edges.map((edge) => edge.node)
    : [];

  return (<FlatList
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem = {({ item }) => <ReviewItem review={item} refetch={refetch}/>}
            keyExtractor={({ id }) => id}
  />);
};

const ReviewItem = ({ review, refetch }) => {

  const [deleteReview ] = useDeleteReview();
  const handleDelete = async () => {
    const { data } = await deleteReview(review.id);
    console.log(`Result of deletion ${data}`);
    if (data.deleteReview) {
      await refetch();
    }
  };

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
            {review.repository.name}
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
        <View style={styles.buttonRow}>
          <Link 
            to={`/repositories/${review.repository.id}`} 
            component={Button}
            style={styles.button}
          >
              View repository
          </Link>
          <Button style={{
            ...styles.button, 
            backgroundColor: "red"
          }}
            onPress={handleDelete}
          >
            Delete review
          </Button>
        </View>
    </View>
  );
};

export default MyReviews;
