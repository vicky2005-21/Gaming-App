import LottieView from "lottie-react-native";
import * as React from "react";
import { View } from "react-native";
import { Button, Text, Modal as PaperModal, Portal } from "react-native-paper";
import { colors } from "../constants/AppStyle";

export const ResultModal = ({
  result = "",
  onClickBtnA,
  onClickBtnB,
}: {
  result: "success" | "error" | "";
  onClickBtnA: () => void;
  onClickBtnB: () => void;
}) => {
  const success = result === "success";
  const src = success
    ? require("../assets/lottie/game-complete.json")
    : require("../assets/lottie/game-over.json");

  return (
    <Portal theme={{ colors: { primaryContainer: "transparent" } }}>
      <PaperModal
        style={{ alignItems: "center", overflow: "hidden" }}
        visible={result.length > 0}
        dismissable={false}
        contentContainerStyle={{
          backgroundColor: "white",
          marginHorizontal: 40,
          width: 280,
          height: 280,
          alignItems: "center",
          borderRadius: 20,
        }}
      >
        <LottieView
          autoPlay
          style={{
            width: 280,
            marginTop: success ? -18 : 0,
            padding: 40,
            flex: 1,
            alignItems: "center",
          }}
          hardwareAccelerationAndroid
          source={src}
        />
        <Text
          variant="labelLarge"
          style={{
            marginTop: -20,
            marginBottom: 20,
            color: success ? colors["green-500"] : colors["red-500"],
          }}
        >
          {success ? "Task Completed" : "Task Failed"}
        </Text>
        <View
          style={{
            borderTopWidth: 0.6,
            flexDirection: "row",
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
            borderTopColor: colors["gray-600"],
            backgroundColor: colors["gray-100"],
          }}
        >
          <Button
            theme={{ roundness: 0 }}
            style={{
              flex: 1,
              borderRightWidth: 0.3,
              borderColor: colors["gray-600"],
            }}
            onPress={onClickBtnA}
            textColor={colors["red-500"]}
            labelStyle={{ paddingVertical: 10 }}
          >
            Back
          </Button>
          <Button
            theme={{
              roundness: 0,
            }}
            style={{
              flex: 1,
              borderLeftWidth: 0.3,
              borderColor: colors["gray-600"],
            }}
            onPress={onClickBtnB}
            labelStyle={{ paddingVertical: 10 }}
          >
            {success ? "Next level" : "Play Again"}
          </Button>
        </View>
      </PaperModal>
    </Portal>
  );
};
