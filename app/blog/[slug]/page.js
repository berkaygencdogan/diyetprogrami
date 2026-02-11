import {
  fetchBlogBySlug,
  fetchCategories,
  fetchComments,
  getRelatedBlogsByTags,
} from "@/lib/api";

import BlogComments from "@/components/blog/BlogComments";
import BlogContentLayout from "@/components/blog/BlogContentLayout";
import CommentForm from "@/components/blog/CommentForm";
import FavoriteButton from "@/components/blog/FavoriteButton";
import TableOfContents from "@/components/blog/TableOfContents";

// 🆕 EKLENENLER
import BlogSidebar from "@/components/blog/BlogSidebar";
import FontSizeControl from "@/components/blog/FontSizeControl";
import MobileCategoryDrawer from "@/components/blog/MobileCategoryDrawer";

import EmojiReactions from "@/components/blog/EmojiReactions";
import PopularBlogs from "@/components/blog/PopularBlog";
import { addHeadingIds } from "@/lib/addHeadingIds";
import { generateTOC } from "@/lib/toc";
import { fetchRenderedSeo } from "@/lib/seo";
import VerticalAd from "@/components/ads/VerticalAd";
import HorizontalAd from "@/components/ads/HorizontalAd";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const seo = await fetchRenderedSeo({
    page_key: "blog_detail",
    slug,
  });

  if (!seo?.title) {
    return {
      title: "Blog | DiyetProgrami.com",
      robots: "noindex",
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    canonical: seo.canonical,
    robots: seo.robots,
  };
}

function autoLink(content, relatedBlogs) {
  let html = content;

  relatedBlogs.forEach((b) => {
    const regex = new RegExp(`\\b${b.title}\\b`, "i");

    if (!html.includes(`/blog/${b.slug}`)) {
      html = html.replace(
        regex,
        `<a href="/blog/${b.slug}" class="text-emerald-600 font-semibold underline">${b.title}</a>`,
      );
    }
  });

  return html;
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const blog = await fetchBlogBySlug(slug);
  if (!blog) return <div>Yazı bulunamadı</div>;

  const comments = await fetchComments(blog.id);
  const related = await getRelatedBlogsByTags(blog.id);
  const categories = await fetchCategories();

  const linkedContent = autoLink(blog.content, related);
  const toc = generateTOC(linkedContent);
  const contentWithIds = addHeadingIds(linkedContent);

  return (
    <>
      {/* 📱 MOBILE CATEGORY DRAWER */}
      <MobileCategoryDrawer categories={categories} />

      {/* 🧱 MAIN LAYOUT */}
      <div className="mx-auto w-full px-4">
        <div className="flex gap-10">
          {/* 🖥️ LEFT AD – SADECE DESKTOP */}
          <div className="hidden xl:block w-40">
            <aside className="hidden xl:block w-40 absolute left-0 top-0 h-full">
              <VerticalAd slotId="BLOGDETAIL_LEFT_1" position="left" />
            </aside>
          </div>

          {/* 📝 CONTENT */}
          <div className="flex-1 min-w-0">
            <BlogContentLayout
              title={blog.title}
              author={blog.author_name}
              cover={blog.cover_image}
              content={linkedContent}
              tags={blog.tags}
              views={blog.views}
              blog={blog}
            >
              <div className="flex flex-wrap items-center gap-4">
                <FavoriteButton blogId={blog.id} initial={blog.is_favorite} />
                <FontSizeControl />
              </div>

              <TableOfContents items={toc} />

              <div
                className="blog-content  mt-8 max-w-none"
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />
              <EmojiReactions blogId={blog.id} blogTitle={blog.title} />
              <BlogComments comments={comments} />
              <CommentForm blogId={blog.id} />
            </BlogContentLayout>
          </div>

          {/* 🖥️ SIDEBAR – SADECE DESKTOP */}
          <div className="hidden xl:block">
            <BlogSidebar categories={categories} blogs={related} />
          </div>
        </div>
        <div className="my-16">
          <HorizontalAd slotId="BLOGDETAIL_HORIZONTAL_1" />
        </div>
      </div>
    </>
  );
}
