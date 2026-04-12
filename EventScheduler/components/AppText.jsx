// custom text component for use across whole app
// guide found here: https://reactnative.dev/docs/text#limited-style-inheritance
import React from "react";
import { Text, StyleSheet } from "react-native";

/* AppText properties:
    children: nested content (text)
    style: for extending styling
    props: allows additional properties such as onPress
*/
const AppText = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.defaultText, style]} {...props}>
      {children}
    </Text>
  );
};

// default text style is arial, size is 16
const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "Arial",
    fontSize: 16,
  },
});

export default AppText;
