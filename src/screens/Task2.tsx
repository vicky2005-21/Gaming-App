import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Celebrations } from "../components/Celebrations";
import { Task2Game } from "../components/Games/Task2Game";
import { GameScreen } from "../components/GameScreen";
import { ResultModal } from "../components/ResultModal";
import { task2Levels } from "../constants/GameLevel";
import { useCountDown } from "../hooks/useCountDown";
import { useResultStore } from "../stores/useResultStore";
import { useTaskProgress } from "../stores/useTaskProgress";

const Task2 = () => {
  const {
    updateTaskProgress,
    taskProgress: [_, task2Progress],
  } = useTaskProgress((s) => s);

  if (task2Progress.currLevel === task2Progress.totalLevel)
    return <Celebrations />;

  const { navigate, setParams } = useNavigation();
  const { numLength, reverse } = task2Levels[task2Progress.currLevel];
  const { countDown } = useCountDown(numLength + 1);
  const [result, setResult] = useState<"success" | "error" | "">("");
  const { updateResult } = useResultStore();
  const Navigate = navigate as any;

  const onRefresh = () => {
    //@ts-ignore
    setParams({ key: Math.random() });
  };

  const updateProgress = () => {
    updateTaskProgress(2, { currLevel: task2Progress.currLevel + 1 });
    updateResult(
      "task2",
      `Trial: ${task2Progress.currLevel + 1}, ${
        reverse ? "Reverse" : "Forward"
      } digit span: ${numLength}`
    );
  };

  return (
    <GameScreen onRefresh={onRefresh} {...task2Progress}>
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
          Navigate("Task 2");
        }}
      />
      <Task2Game
        level={numLength}
        reverse={reverse}
        countDown={countDown}
        onSuccess={() => {
          setResult("success");
        }}
        onError={() => {
          setTimeout(() => {
            setResult("error");
          }, 200);
        }}
      />
    </GameScreen>
  );
};

export default Task2;
