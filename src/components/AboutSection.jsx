import { useState, useEffect, useRef } from "react"; // Added useRef
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";
import HeroImg from "../assets/images/Hero BG.webp";
import Button from "./Button";
import Women from "../assets/images/women.png";
import Accredited from "../assets/images/business.png";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef(); // Create the DOM reference pointer

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    emailjs.init("CbN2DrkluPqVc_9iF");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // FIX: Changed from .send() to .sendForm() and passed formRef.current
      await emailjs.sendForm(
        "service_j8fez0s",
        "template_ott1fxw",
        formRef.current, // Targets the absolute DOM element safely
        "CbN2DrkluPqVc_9iF",
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error("EmailJS Form Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <img
        src={HeroImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-24 mt-[150px] ">
        <div className="max-w-5xl text-center px-6 mx-auto">
          <h1 className="text-white font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
            Lorem ipsum
          </h1>
          <h2 className="text-[#FF2020] font-bold leading-tight mt-2 sm:mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
            dolor sit amet
          </h2>
          <p className="mt-6 sm:mt-8 text-white/90 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <div
            className="mt-8 sm:mt-10 inline-block"
            onClick={() => setIsModalOpen(true)}
          >
            <Button>Get A Quote</Button>
          </div>

          <div className="flex flex-wrap items-center justify-center mt-10 gap-4 sm:gap-6">
            <img
              src={Accredited}
              alt="Accredited"
              className="h-10 sm:h-14 w-auto object-contain rounded-xl sm:rounded-2xl"
            />
            <img
              src={Women}
              alt="Women"
              className="h-10 sm:h-14 w-auto object-contain rounded-xl sm:rounded-2xl"
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl z-10 border border-gray-100">
            <button
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Request a Quote
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Fill out the form below and our team will get back to you shortly.
            </p>

            {/* ADDED formRef pointer hook here */}
            <form
              ref={formRef}
              onSubmit={handleFormSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="johndoe@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Message / Details
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Project details..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none"
                />
              </div>

              {submitStatus === "success" && (
                <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl">
                  ✓ Form submitted successfully!
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
                  ✕ Production Connection Failed. Try again.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className="w-full bg-[#FF2020] hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl text-sm cursor-pointer disabled:bg-gray-400"
              >
                {isSubmitting ? "Sending Request..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
