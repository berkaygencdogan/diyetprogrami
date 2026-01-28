'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';

export default function AdminSliders() {
  // State management
  const [sliders, setSliders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');
  const [link, setLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Refs
  const fileInputRef = useRef(null);
  const successTimeoutRef = useRef(null);

  // Get auth token
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  const token = getToken();

  /* =========================
     API HELPER FUNCTIONS
  ========================= */
  const apiFetch = useCallback(
    async (url, options = {}) => {
      const defaultOptions = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      try {
        const response = await fetch(url, defaultOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
        throw err;
      }
    },
    [token]
  );

  /* =========================
     LOAD SLIDERS
  ========================= */
  const loadSliders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders`);
      setSliders(data);
    } catch (err) {
      setError('Sliderlar yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }, [apiFetch]);

  useEffect(() => {
    loadSliders();
  }, [loadSliders]);

  /* =========================
     IMAGE UPLOAD
  ========================= */
  const uploadImage = async (file) => {
    if (!file) return;

    // File validation
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError('Lütfen geçerli bir resim dosyası seçin (JPEG, PNG, GIF, WebP).');
      return;
    }

    if (file.size > maxSize) {
      setError('Dosya boyutu 5MBtan küçük olmalıdır.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Resim yüklenemedi.');
      }

      const json = await response.json();
      const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${json.location}`;

      setImage(fullUrl);
      
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewSrc(objectUrl);
      
      // Return cleanup function
      return () => URL.revokeObjectURL(objectUrl);
    } catch (err) {
      setError('Resim yüklenirken bir hata oluştu.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  /* =========================
     CREATE / UPDATE SLIDER
     UPDATE için: Yeni slider oluştur, eskiyi sil
  ========================= */
  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!image) {
      setError('Lütfen bir slider görseli seçin.');
      return;
    }

    const payload = { title, image, link };

    try {
      if (editingId) {
        // GÜNCELLEME: Yeni slider oluştur, eskiyi sil
        try {
          // 1. Yeni slider oluştur
          await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders`, {
            method: 'POST',
            body: JSON.stringify(payload),
          });

          // 2. Eski slider'ı sil
          await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders/${editingId}`, {
            method: 'DELETE',
          });

          setSuccessMessage('Slider başarıyla güncellendi (yeni oluşturulup eski silindi).');
        } catch (updateErr) {
          console.error('Update error:', updateErr);
          throw new Error('Slider güncellenirken bir hata oluştu.');
        }
      } else {
        // YENİ SLIDER EKLEME
        await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders`, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setSuccessMessage('Slider başarıyla eklendi.');
      }

      // Clear success message after 3 seconds
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      successTimeoutRef.current = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      resetForm();
      loadSliders();
    } catch (err) {
      setError('Slider kaydedilirken bir hata oluştu: ' + err.message);
    }
  };

  /* =========================
     FORM HELPERS
  ========================= */
  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setImage('');
    setPreviewSrc('');
    setLink('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const edit = (slider) => {
    setEditingId(slider.id);
    setTitle(slider.title || '');
    setImage(slider.image || '');
    setPreviewSrc(slider.image || '');
    setLink(slider.link || '');
    setError(null);
    setSuccessMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!window.confirm('Bu sliderı silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders/${id}`, {
        method: 'DELETE',
      });

      setSuccessMessage('Slider başarıyla silindi.');
      setTimeout(() => setSuccessMessage(''), 3000);

      loadSliders();
    } catch (err) {
      setError('Slider silinirken bir hata oluştu.');
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  // Handle image replacement
  const handleReplaceImage = () => {
    // Clear current image
    setImage('');
    setPreviewSrc('');
    
    // Trigger file input
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 100);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  /* =========================
     RENDER
  ========================= */
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Slider Yönetimi</h1>
        <p className="mt-2 text-gray-600">
          Sliderlarınızı ekleyin, düzenleyin veya silin.
          {editingId && (
            <span className="ml-2 text-emerald-600">
              (Düzenleme Modu: Yeni slider oluşturulup eski silinecek)
            </span>
          )}
        </p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-6 rounded-lg bg-emerald-50 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-emerald-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-emerald-800">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= FORM SECTION ================= */}
      <div className="mb-10 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          {editingId ? (
            <div className="flex items-center gap-2">
              <span>Slider Düzenle</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
                ID: {editingId}
              </span>
            </div>
          ) : (
            'Yeni Slider Ekle'
          )}
        </h2>

        <form onSubmit={submit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Başlık (Opsiyonel)
            </label>
            <input
              id="title"
              type="text"
              placeholder="Slider başlığı girin"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Slider Görseli (Zorunlu)
            </label>

            <div className="space-y-4">
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                id="slider-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Upload/Preview Area */}
              <div
                onClick={triggerFileInput}
                className={`relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-all duration-200 ${
                  previewSrc || image
                    ? 'border-gray-300 hover:border-gray-400'
                    : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
                }`}
              >
                {previewSrc || image ? (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={previewSrc || image}
                      alt="Slider preview"
                      fill
                      className="object-contain p-4"
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={editingId !== null}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 hover:bg-black/10 hover:opacity-100">
                      <div className="rounded-lg bg-white/90 px-4 py-2 shadow-lg">
                        <p className="flex items-center gap-2 font-medium text-gray-700">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                          {editingId && image && !previewSrc ? 'Görseli Koru veya Değiştir' : 'Görseli Değiştir'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex aspect-video flex-col items-center justify-center p-8 text-center">
                    <div className="mb-4 text-gray-400">
                      <svg
                        className="h-16 w-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="mb-2 font-medium text-gray-700">
                      Görsel yüklemek için tıklayın veya sürükleyin
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF, WebP • Maksimum 5MB
                    </p>
                  </div>
                )}
              </div>

              {/* Image Actions */}
              {(previewSrc || image) && (
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleReplaceImage}
                      className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      Yeni Görsel Seç
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImage('');
                        setPreviewSrc('');
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Görseli Kaldır
                    </button>
                  </div>

                  {uploading && (
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent"></div>
                      Yükleniyor...
                    </div>
                  )}
                </div>
              )}
              
              {/* Info Message for Editing */}
              {editingId && image && !previewSrc && (
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Not:</span> Mevcut görsel kullanılacak. 
                    Yeni görsel yüklemezseniz mevcut görsel korunacak.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Link Input */}
          <div>
            <label
              htmlFor="link"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Link (Opsiyonel)
            </label>
            <input
              id="link"
              type="url"
              placeholder="https://example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* Edit Mode Warning */}
          {editingId && (
            <div className="rounded-lg bg-yellow-50 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
           
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              type="submit"
              disabled={(!image && !previewSrc) || uploading}
              className="inline-flex min-w-[140px] items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Yükleniyor...
                </>
              ) : editingId ? (
                'Düzenle'
              ) : (
                'Slidera Ekle'
              )}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ================= SLIDER LIST ================= */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Mevcut Sliderlar ({sliders.length})
          </h2>

          {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
              Yükleniyor...
            </div>
          )}
        </div>

        {sliders.length === 0 && !loading ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 py-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-4 text-gray-500">Henüz slider eklenmemiş.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sliders.map((slider) => (
              <div
                key={slider.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-lg"
              >
                {/* Slider Image */}
                <div className="relative aspect-video bg-gray-100">
                  {slider.image ? (
                    <Image
                      src={slider.image}
                      alt={slider.title || 'Slider görseli'}
                      fill
                      className="object-cover"
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      <svg
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Slider Info */}
                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900">
                      {slider.title || 'Başlıksız Slider'}
                    </h3>
                    {slider.link && (
                      <p className="mt-1 truncate text-sm text-gray-500">
                        {slider.link}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-400">
                      ID: {slider.id}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => edit(slider)}
                      className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => remove(slider.id)}
                      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}