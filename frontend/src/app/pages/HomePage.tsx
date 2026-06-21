import { useState } from "react";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { CategoriesSection } from "../components/CategoriesSection";
import { LeadCaptureForm } from "../components/LeadCaptureForm";
import { Footer } from "../components/Footer";

export function HomePage() {
  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <HeroSection onGetStarted={scrollToForm} />
      <FeaturesSection />
      <CategoriesSection />
      <LeadCaptureForm />
    </div>
  );
}
