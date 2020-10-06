import React from 'react';
import { View, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import { Link, useHistory } from 'react-router-native';
import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';

import theme from '../theme';
import Text from './Text';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 3 * theme.spacing,
    paddingVertical: 4 * theme.spacing,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  },
});

const AppBarTab = ({ children, ...props }) => {
  return (
    <TouchableWithoutFeedback style={styles.tabTouchable} {...props}>
      <View style={styles.tabContainer}>
        <Text fontWeight="bold" style={styles.tabText}>
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const history = useHistory();
  const { authorizedUser } = useAuthorizedUser();

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <Link to="/" component={AppBarTab}>
          Repositories
        </Link>
        {authorizedUser ? (
          <>
            <Link to="/new-review" component={AppBarTab}>
              Create a review
            </Link>
            <Link to="/my-reviews" component={AppBarTab}>
              My reviews
            </Link>
            <AppBarTab onPress={onSignOut}>Sign out</AppBarTab>
          </>
        ) : (
          <>
            <Link to="/sign-in" component={AppBarTab}>
              Sign in
            </Link>
            <Link to="/sign-up" component={AppBarTab}>
              Sign up
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
