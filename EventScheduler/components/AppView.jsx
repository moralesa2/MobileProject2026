// custom text component for use across whole app
// guide found here: https://reactnative.dev/docs/text#limited-style-inheritance
import React from "react";
import { View, StyleSheet } from "react-native";
import BottomNav from "./BottomNav";

/* AppText properties:
    children: nested content (text)
    style: for extending styling
    props: allows additional properties such as onPress
*/
const AppView = ({ children, style, ...props }) => {
  return (
    <View style={[styles.defaultStyle, style]} {...props}>
      {children}
      <BottomNav />
    </View>
  );
};

// TODO: Add default styling here if needed
const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
    backgroundColor: "#d9ead3",
    justifyContent: "space-between",
  },
});

export default AppView;
