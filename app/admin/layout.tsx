import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  robots: { index: false, follow: false },
};

/**
 * Every admin page reads live data and sits behind auth — never
 * statically prerendered. Set here so it's inherited by the whole
 * subtree instead of repeated on every page.tsx.
 */
export const dynamic = "force-dynamic";

/**
 * Deliberately not the marketing chrome — plain, fast-to-use forms per
 * ADMIN.md's Interface section. Reuses the design tokens (Inter, lime,
 * --r-input) but none of the marketing components.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      <AdminSidebar />
      <main className="min-w-0 flex-1 px-8 py-8">
        <div className="mx-auto w-full max-w-[960px]">{children}</div>
      </main>
    </div>
  );
}
