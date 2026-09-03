"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const MESSAGES: Record<string, { text: string; tone: "success" | "error" }> = {
  created: { text: "Created.", tone: "success" },
  saved: { text: "Saved.", tone: "success" },
  deleted: { text: "Deleted.", tone: "success" },
  error: { text: "Something went wrong. Please try again.", tone: "error" },
};

const KEYS = Object.keys(MESSAGES);
const STORAGE_KEY = "admin_toast";

/** Fired by a form using useActionState once its Server Action resolves
 * (see ProjectForm/PostForm/TestimonialForm's Save path) — the update
 * case stays on the same page rather than redirecting, so there's no
 * navigation for a URL-based toast to hang off. create/delete still use
 * a `?created=1`-style query param on their redirect target instead,
 * since those genuinely navigate to a different page and that's the
 * simpler, already-reliable mechanism for that case.
 *
 * Written to sessionStorage, not just dispatched as a live event: the
 * revalidatePath calls inside every update action cause Next to refresh
 * the current route tree, which measurably remounts this component (and
 * the layout it lives in) for roughly a second or two afterward — a live
 * event fired during that window can land on an instance that's already
 * being torn down, so the toast never appears. sessionStorage survives
 * that churn; whichever Toast instance ends up mounted once things
 * settle picks it up on mount.
 */
export const TOAST_EVENT = "admin-toast";

export function fireToast(status: "saved" | "error") {
  try {
    sessionStorage.setItem(STORAGE_KEY, status);
  } catch {
    // sessionStorage can throw in some locked-down/private-browsing
    // contexts — the live event below still covers the common case.
  }
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: status }));
}

function consumeStoredToast(): string | null {
  try {
    const status = sessionStorage.getItem(STORAGE_KEY);
    if (status) sessionStorage.removeItem(STORAGE_KEY);
    return status;
  } catch {
    return null;
  }
}

export function Toast() {
  const searchParams = useSearchParams();
  const urlKey = KEYS.find((k) => searchParams.has(k));
  const [message, setMessage] = useState<{ text: string; tone: "success" | "error" } | null>(
    urlKey ? MESSAGES[urlKey] : null,
  );

  // Runs on every mount, including a remount caused by the post-action
  // refresh described above — catches a toast that was fired while no
  // stable Toast instance was around to hear the live event.
  useEffect(() => {
    const status = consumeStoredToast();
    if (status && status in MESSAGES) setMessage(MESSAGES[status]);
  }, []);

  // Catches the other case: this instance was already mounted and
  // stable when fireToast ran (no intervening remount).
  useEffect(() => {
    function handleEvent(event: Event) {
      consumeStoredToast();
      const status = (event as CustomEvent<string>).detail;
      if (status in MESSAGES) setMessage(MESSAGES[status]);
    }
    window.addEventListener(TOAST_EVENT, handleEvent);
    return () => window.removeEventListener(TOAST_EVENT, handleEvent);
  }, []);

  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => setMessage(null), 3500);
    return () => clearTimeout(timeout);
  }, [message]);

  if (!message) return null;

  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-50 rounded-pill px-5 py-3 font-heading text-[14px] shadow-lg ${
        message.tone === "success" ? "bg-lime text-black" : "bg-red-600 text-white"
      }`}
    >
      {message.text}
    </div>
  );
}
