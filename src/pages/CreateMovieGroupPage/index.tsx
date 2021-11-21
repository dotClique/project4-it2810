import { StackScreenProps } from "@react-navigation/stack";
import CreationForm from "components/CreationForm";
import * as React from "react";
import FormField from "src/components/FormField";
import { CREATE_MOVIE_GROUP } from "src/helpers/graphql-queries";
import { ParamList } from "types/navigation";
import * as yup from "yup";
import PageContainer from "../../components/PageContainer/index";

type Props = StackScreenProps<ParamList, "CreateMovieEventPage">;

// Defining the form fields.
enum FormNames {
  name = "name",
  description = "description",
}

const formInitialValues = {
  name: "",
  description: "",
};

// The schema used to validate the form.
const validationSchema = yup.object({
  name: yup.string().min(3, "Min 3 characters").required("Required"),
  description: yup.string().notRequired(),
});

export default function CreateMovieGroupPage({ navigation }: Props) {
  return (
    <PageContainer title="Create Movie Group">
      <CreationForm
        formInitialValues={formInitialValues}
        mutationCall={CREATE_MOVIE_GROUP}
        validationSchema={validationSchema}
        onCompleted={() => navigation.navigate("MovieGroupsPage")}
      >
        <FormField name={FormNames.name} label="Name of group" />
        <FormField name={FormNames.description} label="Description of group" numberOfLines={4} />
      </CreationForm>
    </PageContainer>
  );
}
