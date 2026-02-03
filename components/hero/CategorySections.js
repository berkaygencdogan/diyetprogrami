"use client";

import { useEffect, useState } from "react";
import CategorySection from "./CategorySection";
import DietAutoSlider from "./DietAutoSlider";
import HealthyLifeGrid from "./HealthyLifeGrid";
import { fetchCategories, fetchBlogsByCategory } from "@/lib/blogApi";

export default function CategorySections() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function load() {
      const cats = await fetchCategories();

      const withPosts = await Promise.all(
        cats.map(async (cat) => {
          const posts = await fetchBlogsByCategory(cat.slug);
          return { ...cat, posts };
        }),
      );

      setCategories(withPosts);
    }

    load();
  }, []);

  return (
    <div className="mx-auto mt-20 max-w-7xl px-4 space-y-24">
      {categories.map((cat) => {
        // 🔹 ÖZEL TASARIMLAR
        if (cat.slug === "diyet") {
          return <DietAutoSlider key={cat.id} posts={cat.posts} />;
        }

        if (cat.slug === "saglikli-yasam") {
          return <HealthyLifeGrid key={cat.id} posts={cat.posts} />;
        }

        // 🔹 DEFAULT GRID (Beslenme vb.)
        return (
          <CategorySection
            key={cat.id}
            title={cat.name}
            slug={cat.slug}
            posts={cat.posts}
          />
        );
      })}
    </div>
  );
}
