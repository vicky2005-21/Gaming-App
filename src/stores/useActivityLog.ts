import create from "zustand";
import { combine } from "zustand/middleware";
import { addItem } from "../lib/firbase";
import { formatTimestamp } from "../utils/formatTimestamp";
import { useUserIdStore } from "./useUserIdStore";

export type Activity = {
  timestamp: string;
  message: string;
  userId?: string;
};

export const useActivityLog = create(
  combine(
    {
      activities: [] as Activity[],
    },
    (set, getState) => ({
      addActivity: (message: string, timestamp: string = formatTimestamp()) => {
        const { activities } = getState();
        activities.push({ message, timestamp });

        set({ activities: activities });

        const { userId } = useUserIdStore.getState();
        addItem("activity_log_" + userId, { message, timestamp });
      },
      clearActivityLog: () => {
        set({ activities: [] });
      },
    })
  )
);
