import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import client from "helpers/apollo";
import { horizontalSwipeOptions, OverlayOptions, RotateInOptions } from "helpers/page-transitions";
import { theme } from "helpers/theme";
import CreateMovieEventPage from "pages/CreateMovieEventPage";
import CreateMovieGroupPage from "pages/CreateMovieGroupPage";
import FavoriteMovieGroupsPage from "pages/FavoriteMovieGroupsPage";
import Home from "pages/Home";
import MovieEventPage from "pages/MovieEventPage";
import MovieGroupPage from "pages/MovieGroupPage";
import MovieGroupsPage from "pages/MovieGroupsPage";
import PopupPage from "pages/PopupPage";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createStackNavigator();
export default function App() {
  return (
    <ApolloProvider client={client}>
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
                options={horizontalSwipeOptions}
              />
              <Stack.Screen
                name="CreateMovieEventPage"
                component={CreateMovieEventPage}
                options={horizontalSwipeOptions}
              />
              <Stack.Screen name="PopupPage" component={PopupPage} options={OverlayOptions} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
