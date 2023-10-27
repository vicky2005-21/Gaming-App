import create from "zustand";
import { combine } from "zustand/middleware";

export const useNetworkStatus = create(
  combine(
    {
      isConnected: true,
      isInternetReachable: true,
    },
    (set) => ({
      setConnected: (x: {
        isConnected: boolean;
        isInternetReachable: boolean;
      }) => {
        set(x);
      },
    })
  )
);
