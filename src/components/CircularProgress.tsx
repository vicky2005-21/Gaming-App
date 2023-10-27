import React, { useRef } from "react";
import { Animated, View } from "react-native";
import { colors } from "../constants/AppStyle";

export const CircularProgress = ({
  value = 0.8,
  size = 180,
  thickness = 12,
  color = colors["green-400"],
  unfilledColor = "white",
  style = {},
  children,
}: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  Animated.timing(animatedValue, {
    duration: 500,
    toValue: value,
    useNativeDriver: true,
  }).start();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          width: size,
          height: size,
          position: "relative",
        },
        style,
      ]}
    >
      <View
        pointerEvents="box-none"
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: thickness,
          borderColor: unfilledColor,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </View>
      <HalfCircle
        thickness={thickness + 1}
        size={size}
        color={color}
        animatedValue={animatedValue}
      />
      <HalfCircle
        thickness={thickness + 1}
        size={size}
        color={color}
        animatedValue={animatedValue}
        isFlipped
      />
    </View>
  );
};

const HalfCircle = ({
  size,
  color,
  thickness,
  animatedValue,
  isFlipped,
}: any) => {
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        width: size / 2,
        height: size,
        overflow: "hidden",
        transform: [{ scaleX: isFlipped ? -1 : 1 }],
      }}
    >
      <Animated.View
        style={{
          width: size,
          height: size,
          transform: [
            {
              rotate: animatedValue.interpolate({
                inputRange: isFlipped ? [0, 0.5] : [0.5, 1],
                outputRange: isFlipped
                  ? ["180deg", "0deg"]
                  : ["-180deg", "0deg"],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <View style={{ width: size / 2, height: size, overflow: "hidden" }}>
          <View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: thickness,
              borderColor: color,
            }}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};
