import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens and Navigators
import TabNavigator from "./TabNavigator";
import CoffeeDetailScreen from "./screen/pages/details/coffeeDetailScreen";

// Create Stack Navigator
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // You can add custom transition animations here if desired
      }}
    >
      {/* Main Tab Navigator as first screen */}
      <Stack.Screen name="MainTabs" component={TabNavigator} />

      {/* Detail Screen */}
      <Stack.Screen
        name="CoffeeDetail"
        component={CoffeeDetailScreen}
        options={({ route }) => ({
          // Optional: you can customize options based on route params
          // title: route.params.coffee.name
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
