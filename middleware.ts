import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Webhook 엔드포인트는 인증 없이 접근 가능해야 함
  ignoredRoutes: ["/api/webhooks/clerk"],
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
