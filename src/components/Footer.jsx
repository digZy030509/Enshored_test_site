import React, { useState } from "react";

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
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>

              {/* Instagram Button */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-[#E53935] rounded-full flex items-center justify-center text-white hover:bg-[#d32f2f] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 stroke-current fill-none stroke-[2]"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
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
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  Work
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
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
