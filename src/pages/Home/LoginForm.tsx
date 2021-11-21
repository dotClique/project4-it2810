import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import FormField from "components/FormField/index";
import { Formik } from "formik";
import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { ADD_OR_GET_USER, GET_USER } from "src/helpers/graphql-queries";
import { useAlias, useMutationCall, useQueryCall } from "src/helpers/hooks";
import { UserData } from "src/helpers/types";
import { ParamList } from "src/types/navigation";
import * as yup from "yup";
import { CreateUserOrCheckIfExists } from "../../helpers/types";

const formInitialValues = {
  alias: "",
};

const validationSchema = yup.object({
  alias: yup.string().min(3).required("Required"),
});

const loginNavigate = (navigation: StackNavigationProp<ParamList>, hasFavorites: boolean) => {
  if (hasFavorites) {
    navigation.navigate("FavoriteGroupsPage");
  } else {
    navigation.navigate("MovieGroupsPage");
  }
};

export default function LoginForm() {
  const navigation = useNavigation<StackNavigationProp<ParamList>>();
  const [alias, setAlias] = useAlias();
  const [addOrGetUser, { data, loading, error }] =
    useMutationCall<CreateUserOrCheckIfExists>(ADD_OR_GET_USER);
  const [getUser, { data: userData }] = useQueryCall<UserData>(GET_USER, true);

  // Fetch data about the user if already logged in
  useEffect(() => {
    if (alias) {
      getUser({ variables: { alias } });
    }
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (alias && userData) {
      loginNavigate(navigation, userData.user.userHasFavorites);
    }
  }, [userData]);

  // Redirect if successfully logged inn
  useEffect(() => {
    if (!loading && data && !error) {
      setAlias(data.createUserOrCheckIfExists.alias);
      loginNavigate(navigation, data.createUserOrCheckIfExists.userHasFavorites);
    }
  }, [loading, data, error]);

  // Adds the user if not not already registered, gets them if else
  const handleSubmit = useCallback(({ alias }: typeof formInitialValues) => {
    addOrGetUser({ variables: { alias } });
  }, []);

  return (
    <View>
      <Formik
        initialValues={formInitialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleSubmit }) => (
          <View>
            <FormField label="Alias" name="alias" />
            <Button mode="contained" onPress={handleSubmit} loading={loading}>
              Enter
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}
