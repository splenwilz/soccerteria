import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/dashboard/wallet(.*)',
    '/dashboard/profile(.*)',
    '/dashboard/summary(.*)',
    '/draw(.*)',
    '/wallet(.*)',
    '/orders(.*)',
    '/profile(.*)',
]);

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
});



export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 