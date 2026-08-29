import { AdminSidebar, AdminMobileNav } from "@/components/admin/AdminSidebar";

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
 * On brand (Logo, Button, the design tokens) but admin-shaped — sidebar,
 * dense tables, plain forms, none of which exist in the marketing design.
 * The sidebar itself only exists at lg+; below that it collapses to a
 * top bar with a horizontally-scrollable nav row (AdminMobileNav) instead
 * of a fixed 220px column eating most of a phone-width viewport.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white lg:flex-row">
      <AdminMobileNav />
      <AdminSidebar />
      <main className="min-w-0 flex-1 px-4 py-6 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-[960px]">{children}</div>
      </main>
    </div>
  );
}
