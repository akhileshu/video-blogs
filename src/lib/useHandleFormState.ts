"use client";

import { useEffect } from "react";
import { revalidatePathAction } from "@/features/post/actions/postActions";
import { MutateResponse } from "@/lib/handleAction";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handleToastMessage } from "@/components/app/toast";

/**
 * Custom hook to handle form state updates, side effects like :
 * revalidating cache, navigation, showing toasts
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useHandleFormState<T, S extends z.ZodType<any> = any>({
  state,
  revalidatePath,
  navigateTo,
}: {
  state: MutateResponse<T, S>;
  revalidatePath?: string;
  navigateTo?: string;
}) {
  const router = useRouter();
  useEffect(() => {
    if (!state) return;

    const { fieldErrors, message, ok } = state;

    if (ok) {
      if (revalidatePath) revalidatePathAction(revalidatePath);
      if (navigateTo) router.push(navigateTo);
    }

    if (fieldErrors) {
      //idea : Filter and collect non-user input errors (prefixed with "_")
      const nonUserErrors = Object.entries(fieldErrors)
        // .filter(([key]) => key.startsWith("_")) // Only prefixed fields
        .flatMap(([, errors]) => errors ?? []);

      if (nonUserErrors.length > 0) {
        toast.error(
          `Please fix the following errors:\n\n${nonUserErrors
            .map((err, index) => `${index + 1}. ${err}`)
            .join("\n")}`
        );
        return;
      }
    }

    if (message) {
      handleToastMessage(message);
    }
  }, [state, revalidatePath, navigateTo, router]);
}
