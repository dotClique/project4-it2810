import * as React from "react";
import { StyleSheet, View } from "react-native";

import { ParamList } from "types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Headline, Subheading } from "react-native-paper";
type Props = StackScreenProps<ParamList, "MovieEventPage">;

export default function MovieEventPage({ route, navigation }: Props) {
  const { MovieEventId } = route.params;
  return (
    <View style={styles.container}>
      <Headline>MovieEventPage</Headline>
      <Subheading>ID: {MovieEventId}</Subheading>
      <Button
        mode={"contained"}
        onPress={() => {
          navigation.goBack();
        }}
      >
        Go back!
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
