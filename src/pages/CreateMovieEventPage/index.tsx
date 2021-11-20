import { StackScreenProps } from "@react-navigation/stack";
import CreationForm from "components/CreationForm";
import * as React from "react";
import FormField from "src/components/FormField";
import { CREATE_MOVIE_EVENT } from "src/helpers/graphql-queries";
import { ParamList } from "types/navigation";
import * as yup from "yup";
import FormDateTime from "../../components/FormDateTime/index";
import PageContainer from "../../components/PageContainer/index";

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

export default function CreateMovieEventPage({ navigation, route }: Props) {
  const { movieGroupId } = route.params;

  return (
    <PageContainer title="Create Movie Event">
      <CreationForm
        formInitialValues={formInitialValues}
        mutationCall={CREATE_MOVIE_EVENT}
        validationSchema={validationSchema}
        onCompleted={() => navigation.goBack()}
        additionalRequestVariables={{ movieGroupId }}
      >
        {/* TODO: Use Autocomplete! */}
        <FormField name={FormNames.title} label="Title" />
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
