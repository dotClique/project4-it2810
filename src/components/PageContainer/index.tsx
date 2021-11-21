import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import LogOutButton from "components/LogOutButton";
import * as React from "react";
import { ReactNode, useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Headline, Surface } from "react-native-paper";
import { ParamList } from "types/navigation";

type Props = {
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
  disableScrollView?: boolean;
};

export default function PageContainer(props: Props) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true); // or some other action
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Surface style={styles.container}>
      {props.title && <Headline style={styles.title}>{props.title}</Headline>}
      <View style={styles.contentContainer}>
        {!props.disableScrollView ? (
          <ScrollView style={styles.content}>{props.children}</ScrollView>
        ) : (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            {props.children}
          </TouchableWithoutFeedback>
        )}
      </View>

      <View style={styles.footer}>
        {props.footer && !isKeyboardVisible ? (
          <View>
            <LogOutButton />
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
    flex: 1,
  },
  footer: {
    alignItems: "center",
    padding: 10,
  },
});
