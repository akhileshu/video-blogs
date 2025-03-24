import { AppCard } from "@/components/app/card";
import { getServerUser } from "@/features/auth/lib";
import { getMessage } from "@/features/message/lib/get-message";
import { cn } from "@/lib/utils";

export async function MyProfile({ className }: { className?: string }) {
  const user = await getServerUser();

  return (
    <AppCard
      title="My Profile"
      className={cn("border-0", className)}
      info={{ show: !user, message: getMessage("auth", "NOT_LOGGED_IN") }}
    >
      <p>{user?.name}</p>
      <p>{user?.email}</p>
    </AppCard>
  );
}
