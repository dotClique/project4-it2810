import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Headline, Subheading } from "react-native-paper";
import { ParamList } from "types/navigation";

type Props = StackScreenProps<ParamList, "MovieGroupPage">;

export default function MovieGroupPage({ route, navigation }: Props) {
  const { movieGroupId } = route.params;
  return (
    <View style={styles.container}>
      <Headline>GroupPage</Headline>
      <Subheading>ID: {movieGroupId}</Subheading>
      <Button
        mode={"contained"}
        onPress={() => {
          navigation.navigate("MovieEventPage", { movieEventId: "testEventId" });
        }}
      >
        Event Page
      </Button>
      <Button
        mode={"contained"}
        onPress={() => {
          navigation.navigate("CreateMovieEventPage", { movieGroupId: "testGroupId" });
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
