import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser"; // Integrated EmailJS SDK
import ImgSection from "../assets/images/Sales & Installation.webp";
import SalesImg1 from "../assets/images/Sales & Installation - Icon 1.webp";
import SalesImg2 from "../assets/images/Sales & Installation - Icon 2.webp";
import SalesImg3 from "../assets/images/Sales & Installation - Icon 3.webp";
import SalesImg4 from "../assets/images/Sales & Installation - Icon 4.webp";

const SalesSection = () => {
  // 1. Pop-up Modal State Toggle
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Local Form Fields and Feedback Trackers
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Check if we are on mobile to toggle animation styles dynamically
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Animation Variant: Slide on Desktop, Pure Fade on Mobile
  const fadeOrSlideIn = {
    hidden: {
      opacity: 0,
      x: isMobile ? 0 : -30,
      y: 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMobile ? 0 : 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: isMobile ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Synchronize field change entries
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle Form Submission Validation and EmailJS Dispatch
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

    // Map local dynamic parameters to parameters configured in your dashboard template
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      message_details: formData.message || "No specific details provided.",
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

      // Automatically dismiss modal shortly after completion notice
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("EmailJS Error inside SalesSection Form:", error);
      setErrors({
        global: "Failed to dispatch request. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full overflow-hidden bg-[#FDF9EE]">
      <div className="px-6 py-12 sm:px-12 lg:px-24 lg:py-20 max-w-7xl mx-auto">
        <h3 className="text-sm sm:text-md font-semibold mb-4 lg:mb-6 text-gray-500 uppercase tracking-wider">
          Sales & Installation
        </h3>

        {/* Header Content Wrapper */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start lg:items-end justify-between">
          <motion.div
            className="w-full lg:w-3/5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeOrSlideIn}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight text-gray-900">
              <span className="text-white bg-[#FF2020] px-2 inline my-1 rounded-sm box-decoration-clone">
                Lorem ipsum dolor sit amet,
              </span>{" "}
              consectetur adipiscing elit
            </h1>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: isMobile ? 0 : 0.2 }}
          >
            <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#FF2020] transition-colors duration-300 cursor-pointer text-center focus:outline-none"
            >
              Learn More About Us →
            </button>
          </motion.div>
        </div>

        {/* Main feature showcase box */}
        <motion.div
          className="mt-12 bg-white rounded-2xl p-6 sm:p-12 shadow-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={ImgSection}
            alt="Sales and Installation Showcase"
            className="w-full h-auto object-cover rounded-xl"
          />
          <p className="text-xl font-bold mt-6 sm:mt-10 mb-3 text-gray-900">
            Lorem ipsum dolor sit amet
          </p>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>

        {/* Grid Matrix Cards Container */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={cardContainerVariants}
        >
          {/* Card 1 */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-start"
          >
            <img
              src={SalesImg1}
              alt=""
              className="w-16 h-16 sm:w-22 sm:h-22 object-cover rounded-xl"
            />
            <p className="text-gray-700 text-sm sm:text-base mt-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-start"
          >
            <img
              src={SalesImg2}
              alt=""
              className="w-16 h-16 sm:w-22 sm:h-22 object-cover rounded-xl"
            />
            <p className="text-gray-700 text-sm sm:text-base mt-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-start"
          >
            <img
              src={SalesImg3}
              alt=""
              className="w-16 h-16 sm:w-22 sm:h-22 object-cover rounded-xl"
            />
            <p className="text-gray-700 text-sm sm:text-base mt-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-start"
          >
            <img
              src={SalesImg4}
              alt=""
              className="w-16 h-16 sm:w-22 sm:h-22 object-cover rounded-xl"
            />
            <p className="text-gray-700 text-sm sm:text-base mt-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* POP-UP FORM MODAL COMPONENT LAYER */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Focus Card Content */}
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
              {/* Close Icon Toggle */}
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
                    Submission Successful!
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Thank you. Our experts will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-4"
                  noValidate
                >
                  {/* Dynamic layout container for asynchronous error tracking */}
                  {errors.global && (
                    <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
                      ✕ {errors.global}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="sales-modal-name"
                      className="block text-gray-700 text-sm font-medium mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="sales-modal-name"
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
                      htmlFor="sales-modal-email"
                      className="block text-gray-700 text-sm font-medium mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="sales-modal-email"
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
                      htmlFor="sales-modal-message"
                      className="block text-gray-700 text-sm font-medium mb-1.5"
                    >
                      Message (Optional)
                    </label>
                    <textarea
                      id="sales-modal-message"
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
                    {isSubmitting ? "Processing..." : "Submit Inquiry"}
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

export default SalesSection;
