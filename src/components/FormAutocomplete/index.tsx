import { useField } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import getStyles from "./styles";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

type FormAutocompleteProps<DataType> = {
  name: string;
  width?: number;
  data: DataType[];
  label?: string;
  keyExtractor: (item: DataType, index: number) => string;
  //renderItem?: ListRenderItem<DataType> | null | undefined;¨
  onChangeText?: (text: string) => void;
  textExtractor: (item: DataType) => string;
};

export default function FormAutocomplete<DataType>(props: FormAutocompleteProps<DataType>) {
  const theme = useTheme();
  const styles = getStyles(theme, props.width);
  const [options, setOptions] = useState<string[]>([]);
  const [{ value, onChange, onBlur }, { error }] = useField<string>(props.name);
  const searchRef = useRef(null);
  const dropdownController = useRef(null);
  useEffect(() => {
    setOptions(props.data.map(props.textExtractor));
  }, [props.data]);

  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.autocompleteContainer}>
          <AutocompleteDropdown
            ref={searchRef}
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
              console.log(item);
              if (item) {
                console.log(item);
                onChange(props.name)(item.title || "");
                props.onChangeText?.(item.title || "");
              }
            }}
            onChangeText={(text) => {
              onChange(props.name)(text);
              console.log(text);
              props.onChangeText && props.onChangeText(text);
            }}
            debounce={600}
            textInputProps={{
              placeholder: "Type 3+ letters",
              autoCorrect: false,
              autoCapitalize: "none",
              style: {
                borderRadius: 25,
                backgroundColor: "#383b42",
                color: "#fff",
                paddingLeft: 18,
              },
            }}
            inputHeight={50}
          />
        </View>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    </View>
  );
}
