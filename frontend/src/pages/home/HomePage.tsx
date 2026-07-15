import { useState } from "react";
import { Header } from "../../components/common/Header";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { CategoriesSection } from "./CategoriesSection";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { Footer } from "../../components/common/Footer";
import { ScrollToHash } from "./ScrollToHash";
import { useEffect } from "react";



export function HomePage() {
  useEffect(() => {
    console.log("mounted");

    return () => console.log("unmounted");
  }, []);
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <ScrollToHash/>  
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <LeadCaptureForm />
    </div>
  );
}
