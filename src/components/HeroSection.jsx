import { useState } from "react";
import { X } from "lucide-react"; // Install via 'npm i lucide-react' if you haven't already
import HeroImg from "../assets/images/Hero BG.webp";
import Button from "./Button";
import Women from "../assets/images/women.png";
import Accredited from "../assets/images/business.png";

const HeroSection = () => {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Inputs State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Submission Status States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API Endpoint Post Action (Replace with your actual endpoint URL)
      // await axios.post('/api/contact', formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Reset inputs

      // Auto-close modal shortly after success feedback
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={HeroImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main Content Wrapper */}
      <div className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-24 mt-[150px] ">
        <div className="max-w-5xl text-center px-6 mx-auto">
          <h1 className="text-white font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
            Lorem ipsum
          </h1>

          <h2 className="text-[#FF2020] font-bold leading-tight mt-2 sm:mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
            dolor sit amet
          </h2>

          <p className="mt-6 sm:mt-8 text-white/90 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Trigger Button Container */}
          <div
            className="mt-8 sm:mt-10 inline-block"
            onClick={() => setIsModalOpen(true)}
          >
            <Button>Get A Quote</Button>
          </div>

          {/* Trust Badges */}
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

      {/* --- POP-UP MODAL FORM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Dark Backdrop Shadow Layer */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Form Modal Box Wrapper */}
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl z-10 transform transition-all border border-gray-100">
            {/* Close Button Icon */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close form"
            >
              <X size={24} />
            </button>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Request a Quote
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Fill out the form below and our team will get back to you shortly.
            </p>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="modal-name"
                  className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="modal-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF2020] focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="modal-email"
                  className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="modal-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="johndoe@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF2020] focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Message Text Area */}
              <div>
                <label
                  htmlFor="modal-message"
                  className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
                >
                  Message / Details
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project requirements..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF2020] focus:bg-white transition-all text-sm resize-none"
                />
              </div>

              {/* Status Notifications */}
              {submitStatus === "success" && (
                <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl">
                  ✓ Form submitted successfully!
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
                  ✕ Something went wrong. Please try again.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className="w-full bg-[#FF2020] hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300 shadow-md cursor-pointer text-sm mt-2"
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
