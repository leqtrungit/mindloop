"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            No distractions. No clutter.
            <br />
            Just thinking, made simple.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Start your journey to better thinking today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/auth/signup"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Get started
            </Link>
            <Link
              href="/auth/login"
              className="text-sm font-semibold leading-6 text-foreground"
            >
              Sign in <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTA; 