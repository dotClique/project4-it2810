import { StackScreenProps } from "@react-navigation/stack";
import CreationForm from "components/CreationForm";
import React, { useEffect, useState } from "react";
import FormDateTime from "src/components/FormDateTime";
import FormField from "src/components/FormField";
import { CREATE_MOVIE_EVENT, GET_MOVIES } from "src/helpers/graphql-queries";
import { useQueryCall } from "src/helpers/hooks";
import { Movie, Movies } from "src/helpers/types";
import { ParamList } from "types/navigation";
import * as yup from "yup";
import FormAutocomplete from "../../components/FormAutocomplete/index";
import PageContainer from "../../components/PageContainer/index";
import { View } from "react-native";

type Props = StackScreenProps<ParamList, "CreateMovieEventPage">;

// The names of the form fields.
enum FormNames {
  title = "title",
  description = "description",
  location = "location",
  date = "date",
}

const formInitialValues = {
  title: "",
  description: "",
  location: "",
  date: "",
};

// Schema used to validate the form.
const validationSchema = yup.object({
  title: yup.string().min(3, "Min 3 characters").required("Required"),
  description: yup.string().notRequired(),
  location: yup.string().min(5, "Minimum 5 characters").required("Required"),
  date: yup.date().required("Required"),
});

const pageSize = 20;

export default function CreateMovieEventPage({ navigation, route }: Props) {
  const { movieGroupId } = route.params;
  const [searchString, setSearchString] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [, { data, loading, refetch }] = useQueryCall<Movies>(GET_MOVIES, false, undefined, false, {
    pageSize,
    searchString,
  });

  useEffect(() => {
    if (data && !loading) {
      setMovies(data.movies);
    }
  }, [data]);
  useEffect(() => {
    refetch?.({ pageSize, searchString });
  }, [searchString]);

  return (
    <PageContainer title="Create Movie Event">
      <CreationForm
        formInitialValues={formInitialValues}
        mutationCall={CREATE_MOVIE_EVENT}
        validationSchema={validationSchema}
        onCompleted={() => navigation.goBack()}
        additionalRequestVariables={{ movieGroupId }}
      >
        <FormAutocomplete
          name={FormNames.title}
          label="Title"
          loading={loading}
          data={movies}
          keyExtractor={(item, index) => `${item.primarytitle}${index}`}
          textExtractor={(item) => item.primarytitle}
          onChangeText={(text: string) => {
            setSearchString(text);
          }}
        />
        <FormField
          name={FormNames.description}
          label="Description of the movie event"
          numberOfLines={4}
        />
        <FormField name={FormNames.location} label="Location" />
        <FormDateTime name={FormNames.date} />
      </CreationForm>
    </PageContainer>
  );
}
