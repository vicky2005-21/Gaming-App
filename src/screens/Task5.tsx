import React, { useRef, useState } from "react";
import { task5Levels } from "../constants/GameLevel";
import { Task5Game } from "../components/Games/Task5Game";
import { GameScreen } from "../components/GameScreen";
import { useTaskProgress } from "../stores/useTaskProgress";
import { Celebrations } from "../components/Celebrations";
import { useNavigation } from "@react-navigation/native";
import { ResultModal } from "../components/ResultModal";
import { useResultStore } from "../stores/useResultStore";

const Task5 = () => {
  const {
    updateTaskProgress,
    taskProgress: [_1, _2, _3, _4, task5Progress],
  } = useTaskProgress((s) => s);

  if (task5Progress.currLevel === task5Progress.totalLevel)
    return <Celebrations />;

  const { navigate, setParams } = useNavigation();
  const { grid, images, timer } = task5Levels[task5Progress.currLevel];
  const [result, setResult] = useState<"success" | "error" | "">("");
  const { updateResult } = useResultStore();
  const Navigate = navigate as any;
  const start = useRef(new Date().getTime()).current;

  const onRefresh = () => {
    //@ts-ignore
    setParams({ key: Math.random() });
  };

  const updateProgress = () => {
    updateTaskProgress(5, { currLevel: task5Progress.currLevel + 1 });
    updateResult(
      "task5",
      `Trial: ${task5Progress.currLevel + 1} Time: ${
        (new Date().getTime() - start) / 1000
      }sec`
    );
  };

  return (
    <GameScreen {...task5Progress}>
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
          Navigate("Task 5");
        }}
      />
      <Task5Game
        grid={grid}
        timer={timer}
        images={images}
        onSuccess={() => {
          setResult("success");
        }}
        onError={() => {
          setResult("error");
        }}
        reset={onRefresh}
      />
    </GameScreen>
  );
};

export default Task5;
