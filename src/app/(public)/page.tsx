import { LandingPage } from "@/components/LandingPage";

export default function Home() {
    const isAuthEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
    return <LandingPage isAuthEnabled={isAuthEnabled} />;
}
