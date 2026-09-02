"use client";

import { useActionState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { status: "idle" };

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: "text" | "password";
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={name} className="font-body text-[14px] text-text-on-dark">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={type === "password" ? "current-password" : "username"}
        className="w-full rounded-input border border-white/10 bg-ink-deep px-4 py-[14px] font-body text-[14px] text-white placeholder:text-text-dim focus:outline-none focus:ring-1 focus:ring-lime"
      />
    </div>
  );
}

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <Card tone="dark" radius="panel" className="flex w-full max-w-[380px] flex-col items-center gap-8 p-8">
      <Logo tone="white" className="h-[22px] w-auto" />

      <div className="flex w-full flex-col items-center gap-1 text-center">
        <p className="font-heading text-[24px] font-medium tracking-[-0.05em] text-white">Admin sign in</p>
        <p className="font-body text-[14px] text-text-dim">Novarick Technologies internal dashboard</p>
      </div>

      <form action={formAction} className="flex w-full flex-col gap-5">
        <input type="hidden" name="redirectTo" value={redirectTo ?? "/admin"} />
        <Field label="Username" name="username" type="text" />
        <Field label="Password" name="password" type="password" />

        {state.status === "error" && state.message && (
          <p role="alert" className="font-body text-[14px] text-red-400">
            {state.message}
          </p>
        )}

        <Button type="submit" variant="primary" className="w-full uppercase" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </Card>
  );
}
