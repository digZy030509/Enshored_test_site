import { useState } from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  // Safe layout view width check to completely eliminate horizontal scrolling bugs on mobile devices
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // 1. Form Field States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  // 2. Validation & Submission States
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Handle live input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as soon as the user typing fixes it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Basic Validation Logic
  const validateForm = () => {
    const currentErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) currentErrors.name = "Name is required";
    if (!formData.mobile.trim())
      currentErrors.mobile = "Mobile number is required";

    if (!formData.email.trim()) {
      currentErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      currentErrors.email = "Please enter a valid email address";
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  // Form Submission Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulating a network request delay (1.2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Reset form fields upon successful delivery simulation
      setFormData({ name: "", email: "", mobile: "" });
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Safe Responsive Variants: Side slide-up on desktop, pure clean opacity transition on mobile
  const leftContentVariants = {
    hidden: { opacity: 0, y: isMobile ? 0 : 30 },
    visible: { opacity: 1, y: 0 },
  };

  const rightFormVariants = {
    hidden: { opacity: 0, y: isMobile ? 0 : 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    /* FIX: Wrapped with strict overflow isolation properties ('w-full overflow-hidden')
      to neutralize layout blowouts and keep your application layout pixel-perfect on small screens.
    */
    <section className="w-full overflow-hidden bg-[#F5F5F5] py-24 px-6 md:px-16 font-sans min-h-[650px] flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
        {/* Left Side Content Column */}
        <motion.div
          className="lg:col-span-6 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={leftContentVariants}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-gray-500 uppercase tracking-widest text-xs font-bold">
            Contact Us
          </h4>
          <h2 className="text-5xl md:text-6xl font-bold text-black leading-[1.1] tracking-tight">
            Lorem ipsum dolor sit amet.
          </h2>
          <div className="space-y-6 text-gray-500 leading-relaxed text-sm max-w-xl">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </motion.div>

        {/* Right Side Form Card Column */}
        <motion.div
          className="lg:col-span-6 bg-white p-8 md:p-10 rounded-xl border border-gray-200/50 shadow-sm max-w-xl w-full lg:justify-self-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={rightFormVariants}
          transition={{ duration: 0.6, delay: isMobile ? 0 : 0.15 }}
        >
          <h3 className="text-[#E53935] text-5xl font-bold mb-8 tracking-tight">
            Get in touch.
          </h3>

          <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
            {/* Field: Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-800 font-normal mb-2 text-sm"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg outline-none transition-all text-sm ${
                  errors.name
                    ? "border-red-500 bg-red-50/10"
                    : "border-gray-200 focus:border-gray-400"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Field: Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-800 font-normal mb-2 text-sm"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg outline-none transition-all text-sm ${
                  errors.email
                    ? "border-red-500 bg-red-50/10"
                    : "border-gray-200 focus:border-gray-400"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Field: Mobile */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-gray-800 font-normal mb-2 text-sm"
              >
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg outline-none transition-all text-sm ${
                  errors.mobile
                    ? "border-red-500 bg-red-50/10"
                    : "border-gray-200 focus:border-gray-400"
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* Action Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#E53935] text-white py-3.5 px-6 rounded-lg font-bold text-base hover:bg-[#d32f2f] transition-all focus:ring-4 focus:ring-red-100 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-4"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>

            {/* In-Form Status Feedback Alerts */}
            {submitStatus === "success" && (
              <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs text-center font-medium transition-all">
                ✓ Message sent! Check your inbox for a confirmation email.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs text-center font-medium transition-all">
                ✕ Submission failed. Please verify your fields and retry.
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
