import { getMessage } from "@/features/message/lib/get-message";
import { ZodSchema } from "zod";

export const getFormValues = (formData: FormData) =>
  Object.fromEntries(formData.entries());

export const generateSlug = (title: string) =>
  // only a-z , numbers , hyphen
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .trim()
    .replace(/\s+/g, "-"); // replace spaces with hyphen

    export const parseFormData = <T>(
      formData: FormData,
      schema: ZodSchema<T>
    ) => {
      const { data, error } = schema.safeParse(getFormValues(formData));
      if (error)
        return { data: null, fieldErrors: error.formErrors.fieldErrors };
      return { data, fieldErrors: null };
    };


export const NOT_LOGGED_IN_RESPONSE = {
  message: getMessage("auth", "NOT_LOGGED_IN"),
}
