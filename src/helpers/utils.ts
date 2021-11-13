import Constants from "expo-constants";
/**
 * Gets the environmental variable with envName and throws error if not found.
 * @param envName The key of the envirnmental variable through expo constants.
 * @returns The value of the environmental varaible.
 * @throws Error if the environmental variable is not found.
 */
export const getEnv = (envName: string): string => {
  const variable = Constants?.manifest?.extra?.[envName];
  if (!variable) throw new Error(`Environmental variable ${envName} not found`);
  return variable;
};
