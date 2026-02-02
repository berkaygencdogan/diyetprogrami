"use client";

import Link from "next/link";
import RelatedBlogs from "./RelatedBlog";
import SocialFollowCard from "./SocialFollowCard";
import CategoriesCard from "./CategoriesCard";

export default function BlogSidebar({ categories, blogs }) {
  return (
    <div className="sticky top-28 z-40 w-[320px]">
      <aside className="space-y-8">
        <SocialFollowCard />
        <CategoriesCard categories={categories} />
        <RelatedBlogs blogs={blogs} />
      </aside>
    </div>
  );
}
