import * as React from "react";

import { ParamList } from "types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Subheading } from "react-native-paper";
import PageContainer from "components/PageContainer";
import { useState } from "react";
import { GET_MOVIE_GROUP } from "helpers/graphql-queries";
import EventTable from "components/EventTable";
import EventFilter from "components/EventFilter";
import { useQueryCall } from "helpers/hooks";
import { MovieGroup } from "helpers/types";
type Props = StackScreenProps<ParamList, "MovieGroupPage">;

export default function MovieGroupPage({ route, navigation }: Props) {
  const { movieGroupId } = route.params;
  const [call, { data: dataGroup }] = useQueryCall<MovieGroup>(
    GET_MOVIE_GROUP,
    false,
    () => {},
    false,
    { variables: { movieGroupId: String(movieGroupId) } },
  );
  const [searchString, setSearchString] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("0000-12-30T23:59:59.999Z"); //new Date().toISOString());
  const [toDate, setToDate] = useState<string>("9999-12-30T23:59:59.999Z");

  return (
    <PageContainer
      title={dataGroup ? dataGroup.movieGroup.name : "Kunne ikke laste inn"}
      footer={
        <>
          <Button
            mode={"contained"}
            onPress={() => {
              navigation.goBack();
            }}
          >
            Go back
          </Button>
          <Button
            mode={"contained"}
            onPress={() => {
              navigation.navigate("CreateMovieEventPage", { movieGroupId });
            }}
          >
            Create new event
          </Button>
        </>
      }
    >
      <Subheading>
        {dataGroup ? dataGroup.movieGroup.description : "Kunne ikke laste inn"}
      </Subheading>
      <EventFilter
        setSearchString={setSearchString}
        setToDate={setToDate}
        setFromDate={setFromDate}
      />
      <EventTable
        id={movieGroupId}
        searchString={searchString}
        toDate={toDate}
        fromDate={fromDate}
        navigation={navigation}
      />
    </PageContainer>
  );
}
