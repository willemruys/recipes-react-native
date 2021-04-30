/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import useColorScheme from "../hooks/useColorScheme";

import HomeScreen from "../screens/HomeScreen";
import UserRecipes from "../screens/UserRecipes";
import UserListScreen from "../screens/UserListsScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <>
      <BottomTab.Navigator initialRouteName="TabOne">
        <BottomTab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-code" color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="My recipes"
          component={UserRecipesNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="user" size={24} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="My Lists"
          component={UserListsNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="user" size={24} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeNavigatorStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeNavigatorStack.Navigator>
      <HomeNavigatorStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "Home" }}
      />
    </HomeNavigatorStack.Navigator>
  );
}

const UserRecipesStack = createStackNavigator();

function UserRecipesNavigator() {
  return (
    <UserRecipesStack.Navigator>
      <UserRecipesStack.Screen
        name="UserRecipes"
        component={UserRecipes}
        options={{ headerTitle: "User recipes" }}
      />
    </UserRecipesStack.Navigator>
  );
}

const UserListsStack = createStackNavigator();

function UserListsNavigator() {
  return (
    <UserListsStack.Navigator>
      <UserListsStack.Screen
        name="UserLists"
        component={UserListScreen}
        options={{ headerTitle: "User recipes" }}
      />
    </UserListsStack.Navigator>
  );
}
