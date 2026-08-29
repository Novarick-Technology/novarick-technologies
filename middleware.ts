import { NextResponse, type NextRequest } from "next/server";

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

const ROBOTS_HEADER = { "X-Robots-Tag": "noindex, nofollow" };

/**
 * ADMIN_PROTECTION=off routes are open — local dev only. "basic" is the
 * production default: HTTP Basic Auth against ADMIN_USER/ADMIN_PASSWORD.
 * No login page, no session table — the browser remembers the credentials
 * itself. See ADMIN.md's Access section for why this is deliberate.
 *
 * Every response out of this middleware — the pass-through, the 401, and
 * the 500 — carries X-Robots-Tag per ADMIN.md, not just the happy path.
 *
 * The separate "novarick-admin" Vercel project's root ("/") redirects to
 * /admin via a plain `redirect()` in app/page.tsx, not here — matching
 * the literal "/" path in this matcher hit an edge-runtime bundling bug
 * on Vercel ("ReferenceError: __dirname is not defined"), so that logic
 * was moved out of middleware entirely.
 */
export function middleware(request: NextRequest) {
  if (process.env.ADMIN_PROTECTION !== "basic") {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", ROBOTS_HEADER["X-Robots-Tag"]);
    return response;
  }

  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  if (!user || !password) {
    return new NextResponse("Admin auth is misconfigured.", {
      status: 500,
      headers: ROBOTS_HEADER,
    });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice(6));
    const separatorIndex = decoded.indexOf(":");
    const suppliedUser = decoded.slice(0, separatorIndex);
    const suppliedPassword = decoded.slice(separatorIndex + 1);
    if (suppliedUser === user && suppliedPassword === password) {
      const response = NextResponse.next();
      response.headers.set("X-Robots-Tag", ROBOTS_HEADER["X-Robots-Tag"]);
      return response;
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"', ...ROBOTS_HEADER },
  });
}
