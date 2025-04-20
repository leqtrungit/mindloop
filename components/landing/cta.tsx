"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Start Your Journey of Insight
      </h2>
      <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
        MindLoop helps you capture moments of insight in a simple and effective way. 
        No need for lengthy writing, just record your important thoughts before they slip away.
      </p>
      <div className="mt-10 flex items-center gap-x-6">
        <Button
          size="lg"
          onClick={() => router.push("/sign-up")}
        >
          Create Free Account
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push("/sign-in")}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
} 