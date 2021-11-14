import { Button } from "react-native-paper";
import * as React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamList } from "src/types/navigation";
import { Text } from "react-native";
type Props = { navigation: StackNavigationProp<ParamList> };
export default function LogOutButton({ navigation }: Props) {
  return (
    <Button
      mode={"contained"}
      onPress={() => {
        navigation.reset({ routes: [{ name: "Home" }] });
      }}
    >
      <Text>Log Out</Text>
    </Button>
  );
}
