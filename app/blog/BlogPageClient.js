"use client";

import { useMemo, useState } from "react";
import BlogGridCard from "@/components/blog/BlogGridCard";
import FeaturedPost from "@/components/blog/FeaturedPost";
import CategoryFilterBar from "@/components/blog/CategoryFilterBar";

export default function BlogPageClient({ blogs, categories, query }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const HIDDEN_CATEGORY_IDS = [4, 5];

  const visibleCategories = categories.filter(
    (c) => !HIDDEN_CATEGORY_IDS.includes(c.id),
  );

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const matchSearch = query ? b.title.toLowerCase().includes(query) : true;

      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(b.category_id);

      return matchSearch && matchCategory;
    });
  }, [blogs, query, selectedCategories]);

  const featured = filtered[0];
  const others = filtered.slice(1);

  return (
    <>
      <CategoryFilterBar
        categories={visibleCategories}
        selected={selectedCategories}
        onToggle={toggleCategory}
      />

      {featured && <FeaturedPost post={featured} />}

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {others.map((post) => (
          <BlogGridCard key={post.id} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-sm text-gray-500">
          Aramanıza uygun yazı bulunamadı.
        </p>
      )}
    </>
  );
}
