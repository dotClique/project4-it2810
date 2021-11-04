import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "pages/Home";
import { Provider as PaperProvider } from "react-native-paper";
import MovieGroupsPage from "pages/MovieGroupsPage";
import { theme } from "helpers/theme";
import MovieGroupPage from "pages/MovieGroupPage";
import MovieEventPage from "pages/MovieEventPage";
import FavoriteMovieGroupsPage from "pages/FavoriteMovieGroupsPage";
import CreateMovieGroupPage from "pages/CreateMovieGroupPage";
import CreateMovieEventPage from "pages/CreateMovieEventPage";
import { horizontalSwipeOptions, OverlayOptions, RotateInOptions } from "helpers/page-transitions";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} options={RotateInOptions} />
            <Stack.Screen
              name="MovieGroupsPage"
              component={MovieGroupsPage}
              options={RotateInOptions}
            />
            <Stack.Screen
              name="MovieGroupPage"
              options={horizontalSwipeOptions}
              component={MovieGroupPage}
            />
            <Stack.Screen
              name="MovieEventPage"
              options={horizontalSwipeOptions}
              component={MovieEventPage}
            />
            <Stack.Screen
              name="FavoriteGroupsPage"
              component={FavoriteMovieGroupsPage}
              options={RotateInOptions}
            />
            <Stack.Screen
              name="CreateMovieGroupPage"
              component={CreateMovieGroupPage}
              options={OverlayOptions}
            />
            <Stack.Screen
              name="CreateMovieEventPage"
              component={CreateMovieEventPage}
              options={OverlayOptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
