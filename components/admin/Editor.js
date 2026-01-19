"use client";

import { Editor } from "@tinymce/tinymce-react";

export default function TinyEditor({ value, onChange }) {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 420,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "searchreplace",
          "code",
          "fullscreen",
          "table",
        ],
        toolbar:
          "undo redo | formatselect | bold italic underline | " +
          "alignleft aligncenter alignright | bullist numlist | " +
          "link image | code fullscreen",
        images_upload_handler: async (blobInfo) => {
          const token = localStorage.getItem("token");

          const formData = new FormData();
          formData.append("file", blobInfo.blob());

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/upload/image`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            },
          );

          const json = await res.json();

          // 🔥 MUTLAKA 5000 PORTU
          return `${process.env.NEXT_PUBLIC_API_URL}${json.location}`;
        },

        automatic_uploads: true,
        images_reuse_filename: false,

        content_style:
          "body { font-family: Inter, Arial, sans-serif; font-size: 15px; }",
      }}
    />
  );
}
