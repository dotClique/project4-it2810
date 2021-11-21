import { useField } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { Text, useTheme } from "react-native-paper";
import getStyles from "./styles";

type FormAutocompleteProps<DataType> = {
  name: string;
  width?: number;
  data: DataType[];
  label?: string;
  keyExtractor: (item: DataType, index: number) => string;
  loading: boolean;
  onChangeText?: (text: string) => void;
  textExtractor: (item: DataType) => string;
};

export default function FormAutocomplete<DataType>(props: FormAutocompleteProps<DataType>) {
  const theme = useTheme();
  const styles = getStyles(theme, props.width);
  const [options, setOptions] = useState<string[]>([]);
  const [{ value, onChange }, { error }] = useField<string>(props.name);
  const dropdownController = useRef(null);
  useEffect(() => {
    setOptions(props.data.map(props.textExtractor));
  }, [props.data]);
  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.autocompleteContainer}>
          <AutocompleteDropdown
            controller={(controller) => {
              dropdownController.current = controller;
            }}
            closeOnBlur={false}
            closeOnSubmit={true}
            dataSet={
              options.length === 1 && options[0] === value
                ? []
                : props.data.map((item, index) => {
                    return {
                      id: props.keyExtractor(item, index),
                      title: props.textExtractor(item),
                    };
                  })
            }
            onSelectItem={(item) => {
              if (item) {
                onChange(props.name)(item.title || "");
                props.onChangeText?.(item.title || "");
              }
            }}
            onChangeText={(text) => {
              onChange(props.name)(text);
              props.onChangeText && props.onChangeText(text);
            }}
            debounce={600}
            textInputProps={{
              placeholder: "Event title",
              autoCorrect: false,
              autoCapitalize: "none",
              style: {
                borderRadius: 8,
                backgroundColor: theme.colors.background,
                color: "#110f0f",
                paddingLeft: 18,
              },
            }}
            inputHeight={50}
            rightButtonsContainerStyle={{ backgroundColor: theme.colors.primary }}
            emptyResultText={"no movies found"}
          />
        </View>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    </View>
  );
}
