import React from "react";
import { View } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
import getStyles from "./styles";

type FormFieldProps = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
};

export default function SearchInput(props: FormFieldProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={(v) => props.setValue(v)}
        value={props.value}
        label={props.label}
        style={styles.textInput}
        selectionColor={"white"}
      />
      <Text style={styles.errorText}>{props.error}</Text>
    </View>
  );
}
