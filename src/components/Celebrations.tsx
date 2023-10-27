import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { Animated, View } from "react-native";
import { Text } from "react-native-paper";

export const Celebrations = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
  }).start();

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <LottieView
        autoPlay
        loop={false}
        hardwareAccelerationAndroid
        source={require("../assets/lottie/confetti-background.json")}
      />
      <LottieView
        autoPlay
        loop={false}
        speed={0.75}
        style={{ height: 300, width: 300 }}
        hardwareAccelerationAndroid
        source={require("../assets/lottie/trophy.json")}
      />
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
      >
        <Text variant="titleLarge" style={{ fontSize: 20 }}>
          You've completed all the levels.
        </Text>
      </Animated.View>
    </View>
  );
};
