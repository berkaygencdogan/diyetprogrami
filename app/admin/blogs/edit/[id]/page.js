"use client";
import { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchBlogById, updateBlog } from "@/lib/adminBlogApi";
import Image from "next/image";

const Editor = dynamic(() => import("@/components/admin/Editor"), {
  ssr: false,
});

export default function EditBlogPage({ params }) {
  const { id } = use(params);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(false); // ✅ YENİ: Görsel hata state'i
  const [uploadingImage, setUploadingImage] = useState(false);
  const [form, setForm] = useState({
    title: "",
    cover_image: "",
    content: "",
    category_id: "",
  });
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const toggleTag = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const addNewTag = async () => {
    if (!newTag.trim()) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newTag }),
    });

    const tag = await res.json();
    setAllTags((prev) => [...prev, tag]);
    setSelectedTags((prev) => [...prev, tag.id]);
    setNewTag("");
  };

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tags`)
      .then((r) => r.json())
      .then(setAllTags);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then((r) => r.json())
      .then(setCategories)
      .catch((err) => console.error("❌ Kategori yükleme hatası:", err));
  }, []);

  useEffect(() => {
    if (!token || !id) return;
    const updateBlogData = async () => {
      const data = await fetchBlogById(token, id);
      if (!data) return;
      setForm({
        title: data.title,
        cover_image: data.cover_image || "",
        content: data.content || "",
        category_id: data.category_id || "",
      });
      setSelectedTags(data.tags?.map((t) => t.id) || []);
      setLoading(false);
    };
    updateBlogData();
  }, [token, id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("❌ Dosya boyutu 5MB'dan küçük olmalıdır");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("❌ Lütfen sadece resim dosyası yükleyin");
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload/image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Upload error:", errorText);
        throw new Error(`Yükleme başarısız (${response.status})`);
      }

      const data = await response.json();

      const imagePath = data.location;
      const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${imagePath}`;

      setForm({ ...form, cover_image: fullUrl });

      const timestamp = Date.now();
      const previewUrl = `${fullUrl}?_=${timestamp}`;

      setImagePreview(previewUrl);
      setImageError(false);
    } catch (error) {
      console.error("❌ Resim yükleme hatası:", error);
      alert(error.message || "Resim yüklenirken bir hata oluştu");
      setImageError(true);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setForm({ ...form, cover_image: url });

    if (url) {
      let imageUrl = url;
      if (!url.startsWith("http")) {
        imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
      }

      // Cache busting
      const timestamp = Date.now();
      const cachedUrl = `${imageUrl}${imageUrl.includes("?") ? "&" : "?"}_=${timestamp}`;

      setImagePreview(cachedUrl);
      setImageError(false); // ✅ Yeni URL girildiğinde hata state'ini sıfırla
    } else {
      setImagePreview(null);
      setImageError(false);
    }
  };

  const removeImage = () => {
    setForm({ ...form, cover_image: "" });
    setImagePreview(null);
    setImageError(false); // ✅ Hata state'ini sıfırla
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await updateBlog(token, id, {
        ...form,
        tags: selectedTags,
      });
      alert("✅ Yazı güncellendi!");
    } catch (error) {
      console.error("❌ Güncelleme hatası:", error);
      alert("❌ Yazı güncellenirken bir hata oluştu!");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="edit-blog-page">
      <h1>Blog Yazısını Düzenle</h1>

      <form onSubmit={submit} className="blog-form">
        <div className="form-group">
          <label>Başlık *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Kapak Görseli</label>

          {/* ✅ DÜZELTME: Görsel preview - hata durumunu kontrol et */}
          {imagePreview && !imageError && (
            <div className="image-preview-container">
              <Image
                src={imagePreview}
                alt="Preview"
                width={400}
                height={250}
                className="rounded-lg object-cover"
                onError={(e) => {
                  console.error("❌ Görsel yüklenemedi:", imagePreview);
                  setImageError(true); // ✅ Sadece hata state'ini güncelle
                  // setImagePreview(null) YAPMA! Bu sonsuz döngü yaratır
                }}
                onLoad={() => {
                  setImageError(false);
                }}
              />
              <button
                type="button"
                className="remove-btn"
                onClick={removeImage}
              >
                ❌ Kaldır
              </button>
            </div>
          )}

          {/* ✅ YENİ: Hata durumu gösterimi */}
          {imagePreview && imageError && (
            <div className="image-error">
              <div className="error-icon">⚠️</div>
              <p>Görsel yüklenemedi</p>
              <small>{form.cover_image || imagePreview}</small>
              <div className="error-actions">
                <button
                  type="button"
                  onClick={() => {
                    // Tekrar dene
                    const timestamp = Date.now();
                    setImagePreview(
                      `${imagePreview.split("?")[0]}?_=${timestamp}`,
                    );
                    setImageError(false);
                  }}
                >
                  🔄 Tekrar Dene
                </button>
                <button type="button" onClick={removeImage}>
                  🗑️ Kaldır
                </button>
              </div>
            </div>
          )}

          <div className="upload-section">
            <label className={`upload-btn ${uploadingImage ? "disabled" : ""}`}>
              {uploadingImage ? "⏳ Yükleniyor..." : "📁 Yeni Görsel Yükle"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                style={{ display: "none" }}
              />
            </label>
            <small>Maksimum 5MB, JPG/PNG/WebP/GIF</small>
          </div>

          <div className="url-input">
            <label>veya URL:</label>
            <input
              type="text"
              placeholder="/uploads/blog/dosya.jpg"
              value={form.cover_image}
              onChange={handleImageUrlChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Kategori *</label>
          <select
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            required
          >
            <option value="">Kategori Seç</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Etiketler</label>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {allTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  border: "1px solid #d1d5db",
                  background: selectedTags.includes(tag.id)
                    ? "#10b981"
                    : "white",
                  color: selectedTags.includes(tag.id) ? "white" : "#374151",
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                #{tag.name}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <input
              placeholder="Yeni etiket"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button type="button" onClick={addNewTag}>
              Ekle
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>İçerik *</label>
          <Editor
            value={form.content}
            onChange={(html) => setForm({ ...form, content: html })}
          />
        </div>

        <button type="submit" className="submit-btn">
          📝 Güncelle
        </button>
      </form>

      <style jsx>{`
        .edit-blog-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        h1 {
          margin-bottom: 20px;
          color: #1f2937;
        }

        .blog-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        label {
          font-weight: 600;
          color: #374151;
        }

        input,
        select {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        input:focus,
        select:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        /* ✅ Görsel önizleme container */
        .image-preview-container {
          position: relative;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          margin: 10px 0;
          width: fit-content;
        }

        .image-preview-container img {
          display: block;
        }

        .remove-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .remove-btn:hover {
          background: rgba(220, 38, 38, 1);
        }

        /* ✅ YENİ: Hata durumu gösterimi */
        .image-error {
          background: #fef2f2;
          border: 2px solid #fecaca;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          margin: 10px 0;
        }

        .error-icon {
          font-size: 48px;
          margin-bottom: 10px;
        }

        .image-error p {
          color: #991b1b;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .image-error small {
          color: #dc2626;
          font-size: 12px;
          word-break: break-all;
          display: block;
          margin-bottom: 15px;
        }

        .error-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .error-actions button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .error-actions button:first-child {
          background: #3b82f6;
          color: white;
        }

        .error-actions button:first-child:hover {
          background: #2563eb;
        }

        .error-actions button:last-child {
          background: #ef4444;
          color: white;
        }

        .error-actions button:last-child:hover {
          background: #dc2626;
        }

        .upload-section {
          margin: 10px 0;
        }

        .upload-btn {
          display: inline-block;
          background: #10b981;
          color: white;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }

        .upload-btn:hover:not(.disabled) {
          background: #059669;
        }

        .upload-btn.disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }

        .upload-section small {
          display: block;
          margin-top: 8px;
          color: #6b7280;
          font-size: 12px;
        }

        .url-input {
          margin-top: 15px;
        }

        .url-input label {
          font-size: 14px;
          margin-bottom: 5px;
        }

        .submit-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 20px;
          transition: background 0.2s;
        }

        .submit-btn:hover {
          background: #059669;
        }

        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px;
          color: #6b7280;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top-color: #10b981;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
