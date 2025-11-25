"use client";

import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import LatestWords from "../components/home/LatestWords";
import HowItWorks from "../components/home/HowItWorks";
import StatisticsSection from "../components/home/StatisticsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTASection from "../components/home/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeroSection />
      <FeaturesSection />
      <LatestWords />
      <HowItWorks />
      <StatisticsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
