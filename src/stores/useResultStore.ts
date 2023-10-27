import create from "zustand";
import { combine } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resultKey = "result@cerebrus";
export const IntialResult: Record<string, string> = {
  task1: "",
  task2: "",
  task3: "",
  task4: "",
  task5: "",
};

export const useResultStore = create(
  combine({ result: { ...IntialResult } }, (set, getState) => ({
    loadResult: async () => {
      try {
        const data = JSON.parse((await AsyncStorage.getItem(resultKey)) || "");

        set(data);
      } catch {}
    },

    updateResult: (
      task: "task1" | "task2" | "task3" | "task4" | "task5",
      message: string
    ) => {
      message += "    \n" + getState().result[task];

      set(({ result }) => {
        result[task] = message;
        return { result };
      });

      try {
        AsyncStorage.setItem(resultKey, JSON.stringify(getState()));
      } catch {}
    },

    resetTaskResult: (
      task: "task1" | "task2" | "task3" | "task4" | "task5"
    ) => {
      set(({ result }) => {
        result[task] = "";
        return { result };
      });

      try {
        AsyncStorage.setItem(resultKey, JSON.stringify(getState()));
      } catch {}
    },

    resetResult: () => {
      set({ result: { ...IntialResult } });

      try {
        AsyncStorage.setItem(resultKey, "");
      } catch {}
    },
  }))
);
