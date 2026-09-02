import { LoginForm } from "./LoginForm";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-ink px-4 py-10">
      <LoginForm redirectTo={from} />
    </div>
  );
}
