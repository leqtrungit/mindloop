"use client";

import { Brain, Sparkles, Clock, Tag } from "lucide-react";

const features = [
  {
    name: "Quick Capture",
    description: "Record your thoughts in seconds, no lengthy writing required.",
    icon: Brain,
  },
  {
    name: "Smart Categorization",
    description: "Organize moments into 4 types: Learned, Applied, Reframed, Connected.",
    icon: Sparkles,
  },
  {
    name: "Time Tracking",
    description: "Automatically record time of day with the option to adjust as needed.",
    icon: Clock,
  },
  {
    name: "Flexible Tagging",
    description: "Add tags for easy searching and categorization of your moments.",
    icon: Tag,
  },
];

export default function Features() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-primary">
          Simple Yet Powerful
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to capture moments
        </p>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          MindLoop is designed to help you record moments of insight quickly and effectively.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
} 