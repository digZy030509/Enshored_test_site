import { useState } from "react";
import { Menu, X } from "lucide-react";
import emailjs from "@emailjs/browser"; // 1. Import EmailJS
import Button from "./Button";
import Container from "./Container";
import logo from "../assets/images/Enshored Logo.webp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. Updated Form Submit Handler with EmailJS
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Dynamic key mapping based on what your EmailJS Template expects
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      message: formData.message,
    };

    try {
      // Send the email using your credentials
      await emailjs.send(
        "service_j8fez0s", // Replace with your EmailJS Service ID
        "template_ott1fxw", // Replace with your EmailJS Template ID
        templateParams,
        "CbN2DrkluPqVc_9iF", // Replace with your EmailJS Public Key
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Clear input data

      // Close the modal smoothly after a success message
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMobileQuoteClick = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  };

  const navLinks = [
    { name: "About", link: "https://www.enshored.com/about/" },
    { name: "Services", link: "https://www.enshored.com/solutions/" },
    { name: "Work", link: "https://www.enshored.com/expertise/" },
    { name: "Careers", link: "https://www.enshored.com/careers/" },
  ];

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 border-b border-gray-500/20">
        <Container>
          <nav className="h-24 flex items-center justify-between">
            {/* Logo */}
            <img
              src={logo}
              alt="Enshored Logo"
              className="h-10 z-50 relative"
            />

            {/* Desktop Navigation */}
            <ul className="hidden md:flex list-none gap-8 text-white font-medium">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  className="hover:text-[#FF2020] cursor-pointer transition-colors"
                >
                  <a href={link.link} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop Button Trigger */}
            <div
              className="hidden md:block"
              onClick={() => setIsModalOpen(true)}
            >
              <Button>Get A Quote</Button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white focus:outline-none z-50 relative p-2"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Overlay Menu Drawer */}
            <div
              className={`fixed inset-0 bg-black/95 transition-transform duration-300 ease-in-out z-40 md:hidden ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-32 pb-16">
                <ul className="flex flex-col items-end gap-6 text-white text-xl font-semibold tracking-wide pr-2">
                  {navLinks.map((link) => (
                    <li
                      key={link.name}
                      className="hover:text-[#FF2020] cursor-pointer transition-colors active:text-[#FF2020]"
                      onClick={() => setIsOpen(false)}
                    >
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                  <div
                    className="flex justify-end pr-2 mt-4"
                    onClick={handleMobileQuoteClick}
                  >
                    <Button>Get A Quote</Button>
                  </div>
                </ul>
              </div>
            </div>
          </nav>
        </Container>
      </header>

      {/* --- SHARED RESPONSIVE POP-UP MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl z-10 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close form"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Request a Quote
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Fill out the form below and our team will get back to you shortly.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="nav-modal-name"
                  className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="nav-modal-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF2020] focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="nav-modal-email"
                  className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="nav-modal-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="johndoe@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF2020] focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Message Context */}
              <div>
                <label
                  htmlFor="nav-modal-message"
                  className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
                >
                  Message / Details
                </label>
                <textarea
                  id="nav-modal-message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project requirements..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF2020] focus:bg-white transition-all text-sm resize-none"
                />
              </div>

              {/* Submission Status Alerters */}
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

              {/* Submit Wrapper Button */}
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
    </>
  );
};

export default Navbar;
