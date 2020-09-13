import React from 'react';
import { View, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
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

const AppBarTab = ({ linkLocation, linkText }) => {
  return (
    <Link to={linkLocation} style={styles.tabContainer}>
      <Text fontWeight='bold' style={styles.tabText}>{linkText}</Text>
    </Link>
  );
};

const SignOutTab = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const history = useHistory();
  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  };
  return (
    <TouchableHighlight style={styles.tabContainer} onPress={signOut}>
      <Text fontWeight='bold' style={styles.tabText}>Sign out</Text>
    </TouchableHighlight>
  );
};

const AppBar = () => {
  const { authorizedUser } = useAuthorizedUser();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab linkLocation="/" linkText="Repositories" />
        {authorizedUser 
          ? <SignOutTab />
          : <AppBarTab linkLocation="/sign-in" linkText="Sign in" />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
