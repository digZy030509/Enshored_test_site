import { useState, useEffect } from "react"; // Added useEffect import
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import aboutImg from "../assets/images/About Us.webp";

const AboutSection = () => {
  // 1. Pop-up Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Form Fields & Validation State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // CRITICAL FIX: Explicitly initialize EmailJS with your Public Key when the component mounts.
  // This registers the public credentials globally within the browser runtime environment.
  useEffect(() => {
    emailjs.init("CbN2DrkluPqVc_9iF");
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : -40 },
    visible: { opacity: 1, x: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: isMobile ? 0 : 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Form input change tracking
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Form verification and EmailJS submission logic
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const currentErrors = {};

    // Standard client side validation validation rules
    if (!formData.name.trim()) currentErrors.name = "Name is required";
    if (!formData.email.trim()) {
      currentErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      currentErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setIsSubmitting(true);

    // Map your form state fields to standard dynamic keys used in EmailJS templates
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      message_details: formData.message || "No message provided.",
    };

    try {
      await emailjs.send(
        "service_j8fez0s",
        "template_ott1fxw",
        templateParams,
        "CbN2DrkluPqVc_9iF",
      );

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Automatically close modal shortly after success feedback
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("EmailJS Form Error inside AboutSection:", error);
      setErrors({ global: "Something went wrong. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 py-12 sm:px-12 lg:px-24 lg:py-20 max-w-7xl mx-auto">
        {/* Image Column */}
        <motion.div
          className="w-full lg:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={imageVariants}
          transition={{ duration: 0.6 }}
        >
          <img
            src={aboutImg}
            alt="About Us"
            className="w-full h-full object-cover rounded-2xl shadow-sm object-top lg:h-full lg:max-h-none"
          />
        </motion.div>

        {/* Text & Content Column */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={textVariants}
          transition={{ duration: 0.5, delay: isMobile ? 0 : 0.15 }}
        >
          <h2 className="text-sm sm:text-lg font-bold mt-4 lg:mt-0 mb-3 text-gray-500 uppercase tracking-wider">
            About Us
          </h2>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 lg:mb-10 text-gray-900 leading-tight">
            Lorem ipsum dolor sit amet,{" "}
            <span className="text-[#FF2020]">
              Consecterur adipiscing elit, sed.
            </span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <p className="text-gray-600 text-sm sm:text-base mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Responsive Info Grid */}
          <div className="grid grid-cols-2 gap-0">
            <div className="border-l-2 border-t-2 border-r-2 border-b-2 lg:border-b-0 border-gray-500/20 p-4 sm:p-6">
              <h3 className="text-[#FF2020] font-bold text-3xl sm:text-4xl">
                100+
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Lorem ipsum dolor sit amet
              </p>
            </div>
            <div className="border-t-2 border-r-2 border-b-2 lg:border-b-0 border-gray-500/20 p-4 sm:p-6">
              <h3 className="text-[#FF2020] font-bold text-3xl sm:text-4xl">
                1000+
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Lorem ipsum dolor sit amet
              </p>
            </div>
            <div className="border-l-2 border-r-2 border-b-2 border-gray-500/20 p-4 sm:p-6">
              <h3 className="text-[#FF2020] font-bold text-3xl sm:text-4xl">
                100%
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Lorem ipsum dolor sit amet
              </p>
            </div>
            <div className="border-r-2 border-b-2 border-gray-500/20 p-4 sm:p-6">
              <h3 className="text-[#FF2020] font-bold text-3xl sm:text-4xl">
                14
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </div>

          {/* Trigger Button to open Modal */}
          <div className="mt-8 lg:mt-12">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#FF2020] transition-colors duration-300 cursor-pointer text-center focus:outline-none"
            >
              Learn More About Us →
            </button>
          </div>
        </motion.div>
      </div>

      {/* POP-UP FORM MODAL CONTAINER LAYER */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Dark Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box Content */}
            <motion.div
              initial={{
                opacity: 0,
                scale: isMobile ? 1 : 0.9,
                y: isMobile ? 20 : 0,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: isMobile ? 1 : 0.9,
                y: isMobile ? 20 : 0,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button Cross Symbol */}
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors p-1 cursor-pointer disabled:opacity-50"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Get In Touch
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Fill out the short form below and our team will get right back
                to you.
              </p>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Request Submitted!
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Thank you for reaching out. We will touch base shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-4"
                  noValidate
                >
                  {/* Global API Submission Errors */}
                  {errors.global && (
                    <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
                      ✕ {errors.global}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="modal-name"
                      className="block text-gray-700 text-sm font-medium mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-xl text-sm outline-none transition-all ${
                        errors.name
                          ? "border-red-500 bg-red-50/20"
                          : "border-gray-200 focus:border-gray-400"
                      } disabled:opacity-60`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="modal-email"
                      className="block text-gray-700 text-sm font-medium mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="modal-email"
                      name="email"
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-xl text-sm outline-none transition-all ${
                        errors.email
                          ? "border-red-500 bg-red-50/20"
                          : "border-gray-200 focus:border-gray-400"
                      } disabled:opacity-60`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="modal-message"
                      className="block text-gray-700 text-sm font-medium mb-1.5"
                    >
                      Message (Optional)
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      rows="3"
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-gray-400 resize-none transition-all disabled:opacity-60"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF2020] hover:bg-black text-white py-3 px-6 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
                  >
                    {isSubmitting ? "Processing..." : "Submit Request"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutSection;
