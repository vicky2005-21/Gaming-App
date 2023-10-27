import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Celebrations } from "../components/Celebrations";
import { Task1Game } from "../components/Games/Task1Game";
import { GameScreen } from "../components/GameScreen";
import { ResultModal } from "../components/ResultModal";
import { task1Levels } from "../constants/GameLevel";
import { useCountDown } from "../hooks/useCountDown";
import { useTaskProgress } from "../stores/useTaskProgress";
import { useResultStore } from "../stores/useResultStore";

const Task1 = () => {
  const {
    updateTaskProgress,
    taskProgress: [task1Progress],
  } = useTaskProgress((s) => s);

  if (task1Progress.currLevel === task1Progress.totalLevel)
    return <Celebrations />;

  const { navigate, setParams } = useNavigation();
  const { tiles, grid } = task1Levels[task1Progress.currLevel];
  const { countDown } = useCountDown(5);
  const [result, setResult] = useState<"success" | "error" | "">("");
  const { updateResult, resetTaskResult } = useResultStore();
  const Navigate = navigate as any;

  const onRefresh = () => {
    //@ts-ignore
    setParams({ key: Math.random() });
  };

  const updateProgress = () => {
    updateTaskProgress(1, { currLevel: task1Progress.currLevel + 1 });
    resetTaskResult("task1");
    updateResult("task1", `Max Grid: ${grid}, Max Tiles: ${tiles}`);
  };

  return (
    <GameScreen onRefresh={onRefresh} countDown={countDown} {...task1Progress}>
      <ResultModal
        result={result}
        onClickBtnB={() => {
          if (result === "success") {
            updateProgress();
          } else {
            onRefresh();
          }
        }}
        onClickBtnA={() => {
          if (result === "success") {
            updateProgress();
          }
          Navigate("Task 1");
        }}
      />
      <View
        style={{
          marginBottom: 20,
          flexDirection: "row",
          width: 300,
        }}
      >
        <Text style={{ flex: 1 }} variant="titleMedium">
          Tiles: {tiles}
        </Text>
        <Text variant="titleMedium">Grid: {grid}</Text>
      </View>
      <Task1Game
        tiles={tiles}
        grid={grid}
        visible={countDown > 0}
        onSuccess={() => {
          setResult("success");
        }}
        onError={() => {
          setResult("error");
        }}
      />
    </GameScreen>
  );
};

export default Task1;
