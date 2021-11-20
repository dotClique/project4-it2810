/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik, FormikErrors } from "formik";
import { DocumentNode } from "graphql";
import { useMutationCall } from "helpers/hooks";
import React, { ReactNode } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import styles from "./styles";

type HandleChangeType = {
  (e: React.ChangeEvent<any>): void;
  <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
    ? void
    : (e: string | React.ChangeEvent<any>) => void;
};

type HandleBlurType = {
  (e: React.FocusEvent<any, Element>): void;
  <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
};

type CreationFormProps<T> = {
  children: (params: {
    errors: FormikErrors<T>;
    handleChange: HandleChangeType;
    handleBlur: HandleBlurType;
  }) => ReactNode;
  formInitialValues: T;
  validationSchema?: unknown;
  mutationCall: DocumentNode;
  onCompleted: () => void;
  additionalRequestVariables?: { [key: string]: string | number };
  submitButton?: JSX.Element;
};

/**
 * Component used to handle the top level functionality of forms that create something.
 */
export default function CreationForm<T>(props: CreationFormProps<T>) {
  // Hook to handle the creation request to hte graphql api.
  const [performMutation, { loading }] = useMutationCall(props.mutationCall, props.onCompleted);

  // Using Formik to handle form state management, errors, validation and submit.
  return (
    <View>
      <Formik
        initialValues={props.formInitialValues}
        onSubmit={(values: T) =>
          performMutation({ ...values, ...props.additionalRequestVariables })
        }
        validationSchema={props.validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, handleSubmit, handleChange, handleBlur }) => (
          <Form>
            <View style={styles.formContainer}>
              {props.children({ errors, handleChange, handleBlur })}
              {props.submitButton || (
                <Button
                  onPress={handleSubmit}
                  mode="contained"
                  disabled={loading}
                  loading={loading}
                >
                  Submit
                </Button>
              )}
              {/* Loading icon if applicable */}
            </View>
          </Form>
        )}
      </Formik>
    </View>
  );
}
