import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SalesSection from "../components/SalesSection";
import Timeline from "../components/Timeline";
import Testimonial from "../components/Testimonial";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { useState } from "react";

import BackToTop from "../components/BacktoTop";

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="relative w-full overflow-x-hidden bg-black min-h-screen">
      <Navbar onOpenQuote={openModal} />
      <HeroSection isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <AboutSection />
      <SalesSection />
      <Timeline />
      <Testimonial />
      <ContactSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Homepage;
