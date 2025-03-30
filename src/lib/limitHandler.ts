import { prisma } from "@/features/db/prisma";
import { AppMessage } from "@/features/message/lib/define-messages";
import { getMessage } from "@/features/message/lib/get-message";
import { mutateError } from "@/lib/handleAction";
import { APP_SETTINGS, getErrorMessage } from "@/lib/utils";
import { User } from "@prisma/client";

type LimitField = keyof Pick<
  User,
  "totalPostsCreated" | "totalPostsUpdated" | "totalBookmarksAdded"
>;
type LimitKey = keyof (typeof APP_SETTINGS)["limits"];

// type MessageCategory =keyof Pick<typeof appMessages, "post" | "bookmark">; // "post" | "bookmark"
const LIMIT_MAPPING: Record<LimitField, LimitKey> = {
  totalPostsCreated: "POSTS_CREATE",
  totalPostsUpdated: "POSTS_UPDATE",
  totalBookmarksAdded: "MAX_BOOKMARKS",
};

export async function checkLimit(
  userId: string,
  limitfield: LimitField,
  messageOnLimitReached: AppMessage
) {
  try {
    if (!APP_SETTINGS.isProd) return null; // Skip in dev
    const limitKey = LIMIT_MAPPING[limitfield];
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: { [limitfield]: true },
    });

    if (
      userData &&
      Number(userData[limitfield]) >= APP_SETTINGS.limits[limitKey]
    ) {
      return mutateError(messageOnLimitReached);
    }

    return null;
  } catch (error) {
    console.log(getErrorMessage(error));
    return mutateError(getMessage("common", "LIMIT_CHECK_FAILED"));
  }
}

export async function incrementLimit(userId: string, field: LimitField) {
  try {
    if (!APP_SETTINGS.isProd) return;

    await prisma.user.update({
      where: { id: userId },
      data: { [field]: { increment: 1 } },
    });
  } catch (error) {
    console.log(getErrorMessage(error));
    return mutateError(getMessage("common", "LIMIT_CHECK_FAILED"));
  }
}
