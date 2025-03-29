import { FetchResponse } from "@/lib/handleAction";
import { Info } from "./info";
import { ReactNode } from "react";

export function renderStatusMessage<T>(
  result: FetchResponse<T>,
  cardTitle: ReactNode | string,
  emptyListMessage = "No items found."
) {
  if (!result.ok)
    return <Info cardTitle={cardTitle} message={result.message} />;

  if (Array.isArray(result.data) && result.data.length === 0)
    return (
      <Info
        cardTitle={cardTitle}
        message={{ text: emptyListMessage, type: "not_found" }}
      />
    );

  return null;
}
