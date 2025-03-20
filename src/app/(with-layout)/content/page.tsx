import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const id = session?.user.id ?? "no id"
  return (
    <main>
      {id}
    </main>
  );
}