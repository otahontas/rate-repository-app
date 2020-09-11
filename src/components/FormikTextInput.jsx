import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: theme.spacing,
    marginBottom: theme.spacing,
    color: theme.colors.error
  },
  textField: {
    borderRadius: theme.roundness,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 2 * theme.spacing,
    marginTop: theme.spacing,
    marginBottom: theme.spacing,
  },
  errorBorder: {
    borderColor: theme.colors.error,
  },
  normalBorder: {
    borderColor: theme.colors.mainBackground,
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const fieldStyle= [
    styles.textField,
    showError ? styles.errorBorder : styles.normalBorder,
  ];

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
        style={fieldStyle}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
