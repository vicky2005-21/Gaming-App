import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { Celebrations } from "../components/Celebrations";
import { Task4Game } from "../components/Games/Task4Game";
import { GameScreen } from "../components/GameScreen";
import { ResultModal } from "../components/ResultModal";
import { task4Levels } from "../constants/GameLevel";
import { useCountDown } from "../hooks/useCountDown";
import { useResultStore } from "../stores/useResultStore";
import { useTaskProgress } from "../stores/useTaskProgress";

const Task4 = () => {
  const {
    updateTaskProgress,
    taskProgress: [_1, _2, _3, task4Progress],
  } = useTaskProgress((s) => s);

  if (task4Progress.currLevel === task4Progress.totalLevel)
    return <Celebrations />;

  const { navigate, setParams } = useNavigation();
  const { words, time, random } = task4Levels[task4Progress.currLevel];
  const { countDown } = useCountDown(time);
  const [result, setResult] = useState<"success" | "error" | "">("");
  const { updateResult, resetTaskResult } = useResultStore();
  const [x, setX] = useState({
    correct: 0,
    intrusion: 0,
    intrusionA: 0,
    intrusionB: 0,
  });
  const Navigate = navigate as any;

  const onRefresh = () => {
    //@ts-ignore
    setParams({ key: Math.random() });
  };

  const updateProgress = () => {
    updateTaskProgress(4, { currLevel: task4Progress.currLevel + 1 });
    updateResult(
      "task4",
      `Trial: ${task4Progress.currLevel + 1}, Correct: ${x.correct} Missed: ${
        9 - x.correct
      } Intrusion: ${x.intrusion} ${
        x.intrusionA ? "IntrusionA " + x.intrusionA : ""
      } ${x.intrusionB ? "IntrusionB " + x.intrusionB : ""}`
    );
  };

  return (
    <GameScreen
      onRefresh={onRefresh}
      countDown={countDown}
      scroll
      {...task4Progress}
    >
      <ResultModal
        result={result}
        onClickBtnB={() => {
          if (result === "success") {
            updateProgress();
          } else {
            resetTaskResult("task4");
            updateTaskProgress(4, { currLevel: 0 });
            onRefresh();
          }
        }}
        onClickBtnA={() => {
          if (result === "success") {
            updateProgress();
          } else {
            resetTaskResult("task4");
            updateTaskProgress(4, { currLevel: 0 });
          }
          Navigate("Task 4");
        }}
      />
      <Task4Game
        wordsToShow={words}
        countDown={countDown}
        setX={setX}
        reset={() => {
          resetTaskResult("task4");
          updateTaskProgress(4, { currLevel: 0 });
        }}
        firstLevel={task4Progress.currLevel === 0}
        random={random}
        next={updateProgress}
        onSuccess={() => {
          setResult("success");
        }}
        onError={() => {
          setResult("error");
        }}
      />
      <View style={{ height: 60 }} />
    </GameScreen>
  );
};

export default Task4;
