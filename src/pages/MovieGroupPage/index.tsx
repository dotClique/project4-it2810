import * as React from "react";

import { ParamList } from "types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Paragraph, Subheading } from "react-native-paper";
import PageContainer from "components/PageContainer";
import { useState } from "react";
import { GET_MOVIE_GROUP } from "helpers/graphql-queries";
import { useQuery } from "@apollo/client";
import EventTable from "components/EventTable";
import EventFilter from "components/EventFilter";
type Props = StackScreenProps<ParamList, "MovieGroupPage">;

export default function MovieGroupPage({ route, navigation }: Props) {
  const { MovieGroupId } = route.params;
  const { data: dataGroup } = useQuery(GET_MOVIE_GROUP, {
    variables: { movieGroupId: String(MovieGroupId) },
    fetchPolicy: "cache-first",
  });
  const [searchString, setSearchString] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("0000-12-30T23:59:59.999Z"); //new Date().toISOString());
  const [toDate, setToDate] = useState<string>("9999-12-30T23:59:59.999Z");

  return (
    <PageContainer
      title={"Group Page"}
      navigation={navigation}
      footer={
        <Button
          mode={"contained"}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Go back
        </Button>
      }
    >
      <Subheading> {dataGroup ? dataGroup.movieGroup.name : "Kunne ikke laste inn"}</Subheading>
      <Paragraph>{dataGroup ? dataGroup.movieGroup.description : "Kunne ikke laste inn"}</Paragraph>
      <EventFilter
        setSearchString={setSearchString}
        setToDate={setToDate}
        setFromDate={setFromDate}
      />
      <EventTable
        id={MovieGroupId}
        searchString={searchString}
        toDate={toDate}
        fromDate={fromDate}
        navigation={navigation}
      />
    </PageContainer>
  );
}
