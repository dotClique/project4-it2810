import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback } from "react";
import { ParamList } from "../types/navigation";
import { PopupParams } from "./types";

/**
 * Hook to handle create a function to handle the naviation to PopupPage with given parameters.
 * @returns A function to navigate to the PopupPage with given params.
 */
export const usePopup = () => {
  const navigation = useNavigation<StackNavigationProp<ParamList>>();
  return useCallback(
    (popupParams: PopupParams) => {
      navigation.navigate("PopupPage", popupParams);
    },
    [navigation],
  );
};

/**
 * Hook to simplify the usePopup hook when it is used to display errors.
 * @returns A function to navigate to the alert type PopupPage with an error message.
 */
export const useError = () => {
  const popup = usePopup();
  return useCallback(
    (message: string) => popup({ title: "An Error Occurred", message, type: "alert" }),
    [popup],
  );
};
