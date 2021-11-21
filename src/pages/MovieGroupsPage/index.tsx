import * as React from "react";
import { View } from "react-native";

import { ParamList } from "types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Subheading, useTheme } from "react-native-paper";
import PageContainer from "components/PageContainer";
import SearchInput from "components/SearchInput";
import { useState } from "react";
import getStyles from "./styles";
import MovieGroupItem from "components/MovieGroupItem";
type Props = StackScreenProps<ParamList, "MovieGroupsPage">;

export default function MovieGroupsPage({ navigation }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();
  const styles = getStyles(theme);
  const pageSize = 8;
  const { alias } = useAlias();
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const { movieGroups, pageCount, refetch } = useMovieGroups(page, pageSize, searchString);
  const [addUserToGroup] = useCreationForm(ADD_USER_TO_MOVIE_GROUP, refetch);
  const [removeUserFromGroup] = useCreationForm(REMOVE_USER_FROM_MOVIE_GROUP, refetch);
  return (
    <PageContainer
      title={"Temp"}
      footer={
        <Button
          mode={"contained"}
          onPress={() => {
            navigation.navigate("FavoriteGroupsPage");
          }}
        >
          Favorite Groups
        </Button>
      }
    >
      <View style={styles.container}>
        <SearchInput label={"search for groups"} value={searchValue} setValue={setSearchValue} />
        <View style={styles.movieGroupList}>
          <MovieGroupItem title={"Hello"} favorite={false} onToggleFavorite={() => ""} id={""} />
          <MovieGroupItem title={"Hello"} favorite={false} onToggleFavorite={() => ""} id={""} />
          <MovieGroupItem title={"Hello"} favorite={false} onToggleFavorite={() => ""} id={""} />
          <MovieGroupItem title={"Hello"} favorite={false} onToggleFavorite={() => ""} id={""} />
          <MovieGroupItem title={"Hello"} favorite={false} onToggleFavorite={() => ""} id={""} />
          <MovieGroupItem title={"Hello"} favorite={false} onToggleFavorite={() => ""} id={""} />
          <MovieGroupItem title={"Hello"} favorite={false} onToggleFavorite={() => ""} id={""} />
          <MovieGroupItem title={"Hello"} favorite={false} onToggleFavorite={() => ""} id={""} />
          <MovieGroupItem title={"Hello"} favorite={false} onToggleFavorite={() => ""} id={""} />
          <Subheading>Hello</Subheading>
          <Subheading>Hello</Subheading>
        </View>
      </View>
    </PageContainer>
  );
}
