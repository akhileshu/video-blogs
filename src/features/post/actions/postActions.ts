"use server";
import { getServerUser } from "@/features/auth/lib";
import { prisma } from "@/features/db/prisma";
import { getMessage } from "@/features/message/lib/get-message";
import { revalidatePath } from "next/cache";
import {
  postCreateSchema,
  postDeleteSchema,
  postUpdateSchema,
  toggleBookmarkSchema,
} from "../zod";
import { generateSlug, parseFormData } from "./lib";

export async function getPosts(query?: string) {
  return await prisma.post.findMany({
    where: query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
}

export async function getLoggedInUsersPosts() {
  const user = await getServerUser();
  if (!user) return { message: getMessage("auth", "NOT_LOGGED_IN") };
  const posts = await prisma.post.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return { data: posts };
}

export async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { author: true },
    });
    if (!post) return { message: getMessage("post", "NOT_FOUND") };
    return { data: post };
  } catch (error) {
    console.error("Create post error:", error);
    return { message: getMessage("post", "NOT_FOUND") };
  }
}

export async function createPost(_: unknown, formData: FormData) {
  try {
    const user = await getServerUser();
    if (!user) return { message: getMessage("auth", "NOT_LOGGED_IN") };
    const authorId = user.id;
    const { data, fieldErrors } = parseFormData(formData, postCreateSchema);
    if (fieldErrors) return { fieldErrors };

    const { content, title } = data;

    await prisma.post.create({
      data: { title, slug: generateSlug(title), content, authorId },
    });

    return { message: getMessage("post", "CREATE_SUCCESS") };
  } catch (err) {
    console.error("Create post error:", err);
    return { message: getMessage("post", "CREATE_ERROR") };
  }
}

export async function updatePost(_: unknown, formData: FormData) {
  try {
    const user = await getServerUser();
    if (!user) return { message: getMessage("auth", "NOT_LOGGED_IN") };
    const authorId = user.id;
    const { data, fieldErrors } = parseFormData(formData, postUpdateSchema);
    if (fieldErrors) return { fieldErrors };
    const { content, id, title } = data;

    await prisma.post.update({
      where: { id, authorId },
      data: { title, content, slug: generateSlug(title) },
    });
    return { message: getMessage("post", "UPDATE_SUCCESS") };
  } catch (error) {
    console.error("Create post error:", error);
    return { message: getMessage("post", "UPDATE_ERROR") };
  }
}

export async function deletePost(_: unknown, formData: FormData) {
  try {
    const user = await getServerUser();
    if (!user) return { message: getMessage("auth", "NOT_LOGGED_IN") };
    const { data, fieldErrors } = parseFormData(formData, postDeleteSchema);
    if (fieldErrors) return { fieldErrors };
    const { id } = data;
    await prisma.post.delete({ where: { id, authorId: user.id } });
    revalidatePath("/dashboard");
    return { message: getMessage("post", "DELETE_SUCCESS") };
  } catch (error) {
    console.error("Toggle bookmark error:", error);
    return { message: getMessage("post", "DELETE_ERROR") };
  }
}

export const toggleBookmark = async (_: unknown, formData: FormData) => {
  try {
    const user = await getServerUser();
    if (!user) return { message: getMessage("auth", "NOT_LOGGED_IN") };
    const { data, fieldErrors } = parseFormData(formData, toggleBookmarkSchema);
    if (fieldErrors) return { fieldErrors };
    const { postId } = data;

    const userId = user.id;
    const existing = await prisma.bookmark.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existing) {
      const updated = await prisma.bookmark.update({
        where: { id: existing.id },
        data: { isBookmarked: !existing.isBookmarked },
      });
      // used router.refresh() instead of revalidatePath()
      // to show toast on client before triggering revalidation
      // revalidatePath("/dashboard");
      return {
        bookmarked: updated.isBookmarked,
        message: updated.isBookmarked
          ? getMessage("bookmark", "ADD_SUCCESS")
          : getMessage("bookmark", "REMOVE_SUCCESS"),
      };
    } else {
      const created = await prisma.bookmark.create({
        data: { userId, postId, isBookmarked: true },
      });
      return {
        bookmarked: created.isBookmarked,
        message: getMessage("bookmark", "ADD_SUCCESS"),
      };
    }
  } catch (error) {
    console.error("Toggle bookmark error:", error);
    return { message: getMessage("bookmark", "REMOVE_ERROR") };
  }
};

export const getBookmarkedPosts = async () => {
  try {
    const user = await getServerUser();
    if (!user) return { message: getMessage("auth", "NOT_LOGGED_IN") };
    const bookmarkedPosts = await prisma.bookmark.findMany({
      where: { userId: user.id, isBookmarked: true },
      include: { post: true },
    });
    return { data: bookmarkedPosts };
  } catch (error) {
    console.error("Toggle bookmark error:", error);
    return { message: getMessage("bookmark", "REMOVE_ERROR") };
  }
};

export const isPostBookmarked = async (postId: number) => {
  const user = await getServerUser();
  if (!user) return { message: getMessage("auth", "NOT_LOGGED_IN") };
  const existing = await prisma.bookmark.findUnique({
    where: { userId_postId: { userId: user.id, postId } },
  });

  return { bookmarked: existing?.isBookmarked ?? false };
};
