"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"
import { Brain, Sparkles, Clock, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTranslations } from 'next-intl'

export default function LandingPage() {
  const router = useRouter()
  const t = useTranslations('landing')
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-[100dvh] flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="block">{t('hero.title').split(',')[0]},</span>
            <span className="block">{t('hero.title').split(',')[1]}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
            {t('hero.subtitle')}
          </p>
          <Button
            size="lg"
            onClick={() => router.push("/sign-up")}
            className="text-lg px-8"
          >
            {t('hero.cta')}
          </Button>
        </div>
      </motion.section>

      {/* Problem Statement */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-[100dvh] flex items-center justify-center py-16"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
          >
            {t('problem.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card p-6 rounded-lg border"
            >
              <h3 className="text-xl font-semibold mb-4">{t('problem.problem.title')}</h3>
              <p className="text-muted-foreground">
                {t('problem.problem.description')}
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card p-6 rounded-lg border"
            >
              <h3 className="text-xl font-semibold mb-4">{t('problem.solution.title')}</h3>
              <p className="text-muted-foreground">
                {t('problem.solution.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="min-h-[100dvh] py-16"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
          >
            {t('features.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-6 rounded-lg border"
            >
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">{t('features.quickCapture.title')}</h3>
              </div>
              <p className="text-muted-foreground">
                {t('features.quickCapture.description')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card p-6 rounded-lg border"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">{t('features.smartTags.title')}</h3>
              </div>
              <p className="text-muted-foreground">
                {t('features.smartTags.description')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-card p-6 rounded-lg border"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">{t('features.autoTimestamp.title')}</h3>
              </div>
              <p className="text-muted-foreground">
                {t('features.autoTimestamp.description')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-card p-6 rounded-lg border"
            >
              <div className="flex items-center gap-3 mb-4">
                <Gauge className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">{t('features.impactSlider.title')}</h3>
              </div>
              <p className="text-muted-foreground">
                {t('features.impactSlider.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <section className="min-h-[100dvh] flex items-center justify-center py-16 bg-gradient-to-t from-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => router.push("/sign-up")}
              className="text-lg px-8"
            >
              {t('cta.primary')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/sign-in")}
              className="text-lg px-8"
            >
              {t('cta.secondary')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 