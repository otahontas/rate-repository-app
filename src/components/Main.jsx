import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import { SingleRepositoryView } from "./RepositoryItem";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NewReview from "./NewReview";
import AppBar from "./AppBar";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/repositories/:id" exact> 
          <SingleRepositoryView />
        </Route>
        <Route path="/new-review" exact> 
          <NewReview />
        </Route>
        <Route path="/sign-in" exact> 
          <SignIn />
        </Route>
        <Route path="/sign-up" exact> 
          <SignUp />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
