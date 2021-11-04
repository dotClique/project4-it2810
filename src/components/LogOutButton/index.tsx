import { Button } from "react-native-paper";
import * as React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamList } from "src/types/navigation";
type Props = { navigation: StackNavigationProp<ParamList> };
export default function LogOutButton({ navigation }: Props) {
  return (
    <Button
      mode={"contained"}
      onPress={() => {
        navigation.reset({ routes: [{ name: "Home" }] });
      }}
    >
      Log Out
    </Button>
  );
}
