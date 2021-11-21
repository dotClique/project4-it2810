import * as React from "react";
import { View } from "react-native";

import { ParamList } from "types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, DataTable, useTheme } from "react-native-paper";
import PageContainer from "components/PageContainer";
import SearchInput from "components/SearchInput";
import { useState } from "react";
import getStyles from "./styles";
import MovieGroupItem from "components/MovieGroupItem";
import { useAlias, useMutationCall } from "helpers/hooks";
import { useMovieGroups } from "pages/MovieGroupsPage/utils";
import { ADD_USER_TO_MOVIE_GROUP, REMOVE_USER_FROM_MOVIE_GROUP } from "helpers/graphql-queries";
type Props = StackScreenProps<ParamList, "MovieGroupsPage">;

export default function MovieGroupsPage({ navigation }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();
  const styles = getStyles(theme);
  const pageSize = 8;
  const [alias, _, logout] = useAlias();
  const [page, setPage] = useState(0);
  const { movieGroups, pageCount, refetch } = useMovieGroups(page + 1, pageSize, searchValue);
  const [addUserToGroup] = useMutationCall(ADD_USER_TO_MOVIE_GROUP, refetch);
  const [removeUserFromGroup] = useMutationCall(REMOVE_USER_FROM_MOVIE_GROUP, refetch);
  return (
    <PageContainer
      title={"Temp"}
      footer={
        <>
          <Button
            mode={"contained"}
            onPress={() => {
              navigation.navigate("FavoriteGroupsPage");
            }}
          >
            Favorite Groups
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
          {movieGroups.map((item) => {
            // Check is user has group as favorite
            const isFavorite = item.userFavorites.some((e) => e.alias === alias);
            return (
              <MovieGroupItem
                title={item.name}
                key={item.movieGroupId}
                onToggleFavorite={() => {
                  console.log("update");
                  // Send query toggling if the logged in user has the current group as a favorite
                  const params = {
                    variables: { movieGroupId: item.movieGroupId, useralias: alias },
                  };
                  console.log(params);
                  return isFavorite ? removeUserFromGroup(params) : addUserToGroup(params);
                }}
                favorite={isFavorite}
                id={item.movieGroupId}
              />
            );
          })}
        </View>
      </View>
    </PageContainer>
  );
}
