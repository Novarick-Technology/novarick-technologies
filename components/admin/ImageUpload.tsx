"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { uploadImage } from "@/app/admin/upload-image";

/**
 * Shared by the project and post editors, per ADMIN.md. Cover images are
 * 16:9 on desktop — the preview frame shows that crop so a wrong aspect
 * ratio is obvious before saving, rather than after it ships.
 */
export function ImageUpload({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Only JPEG, PNG and WebP images are accepted.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("File is larger than 8MB.");
      return;
    }

    const formData = new FormData();
    formData.set("file", file);
    startTransition(async () => {
      const result = await uploadImage(formData);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setUrl(result.url);
    });
  }

  return (
    <div className="flex w-full flex-col gap-1.5">
      <span className="font-heading text-[13px] font-medium text-black">{label}</span>
      <input type="hidden" name={name} value={url} />

      <div className="relative aspect-video w-full max-w-[400px] overflow-hidden rounded-panel border border-black/10 bg-paper-muted">
        {url ? (
          <Image src={url} alt="" fill sizes="400px" className="object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center font-body text-[13px] text-text-body">
            16:9 cover — no image yet
          </div>
        )}
        {pending && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 font-body text-[13px] text-black">
            Uploading…
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="dark"
          darkFill="ink-deep"
          height="h-9"
          fullWidthMobile={false}
          disabled={pending}
          onClick={() => inputRef.current?.click()}
        >
          {url ? "Replace" : "Upload"}
        </Button>
        {url && (
          <button
            type="button"
            onClick={() => setUrl("")}
            className="font-body text-[13px] text-text-body hover:text-red-600"
          >
            Remove
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <p className="font-body text-[12px] text-red-600">{error}</p>}
    </div>
  );
}
