import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import JsonLd from "@/components/JsonLd";
import { postMetadata, postSchema } from "@/lib/blog/meta";
import { konsiliencePost, konsiliencePosts, toCard } from "@/lib/server/blogSource";

// Posts published from the admin refresh on save (revalidatePath); this is the fallback.
export const revalidate = 300;

export async function generateStaticParams() {
  return (await konsiliencePosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await konsiliencePost((await params).slug);
  return post ? postMetadata(post) : {};
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await konsiliencePost((await params).slug);
  if (!post) notFound();

  const all = await konsiliencePosts();
  const others = all.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const related = [...sameCategory, ...others.filter((p) => p.category !== post.category)].slice(0, 3).map(toCard);

  return (
    <>
      <JsonLd data={postSchema(post)} />
      <BlogArticle post={post} related={related} />
    </>
  );
}
