import { apiBaseUrl } from "../constants";
import { useNetworkStatus } from "../stores/useNetworkStatus";

export const defaultMutationFn = async (variables: any) => {
  const { isInternetReachable } = useNetworkStatus.getState();

  if (!isInternetReachable) throw new Error("You're offline");

  const { body, path, params, method, catchError } = variables;

  try {
    const r = await fetch(
      `${apiBaseUrl}${path || ""}${params ? "/" + params : ""}`,
      {
        method: method || "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );

    const contentType = r.headers.get("content-type");

    if (r.status >= 400) {
      let x;
      if (contentType?.includes("json")) {
        x = await r.json();
      } else if (contentType?.includes("html")) {
        throw new Error("Some error occurred");
      } else {
        throw new Error(await r.text());
      }

      if (x.data) x = x.data;
      if (x.message) x = x.message;
      if (typeof x === "object") throw new Error(JSON.stringify(x));
      throw new Error(x);
    }

    if (contentType?.includes("json")) return await r.json();
    else return await r.text();
  } catch (e) {
    if (catchError) return e;

    throw e;
  }
};
