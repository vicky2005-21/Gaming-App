import create from "zustand";
import { combine } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as GameLevel from "../constants/GameLevel";

const taskProgressKey = "task_progress@cerebrus";
export const IntialProgress = [
  {
    name: "task1",
    currLevel: 0,
    totalLevel: GameLevel.task1Levels.length,
  },
  {
    name: "task2",
    currLevel: 0,
    totalLevel: GameLevel.task2Levels.length,
  },
  {
    name: "task3",
    currLevel: 0,
    totalLevel: GameLevel.task3Levels.length,
  },
  {
    name: "task4",
    currLevel: 0,
    totalLevel: GameLevel.task4Levels.length,
  },
  {
    name: "task5",
    currLevel: 0,
    totalLevel: GameLevel.task5Levels.length,
  },
];

export const useTaskProgress = create(
  combine({ taskProgress: IntialProgress.slice() }, (set, getState) => ({
    loadTaskProgress: async () => {
      try {
        const data = JSON.parse(
          (await AsyncStorage.getItem(taskProgressKey)) || ""
        );

        set(data);
      } catch {}
    },

    updateTaskProgress: (
      task: 1 | 2 | 3 | 4 | 5,
      y: Partial<typeof IntialProgress[0]>
    ) => {
      task--;
      set(({ taskProgress }) => {
        taskProgress[task] = { ...getState().taskProgress[task], ...y };
        return { taskProgress };
      });

      try {
        if (task !== 4 || y.currLevel === y.totalLevel)
          AsyncStorage.setItem(taskProgressKey, JSON.stringify(getState()));
      } catch {}
    },

    resetTaskProgress: () => {
      set({ taskProgress: IntialProgress.slice() });
      try {
        AsyncStorage.setItem(taskProgressKey, "");
      } catch {}
    },
  }))
);
