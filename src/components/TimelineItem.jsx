import { motion } from "framer-motion";

export default function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const Content = (
    <div className={`text-center ${isLeft ? "md:text-right" : "md:text-left"}`}>
      <span className="block text-xs font-semibold tracking-wider uppercase text-white">
        {item.step}
      </span>
      <h3 className="mt-2 text-2xl md:text-4xl font-bold text-[#FF2020]">
        {item.title}
      </h3>
      <p
        className={`mt-4 max-w-md mx-auto leading-8 text-gray-400 ${isLeft ? "md:ml-auto md:mr-0" : "md:mr-auto md:ml-0"}`}
      >
        {item.description}
      </p>
    </div>
  );

  const Image = (
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-[240px] md:h-[320px] object-cover rounded-3xl shadow-md"
    />
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_60px_1fr] gap-6 md:gap-12 items-center mb-16 md:mb-32">
      {/* LEFT COLUMN CONTENT */}
      <motion.div
        className={`w-full ${isLeft ? "order-1 md:order-none" : "order-2 md:order-none"}`}
        initial={{
          opacity: 0,
          // FIX: If mobile, keep position locked at 0. No slide translation.
          x: isMobile ? 0 : isLeft ? -100 : 100,
          y: 0,
        }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        {isLeft ? Content : Image}
      </motion.div>

      {/* CENTRAL DOT */}
      <motion.div
        className="hidden md:flex justify-center md:order-none"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-4 h-4 rounded-full bg-[#FF2020] z-10" />
      </motion.div>

      {/* RIGHT COLUMN CONTENT */}
      <motion.div
        className={`w-full ${isLeft ? "order-2 md:order-none" : "order-1 md:order-none"}`}
        initial={{
          opacity: 0,
          // FIX: If mobile, keep position locked at 0. No slide translation.
          x: isMobile ? 0 : isLeft ? 100 : -100,
          y: 0,
        }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        {isLeft ? Image : Content}
      </motion.div>
    </div>
  );
}
