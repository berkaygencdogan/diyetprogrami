import {
  fetchBlogBySlug,
  fetchComments,
  getRelatedBlogsByTags,
} from "@/lib/api";
import BlogContentLayout from "@/components/blog/BlogContentLayout";
import CommentForm from "@/components/blog/CommentForm";
import BlogComments from "@/components/blog/BlogComments";
import TableOfContents from "@/components/blog/TableOfContents";
import { generateTOC } from "@/lib/toc";
import { addHeadingIds } from "@/lib/addHeadingIds";
import FavoriteButton from "@/components/blog/FavoriteButton";

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

  // 1️⃣ BLOG
  const blog = await fetchBlogBySlug(slug);
  if (!blog) return <div>Yazı bulunamadı</div>;

  // 2️⃣ YORUMLAR
  const comments = await fetchComments(blog.id);

  // 3️⃣ İLGİLİ YAZILAR (ETİKETTEN)
  const related = await getRelatedBlogsByTags(blog.id);

  // 4️⃣ AUTO LINK
  const linkedContent = autoLink(blog.content, related);

  // 5️⃣ TOC
  const toc = generateTOC(linkedContent);

  // 6️⃣ HEADING ID EKLE
  const contentWithIds = addHeadingIds(linkedContent);

  return (
    <BlogContentLayout
      title={blog.title}
      author={blog.author_name}
      cover={blog.cover_image}
      content={linkedContent}
      tags={blog.tags}
      views={blog.views}
      blog={blog}
    >
      <FavoriteButton blogId={blog.id} initial={blog.is_favorite} />
      {/* 📑 TOC */}
      <TableOfContents items={toc} />

      {/* 📄 BLOG CONTENT */}
      <div
        className="prose prose-lg mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: contentWithIds }}
      />

      {/* 💬 YORUMLAR */}
      <BlogComments comments={comments} />
      <CommentForm blogId={blog.id} />
    </BlogContentLayout>
  );
}
