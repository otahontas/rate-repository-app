import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

import theme from '../theme';
import Text from './Text';

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

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab linkLocation="/" linkText="Repositories" />
        <AppBarTab linkLocation="/sign-in" linkText="Sign in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
