import React, { memo } from "react";
import { View } from "react-native";
import { colors, radius } from "../constants/AppStyle";
import { Title, Text, Button, Surface } from "react-native-paper";
import { showToast } from "../lib/showToast";
import { useNetworkStatus } from "../stores/useNetworkStatus";

export const TestingCard = memo(() => {
  const isConnected = useNetworkStatus((s) => s.isConnected);

  return (
    <Surface
      style={{
        marginHorizontal: 10,
        marginBottom: 20,
        backgroundColor: colors.white,
        borderRadius: radius.m,
      }}
    >
      <View
        style={{
          paddingHorizontal: 24,
          borderBottomColor: colors["gray-600"],
          borderBottomWidth: 0.5,
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <Title style={{ fontSize: 22, fontWeight: "700" }}>Testing</Title>
      </View>
      <Text style={{ textAlign: "center" }}>
        Internet isConnected: {JSON.stringify(isConnected)}
      </Text>
      <View style={{ padding: 20 }}>
        <Text
          variant={"titleMedium"}
          style={{ textAlign: "center", marginBottom: 10 }}
        >
          Test Toast
        </Text>
        <View
          style={{
            justifyContent: "space-between",
            height: 150,
          }}
        >
          <Button
            mode="contained"
            onPress={() =>
              showToast(
                "Hello We are still working on this We are still working on this We are still working on this We are still working on this",
                "success"
              )
            }
          >
            success
          </Button>
          <Button
            mode="contained"
            onPress={() =>
              showToast(
                "Hello We are still working on this We are still working on this",
                "error"
              )
            }
          >
            error
          </Button>
          <Button
            mode="contained"
            onPress={() => showToast("Hello We are still working on this")}
          >
            default
          </Button>
        </View>
      </View>
      {/* <View
        style={{
          flexDirection: "row-reverse",
          paddingHorizontal: 15,
          borderTopColor: colors["gray-600"],
          borderTopWidth: 0.5,
          paddingVertical: 12,
        }}
      >
        <Button
          mode="contained"
          style={{ width: 140 }}
          contentStyle={{
            flexDirection: "row-reverse",
            backgroundColor: colors["red-500"],
          }}
          onPress={() => {
            Alert.alert("Sorry", "We are still working on this");
          }}
          labelStyle={{ fontSize: 16, color: colors.text }}
        >
          Delete
        </Button>
      </View> */}
    </Surface>
  );
});
