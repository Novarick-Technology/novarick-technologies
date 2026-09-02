export const metadata = {
  robots: { index: false, follow: false },
};

/**
 * Shared by every /admin route, including /admin/login — the sidebar
 * itself lives one level down in (dashboard)/layout.tsx, since the login
 * page has no sidebar to show.
 */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
