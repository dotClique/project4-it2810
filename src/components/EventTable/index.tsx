import * as React from "react";
import { GET_MOVIE_GROUP_EVENTS } from "helpers/graphql-queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamList } from "types/navigation";
import { DataTable } from "react-native-paper";
import EventTableSortHeader from "components/EventTableSortHeader";

type Props = {
  id: string;
  searchString: string;
  fromDate: string;
  toDate: string;
  navigation: StackNavigationProp<ParamList>;
};

export default function EventTable(props: Props) {
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const { alias } = "i"; //useAlias();
  const [sortBy, setSortBy] = useState<{ id: string; direction: "desc" | "asc" }>({
    id: "DATE",
    direction: "asc",
  });
  const [pageSize, setPageSize] = useState(10);

  const { data: dataEvents } = useQuery(GET_MOVIE_GROUP_EVENTS, {
    variables: {
      movieGroupId: String(props.id),
      sortBy: sortBy.id,
      searchString: props.searchString,
      pageSize,
      fromDate: props.fromDate,
      page,
      toDate: props.toDate,
      alias,
      asc: sortBy.direction === "asc",
    },
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    setCount(dataEvents ? dataEvents.movieEventCount : count);
  }, [dataEvents]);

  return (
    <DataTable>
      <DataTable.Header>
        <EventTableSortHeader
          setSortBy={setSortBy}
          title={"Event Title"}
          id={"TITLE"}
          sortBy={sortBy}
        />
        <EventTableSortHeader
          setSortBy={setSortBy}
          title={"Description"}
          id={"DESCRIPTION"}
          sortBy={sortBy}
        />
        <EventTableSortHeader
          setSortBy={setSortBy}
          title={"Location"}
          id={"LOCATION"}
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
                onPressOut={() =>
                  props.navigation.navigate("MovieEventPage", {
                    MovieEventId: movieEvent.movieEventId,
                  })
                }
              >
                <DataTable.Cell>{movieEvent.title}</DataTable.Cell>
                {/* Only displays the most important columns on mobile to save space*/}
                {/*{!isMobile ? (
                  <>
                    <StyledTableCell>{movieEvent.description}</StyledTableCell>
                    <StyledTableCell>{movieEvent.location}</StyledTableCell>
                  </>
                ) : (
                  false
                )*/}
                ]
                <DataTable.Cell>
                  {movieEvent.date.replace("T", " ").replace("Z", "").slice(0, -4)}
                </DataTable.Cell>
                <DataTable.Cell>{movieEvent.userIsParticipant ? "yes" : "no"}</DataTable.Cell>
              </DataTable.Row>
            );
          },
        )}
      <DataTable.Pagination
        page={page}
        numberOfPages={count / pageSize}
        onPageChange={(page) => setPage(page)}
        numberOfItemsPerPage={pageSize}
        onItemsPerPageChange={(ItemsPerPage) => setPageSize(ItemsPerPage)}
      />
    </DataTable>
  );
}
