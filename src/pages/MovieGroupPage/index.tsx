import * as React from "react";
import { StyleSheet, View } from "react-native";

import { ParamList } from "types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Headline, Subheading } from "react-native-paper";
type Props = StackScreenProps<ParamList, "MovieGroupPage">;

export default function MovieGroupPage({ route, navigation }: Props) {
  const { MovieGroupId } = route.params;
  return (
    <View style={styles.container}>
      <Headline>GroupPage</Headline>
      <Subheading>ID: {MovieGroupId}</Subheading>
      <Button
        mode={"contained"}
        onPress={() => {
          navigation.navigate("MovieEventPage", { MovieEventId: "testEventId" });
        }}
      >
        Event Page
      </Button>
      <Button
        mode={"contained"}
        onPress={() => {
          navigation.navigate("CreateMovieEventPage", { MovieGroupId: "testGroupId" });
        }}
      >
        Create Movie Event Page
      </Button>
      <Button
        mode={"contained"}
        onPress={() => {
          navigation.goBack();
        }}
      >
        Go back
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
