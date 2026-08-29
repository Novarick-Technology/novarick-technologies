import { NextResponse, type NextRequest } from "next/server";

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*", "/"] };

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
 * ADMIN_ONLY_DEPLOYMENT=true is set on the separate "novarick-admin"
 * Vercel project (same repo, different project — see README) so that
 * deployment's root redirects straight to /admin instead of showing the
 * marketing homepage, giving the dashboard its own distinct URL without
 * forking the codebase.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/" && process.env.ADMIN_ONLY_DEPLOYMENT === "true") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

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
