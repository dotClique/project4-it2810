import * as React from "react";
import { StyleSheet, View } from "react-native";

import { ParamList } from "types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, DataTable, Headline } from "react-native-paper";
import LogOutButton from "components/LogOutButton";
import { useState } from "react";
import getStyles from "pages/MovieGroupsPage/styles";
import { useAlias, useMutationCall } from "helpers/hooks";
import { useMovieGroups } from "pages/MovieGroupsPage/utils";
import { ADD_USER_TO_MOVIE_GROUP, REMOVE_USER_FROM_MOVIE_GROUP } from "helpers/graphql-queries";
import PageContainer from "components/PageContainer";
import SearchInput from "components/SearchInput";
import MovieGroupItem from "components/MovieGroupItem";
import { useFavoriteMovieGroups } from "pages/FavoriteMovieGroupsPage/utils";
import MovieGroupWithUpcomingEvents from "components/MovieGroupsWithUpcomingEvents";

type Props = StackScreenProps<ParamList, "FavoriteGroupsPage">;

export default function FavoriteMovieGroupsPage({ navigation }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const styles = getStyles();
  const pageSize = 4;
  const [alias] = useAlias();
  const [page, setPage] = useState(0);
  const [removeUserFromGroup] = useMutationCall(REMOVE_USER_FROM_MOVIE_GROUP);
  const { movieGroups, pageCount, refetch } = useFavoriteMovieGroups(
    page + 1,
    pageSize,
    alias || "",
    searchValue,
  );

  return (
    <PageContainer
      title={"Favorite Groups"}
      footer={
        <>
          <Button
            mode={"contained"}
            onPress={() => {
              navigation.navigate("MovieGroupsPage");
            }}
          >
            All Groups
          </Button>
          <DataTable>
            <DataTable.Pagination
              numberOfPages={pageCount}
              label={`page ${page + 1} of ${pageCount}`}
              page={page}
              onPageChange={(newPage) => setPage(newPage)}
              numberOfItemsPerPage={pageSize}
            />
          </DataTable>
        </>
      }
    >
      <View style={styles.container}>
        <SearchInput label={"search for groups"} value={searchValue} setValue={setSearchValue} />
        <View style={styles.movieGroupList}>
          {movieGroups.map(
            (item: {
              name: string;
              movieGroupId: string;
              movieEvents: { title: string; date: string; movieEventId: string }[];
            }) => (
              <MovieGroupWithUpcomingEvents
                title={item.name}
                key={item.movieGroupId}
                id={item.movieGroupId}
                events={item.movieEvents}
                onUnFavorite={() => {
                  removeUserFromGroup({
                    variables: { useralias: alias, movieGroupId: item.movieGroupId },
                  }).then(() => refetch());
                }}
              />
            ),
          )}
        </View>
      </View>
    </PageContainer>
  );
}
