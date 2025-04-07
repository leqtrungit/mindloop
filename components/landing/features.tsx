"use client";

import { Brain, Lightbulb, Network } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    name: "Capture Easily",
    description: "Write down thoughts, ideas, or what you just learned in seconds using smart, guided forms.",
    icon: Lightbulb,
  },
  {
    name: "Reflect & Evolve",
    description: "Revisit your ideas. Track how your thinking changes over time — with built-in reflection flows.",
    icon: Brain,
  },
  {
    name: "Grow Your Knowledge",
    description: "Connect notes to concepts. See your thinking evolve across domains. It's more than a notebook — it's your idea map.",
    icon: Network,
  },
];

const Features = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-2xl lg:text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-base font-semibold leading-7 text-primary">Why Thinkly?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for creators, makers, and curious minds
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Thinkly isn't just about storing notes. It's about building clarity — one idea at a time.
          </p>
        </motion.div>
        <motion.div 
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name} 
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
};

export default Features; 