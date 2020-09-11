import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
  },
  tab: {
    padding: 2 * theme.spacing,
  }
});

const AppBarTab = ({linkLocation, text}) => (
  <Link to={linkLocation} style={styles.tab}>
    <Text fontSize='subheading' fontWeight='bold' color='white' >{text}</Text>
  </Link>
);

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab linkLocation="/" text="Repositories" />
        <AppBarTab linkLocation="/signin" text="Sign in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
