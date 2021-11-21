import * as React from "react";
import { GET_MOVIE_GROUP_EVENTS } from "helpers/graphql-queries";
import { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamList } from "types/navigation";
import { DataTable, Text } from "react-native-paper";
import EventTableSortHeader from "components/EventTableSortHeader";
import { useAlias, useQueryCall } from "helpers/hooks";
import { MovieGroupEvents } from "helpers/types";

const optionsPerPage = [3, 4, 5, 10, 15, 20];

type Props = {
  id: string;
  searchString: string;
  fromDate: string;
  toDate: string;
  navigation: StackNavigationProp<ParamList>;
};

export default function EventTable(props: Props) {
  const [count, setCount] = useState<number>(3);
  const [page, setPage] = useState<number>(0);
  const alias = useAlias()[0];
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [sortBy, setSortBy] = useState<{ id: string; direction: "desc" | "asc" }>({
    id: "DATE",
    direction: "asc",
  });
  const [pageSize, setPageSize] = useState(3);

  const [call, { data: dataEvents }] = useQueryCall<MovieGroupEvents>(
    GET_MOVIE_GROUP_EVENTS,
    false,
    () => {},
    false,
    {
      variables: {
        movieGroupId: String(props.id),
        sortBy: sortBy.id,
        searchString: props.searchString,
        pageSize,
        fromDate: props.fromDate,
        page: page + 1,
        toDate: props.toDate,
        alias,
        asc: sortBy.direction === "asc",
      },
    },
  );

  // calls the query again if any values that alters the expected output of the query is updated
  useEffect(() => {
    call({
      variables: {
        movieGroupId: String(props.id),
        sortBy: sortBy.id,
        searchString: props.searchString,
        pageSize,
        fromDate: props.fromDate,
        page: page + 1,
        toDate: props.toDate,
        alias,
        asc: sortBy.direction === "asc",
      },
    });
  }, [props.fromDate, props.toDate, props.searchString, pageSize, sortBy]);

  useEffect(() => {
    setCount(dataEvents ? dataEvents.movieEventCount : count);
  }, [dataEvents]);

  useEffect(() => {
    setNumberOfPages(count / pageSize);
  }, [count, pageSize]);

  return (
    <DataTable
      style={
        //because anchor in EventFilter menu button is positioned absolutely, we need to make sure that proper distance is upheld
        dataEvents
          ? { marginTop: (5 - dataEvents.movieEvents.length) * (38 / 8) }
          : { marginTop: 38 }
      }
    >
      <DataTable.Header>
        <EventTableSortHeader
          setSortBy={setSortBy}
          title={"Event Title"}
          id={"TITLE"}
          sortBy={sortBy}
        />
        <EventTableSortHeader
          setSortBy={setSortBy}
          title={"DateTime"}
          id={"DATE"}
          sortBy={sortBy}
        />
      </DataTable.Header>

      {dataEvents &&
        dataEvents.movieEvents?.map(
          (movieEvent: {
            description: string;
            title: string;
            location: string;
            date: string;
            movieEventId: string;
            userIsParticipant: boolean;
          }) => {
            return (
              <DataTable.Row
                key={movieEvent.movieEventId}
                onPress={() =>
                  props.navigation.navigate("MovieEventPage", {
                    movieEventId: movieEvent.movieEventId,
                  })
                }
              >
                <DataTable.Cell>
                  <Text>{movieEvent.title}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{movieEvent.date.replace("T", " ").replace("Z", "").slice(0, -4)}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            );
          },
        )}
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(numberOfPages)}
        onPageChange={(page) => {
          setPage(page);
          call({
            variables: {
              movieGroupId: String(props.id),
              sortBy: sortBy.id,
              searchString: props.searchString,
              pageSize,
              fromDate: props.fromDate,
              page: page + 1,
              toDate: props.toDate,
              alias,
              asc: sortBy.direction === "asc",
            },
          });
        }}
        label={`page ${page + 1} of ${Math.ceil(numberOfPages)}`}
        numberOfItemsPerPage={pageSize}
        numberOfItemsPerPageList={optionsPerPage}
        selectPageDropdownLabel={"Events per page"}
        onItemsPerPageChange={(ItemsPerPage) => {
          setPageSize(ItemsPerPage);
          call({
            variables: {
              movieGroupId: String(props.id),
              sortBy: sortBy.id,
              searchString: props.searchString,
              pageSize,
              fromDate: props.fromDate,
              page: page + 1,
              toDate: props.toDate,
              alias,
              asc: sortBy.direction === "asc",
            },
          });
        }}
      />
    </DataTable>
  );
}
