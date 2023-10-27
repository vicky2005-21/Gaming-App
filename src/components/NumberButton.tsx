import React from "react";
import { colors, radius } from "../constants/AppStyle";
import { Text } from "react-native-paper";
import { View } from "react-native";

export const NumberButton = ({ nums, res, level, countDown = "" }: any) => {
  return (
    <View
      style={{
        marginTop: -20,
        marginBottom: 60,
        flexDirection: "row",
        width: 300,
        justifyContent: level > 5 ? "space-between" : "space-evenly",
      }}
    >
      {(countDown.length ? res : Array(level).fill(0)).map(
        (_: number, idx: number) => {
          const active = !isNaN(nums[idx]);
          const visible = level - idx >= parseInt(countDown);

          return (
            <Text
              key={idx}
              variant="titleMedium"
              style={{
                fontSize: 20,
                backgroundColor: active
                  ? nums[idx] === res[idx]
                    ? colors["green-400"]
                    : colors["red-400"]
                  : colors["gray-300"],
                paddingVertical: 20,
                paddingHorizontal: level > 5 ? (level > 6 ? 13 : 15) : 20,
                borderRadius: radius.m,
                color: active ? colors.white : colors.black,
              }}
            >
              {visible ? res[idx] : active ? nums[idx] : "  "}
            </Text>
          );
        }
      )}
    </View>
  );
};
