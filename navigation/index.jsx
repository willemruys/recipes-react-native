/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import jwt_decode from "jwt-decode";

import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "../screens/LoginScreen";

//@ts-ignore
import axios from "axios";
import UserRecipes from "../screens/UserRecipes";
import CreateRecipeScreen from "../screens/CreateRecipeScreen";
import CreateListScreen from "../screens/CreateListScreen";
import ListScreen from "../screens/ListScreen";

export default function Navigation({ colorScheme }) {
  return (
    <>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();
export const AuthContext = React.createContext({});

function RootNavigator() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            userId: action.userId,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
        const decodedToken = jwt_decode(userToken);
        console.log(decodedToken);
        if (Date.now() >= decodedToken.exp * 1000) {
          return dispatch({ type: "SIGN_OUT" });
        }

        await AsyncStorage.setItem("userToken", userToken);
        await AsyncStorage.setItem(
          "userId",
          decodedToken["user_id"].toString()
        );
      } catch (e) {
        return dispatch({ type: "SIGN_OUT" });
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        axios
          .post(`https://recipes-application-310711.ew.r.appspot.com/login`, {
            email: data.email,
            password: data.password,
          })
          .then(async (res) => {
            const token = res?.data?.token;
            if (token) {
              const decodedToken = jwt_decode(token);
              await AsyncStorage.setItem("userToken", token);

              await AsyncStorage.setItem(
                "userId",
                //@ts-ignore
                decodedToken["user_id"].toString()
              );
              dispatch({
                type: "SIGN_IN",
                token: token,
              });
            } else {
              console.error("no token");
            }
          })
          .catch((err) => {
            alert(JSON.stringify(err));
          });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {state.userToken == null ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen
              mode="modal"
              name="CreateRecipeModal"
              component={CreateRecipeScreen}
            />
            <Stack.Screen
              mode="modal"
              name="CreateListScreen"
              component={CreateListScreen}
            />
            <Stack.Screen
              name="ListScreen"
              component={ListScreen}
              options={{ navigationOptions: { title: "Home" } }}
            />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
