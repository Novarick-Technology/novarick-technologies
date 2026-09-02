import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/adminSession";

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

const ROBOTS_HEADER = { "X-Robots-Tag": "noindex, nofollow" };

function withRobotsHeader(response: NextResponse) {
  response.headers.set("X-Robots-Tag", ROBOTS_HEADER["X-Robots-Tag"]);
  return response;
}

/**
 * ADMIN_PROTECTION=off routes are open — local dev only. "session" is the
 * production default: a signed, stateless cookie set by /admin/login (see
 * lib/adminSession.ts and app/admin/login/actions.ts) rather than HTTP
 * Basic Auth. No sessions table — the cookie itself carries the expiry
 * and an HMAC signature, verified here on every request.
 *
 * Every response out of this middleware — the pass-through, the redirect,
 * and the 500 — carries X-Robots-Tag per ADMIN.md, not just the happy path.
 *
 * The separate "novarick-admin" Vercel project's root ("/") redirects to
 * /admin via a plain `redirect()` in app/page.tsx, not here — matching
 * the literal "/" path in this matcher hit an edge-runtime bundling bug
 * on Vercel ("ReferenceError: __dirname is not defined"), so that logic
 * was moved out of middleware entirely.
 */
export async function middleware(request: NextRequest) {
  if (process.env.ADMIN_PROTECTION !== "session") {
    return withRobotsHeader(NextResponse.next());
  }

  // /admin/login itself must stay reachable while signed out.
  if (request.nextUrl.pathname === "/admin/login") {
    return withRobotsHeader(NextResponse.next());
  }

  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    return withRobotsHeader(
      new NextResponse("Admin auth is misconfigured.", { status: 500 }),
    );
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token, secret);
  if (valid) {
    return withRobotsHeader(NextResponse.next());
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return withRobotsHeader(NextResponse.redirect(loginUrl));
}
