import { View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { useResultStore } from "../stores/useResultStore";
import { ScrollView } from "react-native-gesture-handler";

const Result = () => {
  const { result } = useResultStore();

  return (
    <ScrollView
      contentContainerStyle={{
        margin: 20,
      }}
    >
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <View key={idx} style={{ marginBottom: 20 }}>
            <Text variant="titleLarge">Task {idx + 1}:</Text>
            <Text variant="labelLarge" style={{ margin: 8 }}>
              {result["task" + (idx + 1)] || "No result found"}
            </Text>
          </View>
        ))}
    </ScrollView>
  );
};

export default Result;
