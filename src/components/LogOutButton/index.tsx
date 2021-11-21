import { Button } from "react-native-paper";
import * as React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamList } from "src/types/navigation";
import { Text } from "react-native";
import { useAlias } from "helpers/hooks";
type Props = { navigation: StackNavigationProp<ParamList> };

export default function LogOutButton({ navigation }: Props) {
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
