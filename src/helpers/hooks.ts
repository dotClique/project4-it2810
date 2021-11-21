import {
  FetchResult,
  LazyQueryResult,
  MutationFunctionOptions,
  MutationResult,
  QueryLazyOptions,
  useLazyQuery,
  useMutation,
  useReactiveVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DocumentNode } from "graphql";
import { useCallback, useEffect } from "react";
import { ParamList } from "../types/navigation";
import { aliasVar } from "./reactive-vars";
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
export const useErrorPopup = () => {
  const popup = usePopup();
  return useCallback(
    (message: string) => popup({ title: "An Error Occurred", message, type: "alert" }),
    [popup],
  );
};

/**
 * An implementation of the useMutation hook from apollo to include error handling.
 * @param mutationCall The graphql request.
 * @param onCompleted The function to be run when the call is completed successfully.
 * @param variables Default request variables. Will be overridden if you pass the variables using the call function.
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMutationCall<DataType = any, Variables = any>(
  mutationCall: DocumentNode,
  onCompleted?: (data?: DataType) => void,
  variables?: Variables,
): [
  (options?: MutationFunctionOptions<DataType, Variables>) => Promise<FetchResult<DataType>>,
  MutationResult<DataType>,
] {
  const showErr = useErrorPopup();
  const [performCall, result] = useMutation<DataType, Variables>(mutationCall, {
    onCompleted,
    onError: (error) => showErr(error.message),
    variables: variables,
  });

  return [performCall, result];
}

/**
 * An implementation of the useQuery hook from apollo to include error handling.
 * @param mutationCall The graphql request.
 * @param lazy If the call should be lazy. Set to true if the call should not be performed immediately. Is by default false.
 * @param onCompleted The funciton to be run when the call is completed successfully.
 * @param variables Default request variables. Will be overridden if you pass the variables using the call function.
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useQueryCall<DataType, Variables = { [key: string]: any }>(
  mutationCall: DocumentNode,
  lazy = false,
  onCompleted?: (data?: DataType) => void,
  networkOnly = false,
  variables?: Variables,
): [
  (options?: QueryLazyOptions<Variables> | undefined) => void,
  LazyQueryResult<DataType, Variables>,
] {
  const showErr = useErrorPopup();
  const [performCall, result] = useLazyQuery<DataType, Variables>(mutationCall, {
    onCompleted,
    onError: (error) => showErr(error.message),
    fetchPolicy: networkOnly ? "network-only" : undefined,
    variables: variables,
  });

  // If the call should not be lazy, perform the call immediately.
  useEffect(() => {
    if (!lazy) performCall();
  }, []);

  return [performCall, result];
}

const aliasKey = "alias";

/**
 * Hook to handle updating the alias in cache with AsyncStorage.
 * @returns an array of the value of the alias, a function to set the alias and a function to log out.
 */
export const useAlias = (): [string | null, (value: string) => void, () => void] => {
  const alias = useReactiveVar(aliasVar);
  const showErr = useErrorPopup();

  // When the hook is called, update the state to the alias in AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem(aliasKey)
      .then((value) => {
        // Only set the global alias to the one in AsyncStorage if it is defined there.
        if (value !== null) aliasVar(value);
      })
      .catch((err) => showErr(JSON.stringify(err)));
  }, []);

  const updateAlias = useCallback(
    (value: string) => {
      AsyncStorage.setItem(aliasKey, value).catch((err) => showErr(JSON.stringify(err)));
      aliasVar(value);
    },
    [alias, aliasVar],
  );

  const logOut = () => {
    AsyncStorage.removeItem(aliasKey).catch((err) => showErr(JSON.stringify(err)));
    aliasVar(null);
  };

  return [alias, updateAlias, logOut];
};
