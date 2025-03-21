type MessageType = "info" | "success" | "error" | "warning";

export type AppMessage = {
  type: MessageType;
  text: string;                                                           
};

export function defineMessages<T extends Record<string, AppMessage>>(
  messages: T
) {
  return messages;
}


