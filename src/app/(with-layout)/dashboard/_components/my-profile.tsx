import { AppCard } from "@/components/ui/app/card";
import { getServerUser } from "@/features/auth/lib";
import { cn } from "@/lib/utils";

export async function MyProfile({className}:{className?:string}){
    const user = await getServerUser();

    return (
      <AppCard
        title="My Profile" className={cn("", className)}
        info={{ show: !user, text: "Please log in to view your profile." }}
      >
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </AppCard>
    );
}