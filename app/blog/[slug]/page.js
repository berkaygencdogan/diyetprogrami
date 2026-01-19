import { fetchBlogBySlug, fetchComments } from "@/lib/api";
import BlogContentLayout from "@/components/blog/BlogContentLayout";
import CommentForm from "@/components/blog/CommentForm";
import BlogComments from "@/components/blog/BlogComments";

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const blog = await fetchBlogBySlug(slug);
  if (!blog) {
    return <div>Yazı bulunamadı</div>;
  }

  // ✅ ONAYLI YORUMLARI ÇEK
  const comments = await fetchComments(blog.id);

  return (
    <BlogContentLayout
      title={blog.title}
      cover={blog.cover_image}
      author="Diyet Programı"
    >
      {/* BLOG İÇERİĞİ */}
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />

      {/* YORUMLAR */}
      <BlogComments comments={comments} />

      {/* YORUM FORMU */}
      <CommentForm blogId={blog.id} />
    </BlogContentLayout>
  );
}
