import { useField } from "formik";
import React from "react";
import { View } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
import getStyles from "./styles";

type FormFieldProps = {
  label: string;
  name: string;
  width?: number;
  numberOfLines?: number;
};

export default function FormField(props: FormFieldProps) {
  const theme = useTheme();
  const [{ onBlur, onChange, value }, { error }] = useField(props.name);
  const styles = getStyles(theme, props.width);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={onChange(props.name)}
        onBlur={onBlur(props.name)}
        value={value}
        error={error != undefined}
        label={props.label}
        style={styles.textInput}
        multiline={!!props.numberOfLines}
        numberOfLines={props.numberOfLines}
      />
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}
