import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { testimonials } from "./data/testimonial";

// Import Swiper core styles
import "swiper/css";

const TestimonialSlider = () => {
  // Safe layout detection for mobile viewport boundaries
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Responsive Animation Rules: Slide-up on desktop, pure clean fade on mobile
  const headingVariants = {
    hidden: { opacity: 0, y: isMobile ? 0 : -20 },
    visible: { opacity: 1, y: 0 },
  };

  const sliderVariants = {
    hidden: { opacity: 0, y: isMobile ? 0 : 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    /* FIX: Outer wrapping <section> with strict layout constraints.
      This lets your swiper slides bleed seamlessly via '!overflow-visible' 
      on desktop, while locking horizontal overflow out on touch screens.
    */
    <section className="w-full overflow-hidden bg-[#FAF9F0] py-16 px-6 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto relative">
        {/* Animated Header Section */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headingVariants}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h4 className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-2">
              Testimonials
            </h4>
            <h2 className="text-4xl sm:text-5xl font-bold text-black">
              What they’re <span className="text-[#E53935]">saying</span>
            </h2>
          </div>

          {/* Custom Navigation Buttons */}
          <div className="flex gap-2 z-10 self-end sm:self-auto">
            <button className="swiper-nav-prev bg-black text-white p-2 rounded hover:bg-[#E53935] transition-colors cursor-pointer disabled:opacity-40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button className="swiper-nav-next bg-black text-white p-2 rounded hover:bg-[#E53935] transition-colors cursor-pointer disabled:opacity-40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Animated Swiper Component Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sliderVariants}
          transition={{ duration: 0.6, delay: isMobile ? 0 : 0.1 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-nav-next",
              prevEl: ".swiper-nav-prev",
            }}
            pagination={{
              el: ".swiper-custom-pagination",
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} inline-block w-2.5 h-2.5 rounded-full mx-1 cursor-pointer transition-all duration-300"></span>`;
              },
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!overflow-visible"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="h-auto flex">
                <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm flex flex-col justify-between w-full min-h-[320px]">
                  <div>
                    {/* Star Matrix Icons */}
                    <div className="flex text-[#FFC107] mb-5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base">
                      {item.text}
                    </p>
                  </div>

                  {/* Profile Metadata card element */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="font-bold text-black text-base sm:text-lg leading-tight">
                        {item.name}
                      </h5>
                      <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Theme Styled Custom Pagination Layout Block */}
        <div className="flex justify-center mt-12">
          <div className="swiper-custom-pagination flex gap-1 items-center" />
        </div>
      </div>

      {/* Style Layer Rules */}
      <style>{`
        .swiper-custom-pagination .swiper-pagination-bullet {
          background-color: #FFCDD2 !important;
          opacity: 1;
        }
        .swiper-custom-pagination .swiper-pagination-bullet-active {
          background-color: #E53935 !important;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default TestimonialSlider;
