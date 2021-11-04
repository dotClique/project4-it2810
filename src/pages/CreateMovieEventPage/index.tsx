import * as React from "react";
import { StyleSheet, View } from "react-native";

import { ParamList } from "types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Headline, Subheading } from "react-native-paper";
type Props = StackScreenProps<ParamList, "CreateMovieEventPage">;

export default function CreateMovieEventPage({ route, navigation }: Props) {
  const { MovieGroupId } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Headline>CreateMovieEventPage</Headline>
        <Subheading>ID: {MovieGroupId}</Subheading>
        <Button
          mode={"contained"}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Go back
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    maxHeight: 300,
    backgroundColor: "rgba(255, 255, 255, 1)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
