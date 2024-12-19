import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import LovedProvider from "./provider/lovedContext";
import CartProvider from "./provider/cartContext";

const App = () => {
  return (
    <NavigationContainer>
      <LovedProvider>
        <CartProvider>
          <StackNavigator />
        </CartProvider>
      </LovedProvider>
    </NavigationContainer>
  );
};

export default App;
