import { queryOptions } from "@tanstack/react-query";
import ky from "ky";
import { getWebRequest } from "vinxi/http";

import { meSchema } from "@repo/dto";

export const DEPLOY_URL =
  import.meta.env["VITE_API_URL"] ?? "http://localhost:4200";

export async function getMe() {
  const request = getWebRequest();
  console.log("request", request);

  const response = await ky(`${DEPLOY_URL}/api/auth/me`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return meSchema.parse(data);
}

export const meQueryOptions = () =>
  queryOptions({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });
