"use client";

import Link from "next/link";
import RelatedBlogs from "./RelatedBlog";
import SocialFollowCard from "./SocialFollowCard";
import CategoriesCard from "./CategoriesCard";
import { useEffect, useState } from "react";
import { fetchBlogs } from "@/lib/api";

export default function BlogSidebar({ categories, blogs }) {
  const [benzer, setBenzer] = useState([]);
  useEffect(() => {
    async function load() {
      const cats = await fetchBlogs();
      setBenzer(cats);
    }

    load();
  }, []);
  return (
    <div className="sticky top-28 z-40 w-[320px]">
      <aside className="space-y-8">
        <SocialFollowCard />
        <CategoriesCard categories={categories} />
        <RelatedBlogs blogs={blogs} benzer={benzer} />
      </aside>
    </div>
  );
}
