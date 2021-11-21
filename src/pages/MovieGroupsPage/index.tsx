import * as React from "react";
import { StyleSheet, View } from "react-native";

import { ParamList } from "types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Headline } from "react-native-paper";
import LogOutButton from "components/LogOutButton";
type Props = StackScreenProps<ParamList, "MovieGroupsPage">;

export default function MovieGroupsPage({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Headline>MovieGroupsPage</Headline>
      <LogOutButton navigation={navigation} />
      <Button
        mode={"contained"}
        onPress={() => {
          navigation.navigate("MovieGroupPage", { MovieGroupId: "ckvft1pfp0019alpcmf9fwiwy" });
        }}
      >
        Movie Group Page
      </Button>
      <Button
        mode={"contained"}
        onPress={() => {
          navigation.navigate("CreateMovieGroupPage");
        }}
      >
        Create movie Group Page
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
