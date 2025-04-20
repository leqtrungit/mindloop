"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Capture Your Moments of Insight
      </h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
        MindLoop helps you record thoughts, learnings, and reflections in a snap. 
        Not a lengthy note app, not a knowledge management tool. 
        Simply capture your thoughts before they slip away.
      </p>
      <div className="mt-10 flex items-center gap-x-6">
        <Button
          size="lg"
          onClick={() => router.push("/sign-in")}
        >
          Get Started
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push("/about")}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
} 