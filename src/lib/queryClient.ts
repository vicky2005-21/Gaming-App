import { QueryClient } from "react-query";
import { defaultQueryFn } from "./defaultQueryFn";
import { defaultMutationFn } from "./defaultMutationFn";
import { showToast } from "./showToast";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (e) => {
        if ("message" in e) {
          showToast(e.message, "error");
        } else {
          showToast("Some error occured while mutating", "error");
        }
      },
      mutationFn: defaultMutationFn,
    },
    queries: {
      staleTime: 1000 * 60 * 10,
      onError: (e) => {
        if ("message" in e) {
          showToast(e.message, "error");
        } else {
          showToast("Some error occured while quering", "error");
        }
      },
      queryFn: defaultQueryFn,
    },
  },
});
