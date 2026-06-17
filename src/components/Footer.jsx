import React, { useState } from "react";
import FacebookIcon from "../assets/images/Facebook Icon.webp";
import InstagramIcon from "../assets/images/Instagram Icon.webp";

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState(null); // 'success' | 'error' | null

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (
      !newsletterEmail.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)
    ) {
      setSubscribeStatus("error");
      return;
    }

    // --- INTEGRATION PLACEHOLDER ---
    // You can hook this up to your EmailJS service or newsletter provider (e.g., Mailchimp)
    console.log(`Subscribed email: ${newsletterEmail}`);
    setNewsletterEmail("");
    setSubscribeStatus("success");
  };
  const navLinks = [
    {
      name: "About",
      link: "https://www.enshored.com/about/",
    },
    {
      name: "Services",
      link: "https://www.enshored.com/solutions/",
    },
    {
      name: "Work",
      link: "https://www.enshored.com/expertise/",
    },
    {
      name: "Careers",
      link: "https://www.enshored.com/careers/",
    },
  ];
  return (
    <footer className="bg-black text-white py-16 px-6 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          {/* Column 1: Branding & Description */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-4xl font-bold tracking-wider uppercase font-mono">
              ENSHORED
            </h2>

            {/* Social Icons Row */}
            <div className="flex gap-3">
              {/* Facebook Button */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-[#E53935] rounded-full flex items-center justify-center text-white hover:bg-[#d32f2f] transition-colors"
                aria-label="Facebook"
              >
                <img src={FacebookIcon} alt="Facebook" />
              </a>

              {/* Instagram Button */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-[#E53935] rounded-full flex items-center justify-center text-white hover:bg-[#d32f2f] transition-colors"
                aria-label="Instagram"
              >
                <img src={InstagramIcon} alt="Instagram" />
              </a>
            </div>

            {/* Description Paragraph */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs tracking-widest uppercase font-bold text-gray-400">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {navLinks.map((nav, index) => (
                <li key={index}>
                  <a
                    href={nav.link}
                    className="hover:text-white transition-colors"
                  >
                    {nav.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs tracking-widest uppercase font-bold text-gray-400">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a
                  href="#privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Form */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs tracking-widest uppercase font-bold text-gray-400">
              Newsletter
            </h4>

            <form onSubmit={handleSubscribe} className="space-y-3" noValidate>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (subscribeStatus) setSubscribeStatus(null);
                  }}
                  className={`w-full bg-[#0D0D0D] text-sm text-white placeholder-gray-500 p-3.5 rounded border outline-none transition-all ${
                    subscribeStatus === "error"
                      ? "border-red-500"
                      : "border-gray-800 focus:border-gray-600"
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#E53935] text-white py-3 px-6 rounded font-bold text-sm hover:bg-[#d32f2f] transition-all tracking-wide cursor-pointer"
              >
                Submit
              </button>

              {/* Mini Status Hints */}
              {subscribeStatus === "success" && (
                <p className="text-green-500 text-xs mt-1">
                  ✓ Successfully subscribed!
                </p>
              )}
              {subscribeStatus === "error" && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid email.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Divider & Copyright Meta Info */}
        <div className="border-t border-gray-900 pt-8 text-center">
          <p className="text-xs text-gray-500 tracking-wide">
            © 2026 Enshored. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
