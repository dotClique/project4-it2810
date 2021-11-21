import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import LogOutButton from "components/LogOutButton/index";

const fakeNavigation = {
  reset: jest.fn(),
};

let alias: string | null = null;

const setAlias = (newAlias: string | null) => {
  alias = newAlias;
};
const logOut = () => {
  setAlias(null);
};
const mockUseAlias = () => {
  return [alias, setAlias, logOut];
};

jest.mock("helpers/hooks", () => ({
  useAlias: () => mockUseAlias(),
}));

test("LogOutButton test of clearing alias", () => {
  const { getByText } = render(<LogOutButton navigation={fakeNavigation} />);
  setAlias("test");
  expect(alias === "test").toBeTruthy();
  const button = getByText("Log Out");
  fireEvent.press(button);
  expect(alias === null).toBeTruthy();
});

test("LogOutButton test of calling reset", () => {
  const { getByText } = render(<LogOutButton navigation={fakeNavigation} />);
  const button = getByText("Log Out");
  fireEvent.press(button);
  expect(fakeNavigation.reset).toBeCalled();
});
