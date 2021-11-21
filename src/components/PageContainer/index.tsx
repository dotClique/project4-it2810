import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import LogOutButton from "components/LogOutButton";
import * as React from "react";
import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Caption, Headline, Surface } from "react-native-paper";
import { ParamList } from "types/navigation";

type Props = {
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
};

export default function PageContainer(props: Props) {
  const navigation = useNavigation<StackNavigationProp<ParamList>>();
  return (
    <Surface style={styles.container}>
      {props.title && <Headline style={styles.title}>{props.title}</Headline>}
      <View style={styles.contentContainer}>
        <ScrollView style={styles.content}>{props.children}</ScrollView>
      </View>

      <View style={styles.footer}>
        {props.footer ? (
          <View>
            <LogOutButton navigation={navigation} />
            {props.footer}
          </View>
        ) : (
          false
        )}
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflow: "scroll",
    flex: 1,
  },
  title: {
    fontSize: 28,
    marginTop: 40,
    // fontFamily: "Verdana",
  },
  content: {
    width: "80%",
    maxWidth: 400,
  },
  contentContainer: {
    alignItems: "center",
    width: "100%",
    height: "80%",
  },
  footer: {
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
});
