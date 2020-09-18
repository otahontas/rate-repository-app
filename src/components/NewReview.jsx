import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useHistory } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup';

import Button from './Button';
import FormikTextInput from './FormikTextInput';
import useCreateReview from "../hooks/useCreateReview";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});


const NewReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput 
          name="ownerName" 
          placeholder="Repository owner name" 
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="repositoryName"
          placeholder="Repository name"
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="rating"
          type="number"
          placeholder="Rating between 0 and 100"
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="text"
          placeholder="Review"
        />
      </View>
      <Button onPress={onSubmit}>Create a Review</Button>
    </View>
  );
};

export const NewReviewFormContainer = ({ onSubmit }) => {
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: undefined,
    text: '',
  };
  
  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup.number()
              .required('Repository rating is required')
              .min(0, 'Rating should be 0 or more')
              .max(100, 'Rating should be 100 or less')
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <NewReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const NewReview = () => {
  const history = useHistory();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    const ratingAsNumber = Number(rating);
    const review = { repositoryName, ownerName, rating: ratingAsNumber, text };
    try {
      const { data } = await createReview(review);
      if (data) {
        const id = data.createReview.repositoryId;
        history.push(`/repositories/${id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <NewReviewFormContainer onSubmit={onSubmit} />;
};

export default NewReview;
