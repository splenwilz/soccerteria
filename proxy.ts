import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/dashboard/admin(.*)',
    '/dashboard/wallet(.*)',
    '/dashboard/profile(.*)',
    '/dashboard/summary(.*)',
    '/dashboard/upcoming(.*)',
    '/draw(.*)',
    '/wallet(.*)',
    '/orders(.*)',
    '/profile(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();
});



export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 