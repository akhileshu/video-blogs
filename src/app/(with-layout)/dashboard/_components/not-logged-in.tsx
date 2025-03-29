import { getServerUser } from "@/features/auth/lib";
import { getMessage } from "@/features/message/lib/get-message";
import { Info } from "@/components/app/info";

export default async function NotLoggedIn() {
  const user = await getServerUser();
  const cardTitle = "My Profile";
  if (!user)
    return (
      <Info
        cardTitle={cardTitle}
        message={getMessage("auth", "NOT_LOGGED_IN")}
      />
    );
  return null;
}
