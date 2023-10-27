import React from "react";
import { Text, TouchableRipple } from "react-native-paper";
import { Animated } from "react-native";
import { colors } from "../constants/AppStyle";

export const AnimateButton: React.FC<any> = ({ text }) => {
  const animatedButtonBorderRadius = new Animated.Value(50);

  const onPressIn = () => {
    Animated.spring(animatedButtonBorderRadius, {
      toValue: 20,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animatedButtonBorderRadius, {
      toValue: 50,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        borderRadius: animatedButtonBorderRadius,
        alignItems: "center",
        backgroundColor: colors["green-500"],
        justifyContent: "center",
      }}
    >
      <TouchableRipple
        borderless
        style={{ height: 70, width: 70 }}
        onPress={() => {}}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Text>{text}</Text>
      </TouchableRipple>
    </Animated.View>
  );
};
