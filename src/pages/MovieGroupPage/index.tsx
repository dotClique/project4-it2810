import * as React from "react";

import { ParamList } from "types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Subheading } from "react-native-paper";
import PageContainer from "components/PageContainer";
import { useState } from "react";
import { GET_MOVIE_GROUP } from "helpers/graphql-queries";
import EventTable from "components/EventTable";
import EventFilter from "components/EventFilter";
import { View } from "react-native";
import { useQueryCall } from "helpers/hooks";
import { MovieGroup } from "helpers/types";
type Props = StackScreenProps<ParamList, "MovieGroupPage">;

export default function MovieGroupPage({ route, navigation }: Props) {
  const { MovieGroupId } = route.params;
  const [call, { data: dataGroup }] = useQueryCall<MovieGroup>(GET_MOVIE_GROUP, false, () => {}, {
    variables: { movieGroupId: String(MovieGroupId) },
    fetchPolicy: "cache-first",
  });
  const [searchString, setSearchString] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("0000-12-30T23:59:59.999Z"); //new Date().toISOString());
  const [toDate, setToDate] = useState<string>("9999-12-30T23:59:59.999Z");

  return (
    <PageContainer
      title={dataGroup ? dataGroup.movieGroup.name : "Kunne ikke laste inn"}
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
      <View>
        <Subheading>
          {dataGroup ? dataGroup.movieGroup.description : "Kunne ikke laste inn"}
        </Subheading>
      </View>
      <View>
        <EventFilter
          setSearchString={setSearchString}
          setToDate={setToDate}
          setFromDate={setFromDate}
        />
      </View>
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
