import { z } from "zod";

export const postCreateSchema = z.object({
  title: z.string().min(3, "Title too short"),
  content: z.string().min(10, "Content too short"),
});

export const postUpdateSchema = z.object({
  id: z.coerce.number(),
  title: z.string().min(3, "Title too short"),
  content: z.string().min(10, "Content too short"),
});

export const postDeleteSchema = z.object({
  id: z.coerce.number(),
});

export const toggleBookmarkSchema = z.object({
  postId: z.coerce.number(),
});
