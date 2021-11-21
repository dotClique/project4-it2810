import { useField } from "formik";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Text, TextInput, useTheme } from "react-native-paper";
import getStyles from "./styles";

type FormDateTimeProps = {
  name: string;
  width?: number;
};

export default function FormDateTime(props: FormDateTimeProps) {
  const theme = useTheme();
  const styles = getStyles(theme, props.width);
  const [{ value, onChange }, { error }] = useField<string>(props.name);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    if (date) onChange(props.name)(date.toISOString());
  }, [date]);

  return (
    <View>
      <TextInput
        value={new Date(value).toUTCString()}
        disabled
        label="Date and Time"
        right={<TextInput.Icon name="calendar" onPress={() => setShow(true)} />}
      />
      <DateTimePickerModal
        mode="datetime"
        date={date}
        isVisible={show}
        onConfirm={(newDate: Date) => {
          setDate(newDate);
          setShow(false);
        }}
        onCancel={() => setShow(false)}
      />

      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}
