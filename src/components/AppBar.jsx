import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRightWidth: 1
  },
  tab: {
    padding: 2 * theme.spacing,
  }
});

const AppBarTab = ({text}) => (
  <View style={styles.tab}>
    <TouchableWithoutFeedback>
      <Text fontSize='subheading' fontWeight='bold' color='white' >{text}</Text>
    </TouchableWithoutFeedback>
  </View>
  )

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text="Repositories" />
    </View>
  );
};

export default AppBar;
