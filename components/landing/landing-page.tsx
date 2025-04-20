"use client"

import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import CTA from "@/components/landing/cta"

export default function LandingPage() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-auto">
      <section className="h-screen snap-start">
        <Hero />
      </section>
      <section className="h-screen snap-start">
        <Features />
      </section>
      <section className="h-screen snap-start">
        <CTA />
      </section>
    </div>
  )
} 