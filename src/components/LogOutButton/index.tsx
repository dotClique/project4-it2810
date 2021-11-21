import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAlias } from "helpers/hooks";
import * as React from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { ParamList } from "src/types/navigation";

export default function LogOutButton() {
  const navigation = useNavigation<StackNavigationProp<ParamList>>();
  const logOut = useAlias()[2];
  return (
    <Button
      mode={"contained"}
      onPress={() => {
        logOut();
        navigation.reset({ routes: [{ name: "Home" }] });
      }}
    >
      <Text>Log Out</Text>
    </Button>
  );
}
