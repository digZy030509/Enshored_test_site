import { useState, useEffect, useRef } from "react"; // Added useRef
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import aboutImg from "../assets/images/About Us.webp";

const AboutSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef(); // Create the DOM reference pointer

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    emailjs.init("CbN2DrkluPqVc_9iF");
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const imageVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : -40 },
    visible: { opacity: 1, x: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: isMobile ? 0 : 30 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const currentErrors = {};

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

    try {
      // FIX: Changed from .send() to .sendForm() and passed formRef.current
      await emailjs.sendForm(
        "service_j8fez0s",
        "template_ott1fxw",
        formRef.current, // Direct element reference avoids live URL routing errors
        "CbN2DrkluPqVc_9iF",
      );

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("EmailJS Production System Error:", error);
      setErrors({ global: "Deployment configuration fault. Try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 py-12 sm:px-12 lg:px-24 lg:py-20 max-w-7xl mx-auto">
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
            className="w-full h-full object-cover rounded-2xl shadow-sm object-top"
          />
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={textVariants}
          transition={{ duration: 0.5, delay: isMobile ? 0 : 0.15 }}
        >
          <h2 className="text-sm sm:text-lg font-bold mb-3 text-gray-500 uppercase tracking-wider">
            About Us
          </h2>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Lorem ipsum dolor sit amet
          </h1>

          <div className="mt-8 lg:mt-12">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#FF2020] transition-colors cursor-pointer"
            >
              Learn More About Us →
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

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
              className="bg-white w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Get In Touch
              </h3>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Request Submitted!
                  </h4>
                </div>
              ) : (
                /* ADDED formRef pointer hook here */
                <form
                  ref={formRef}
                  onSubmit={handleFormSubmit}
                  className="space-y-4"
                  noValidate
                >
                  {errors.global && (
                    <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
                      ✕ {errors.global}
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows="3"
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF2020] hover:bg-black text-white py-3 px-6 rounded-xl font-bold transition-all cursor-pointer"
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
