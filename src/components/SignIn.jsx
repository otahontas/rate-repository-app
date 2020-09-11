import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 2 * theme.spacing,
    backgroundColor: theme.colors.white
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
  }
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
  });

  const initialValues = {
    username: "",
    password: ""
  };

  return (
     <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
     >
      {({ handleSubmit }) => 
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry />      
          <Button
            title="Sign in"
            style={styles.button}
            onPress={handleSubmit}
          />
        </View>
       }
    </Formik>
  );
};

export default SignIn;
