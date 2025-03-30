"use server";
import { getServerUser } from "@/features/auth/lib";
import { prisma } from "@/features/db/prisma";
import { getMessage } from "@/features/message/lib/get-message";
import { revalidatePath } from "next/cache";
import {
  postCreateSchema,
  postDeleteSchema,
  postQuerySchema,
  postUpdateSchema,
  toggleBookmarkSchema,
} from "./zod";
import { generateSlug } from "./lib";
import {
  fetchSuccess,
  fetchError,
  handleFetchAction,
  mutateSuccess,
  mutateError,
  handleMutateAction,
  FetchResponse,
  MutateResponse,
  fetchErrorNotLoggedIn,
  mutateErrorNotLoggedIn,
  parseFormData,
} from "../../../lib/handleAction";
import { Post, Prisma } from "@prisma/client";
import { APP_SETTINGS } from "@/lib/utils";

type PostWithAuthor = Prisma.PostGetPayload<{
  include: { author: true };
}>;
export async function getPosts(
  query?: string
): Promise<FetchResponse<PostWithAuthor[]>> {
  return handleFetchAction(async () => {
    const { data, error } = postQuerySchema.safeParse({ query });
    // todo : improve appmessages , maybe we need to include fielderrors in fetchresponse as well
    if (error) return fetchError(getMessage("post", "NOT_FOUND"));
    const posts = await prisma.post.findMany({
      where: data.query
        ? {
            OR: [
              { title: { contains: data.query, mode: "insensitive" } },
              { content: { contains: data.query, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
      include: { author: true },
      take: 50,
    });
    return fetchSuccess(posts);
  });
}

export async function getLoggedInUsersPosts(): Promise<FetchResponse<Post[]>> {
  return handleFetchAction(async () => {
    const user = await getServerUser();
    if (!user) return fetchErrorNotLoggedIn;
    const posts = await prisma.post.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return fetchSuccess(posts);
  });
}

export async function getPostBySlug(
  slug: string
): Promise<FetchResponse<PostWithAuthor>> {
  return handleFetchAction(async () => {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { author: true },
    });
    if (!post) return fetchError(getMessage("post", "NOT_FOUND"));
    return fetchSuccess(post);
  });
}

export async function createPost(
  _: unknown,
  formData: FormData
): Promise<MutateResponse<undefined, typeof postCreateSchema>> {
  return handleMutateAction(async () => {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;

    if (APP_SETTINGS.isProd) {
      const userData = await prisma.user.findUnique({
        where: { id: user.id },
        select: { totalPostsCreated: true },
      });

      if (
        userData &&
        userData.totalPostsCreated >= APP_SETTINGS.limits.POSTS_CREATE
      ) {
        return mutateError(getMessage("post", "CREATE_LIMIT_REACHED"));
      }
    }

    const { data, fieldErrors } = parseFormData(formData, postCreateSchema);
    if (fieldErrors)
      return mutateError(getMessage("post", "CREATE_ERROR"), fieldErrors);
    await prisma.post.create({
      data: {
        title: data.title,
        slug: generateSlug(data.title),
        content: data.content,
        authorId: user.id,
      },
    });

    if (APP_SETTINGS.isProd) {
      await prisma.user.update({
        where: { id: user.id },
        data: { totalPostsCreated: { increment: 1 } },
      });
    }

    return mutateSuccess(getMessage("post", "CREATE_SUCCESS"));
  });
}

export async function updatePost(
  _: unknown,
  formData: FormData
): Promise<MutateResponse<undefined, typeof postUpdateSchema>> {
  return handleMutateAction(async () => {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;

    if (APP_SETTINGS.isProd) {
      const userData = await prisma.user.findUnique({
        where: { id: user.id },
        select: { totalPostsUpdated: true },
      });

      if (
        userData &&
        userData.totalPostsUpdated >= APP_SETTINGS.limits.POSTS_UPDATE
      ) {
        return mutateError(getMessage("post", "UPDATE_LIMIT_REACHED"));
      }
    }

    const { data, fieldErrors } = parseFormData(formData, postUpdateSchema);
    if (fieldErrors)
      return mutateError(getMessage("post", "UPDATE_ERROR"), fieldErrors);
    await prisma.post.update({
      where: { id: data.id, authorId: user.id },
      data: {
        title: data.title,
        content: data.content,
        slug: generateSlug(data.title),
      },
    });
    if (APP_SETTINGS.isProd) {
      await prisma.user.update({
        where: { id: user.id },
        data: { totalPostsUpdated: { increment: 1 } },
      });
    }
    return mutateSuccess(getMessage("post", "UPDATE_SUCCESS"));
  });
}

export async function deletePost(
  _: unknown,
  formData: FormData
): Promise<MutateResponse<undefined, typeof postDeleteSchema>> {
  return handleMutateAction(async () => {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;
    const { data, fieldErrors } = parseFormData(formData, postDeleteSchema);
    if (fieldErrors)
      return mutateError(getMessage("post", "DELETE_ERROR"), fieldErrors);
    await prisma.post.delete({ where: { id: data.id, authorId: user.id } });
    return mutateSuccess(getMessage("post", "DELETE_SUCCESS"));
  });
}

export async function toggleBookmark(
  _: unknown,
  formData: FormData
): Promise<
  MutateResponse<
    {
      isBookmarked: boolean;
    },
    typeof toggleBookmarkSchema
  >
> {
  return handleMutateAction(async () => {
    const user = await getServerUser();
    if (!user) return mutateErrorNotLoggedIn;

    const incrementBookmarkCountInProd = async () => {
      if (APP_SETTINGS.isProd) {
        await prisma.user.update({
          where: { id: user.id },
          data: { totalBookmarksAdded: { increment: 1 } },
        });
      }
    };

    if (APP_SETTINGS.isProd) {
      const userData = await prisma.user.findUnique({
        where: { id: user.id },
        select: { totalBookmarksAdded: true },
      });

      if (
        userData &&
        userData.totalBookmarksAdded >= APP_SETTINGS.limits.MAX_BOOKMARKS
      ) {
        return mutateError(getMessage("bookmark", "BOOKMARK_LIMIT"));
      }
    }

    const { data, fieldErrors } = parseFormData(formData, toggleBookmarkSchema);
    if (fieldErrors)
      return mutateError(getMessage("bookmark", "REMOVE_ERROR"), fieldErrors);
    const { postId } = data;
    const existing = await prisma.bookmark.findUnique({
      where: { userId_postId: { userId: user.id, postId } },
    });
    if (existing) {
      const updated = await prisma.bookmark.update({
        where: { id: existing.id },
        data: { isBookmarked: !existing.isBookmarked },
      });
      incrementBookmarkCountInProd()
      return mutateSuccess(
        updated.isBookmarked
          ? getMessage("bookmark", "ADD_SUCCESS")
          : getMessage("bookmark", "REMOVE_SUCCESS"),
        { isBookmarked: updated.isBookmarked }
      );
    } else {
      const created = await prisma.bookmark.create({
        data: { userId: user.id, postId, isBookmarked: true },
      });
      incrementBookmarkCountInProd();
      return mutateSuccess(getMessage("bookmark", "ADD_SUCCESS"), {
        isBookmarked: created.isBookmarked,
      });
    }
  });
}

type BookmarkWithAuthor = Prisma.BookmarkGetPayload<{
  include: { post: true };
}>;
export async function getBookmarkedPosts(): Promise<
  FetchResponse<BookmarkWithAuthor[]>
> {
  return handleFetchAction(async () => {
    const user = await getServerUser();
    if (!user) return fetchErrorNotLoggedIn;
    const bookmarkedPosts = await prisma.bookmark.findMany({
      where: { userId: user.id, isBookmarked: true },
      include: { post: true },
    });
    return fetchSuccess(bookmarkedPosts);
  });
}

export const isPostBookmarked = async (
  postId: number
): Promise<FetchResponse<{ isBookmarked: boolean }>> => {
  return handleFetchAction(async () => {
    // return fetchErrorNotLoggedIn;
    const user = await getServerUser();
    if (!user) return fetchErrorNotLoggedIn;
    const existing = await prisma.bookmark.findUnique({
      where: { userId_postId: { userId: user.id, postId } },
    });

    return fetchSuccess({ isBookmarked: existing?.isBookmarked ?? false });
  });
};

export async function revalidatePathAction(path: string) {
  revalidatePath(path);
}
