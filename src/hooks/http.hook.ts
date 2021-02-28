import { useCallback, useState } from "react";

interface RequestBody {
  [key: string]: string;
}

export const useHttp = <T extends unknown=any>() => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (
      url: string = "",
      method: string = "GET",
      body: RequestBody | string | null = null,
      headers: HeadersInit = {}
    ) => {
      setLoading(true);

      try {
        if (body && typeof body === "object") {
          body["content/type"] = "application/json";
          body = JSON.stringify(body);
        }

        const options: RequestInit = { method, body, headers };
        const response = await fetch(url, options);
        const data: T = await response.json();

        if (!response.ok) {
          throw new Error("Something went wrong...");
        }

        setLoading(false);
        return data;
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    },
    []
  );

  return { loading, request };
};
