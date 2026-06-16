import { timelineData } from "../components/data/timelineData";
import TimelineItem from "./TimelineItem";

export default function Timeline() {
  return (
    // Scaled the vertical section padding down on mobile viewports (py-12 -> md:py-24)
    <section id="process" className="bg-black text-white py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Container */}
        {/* Adjusted the bottom margin on mobile so the gap to the first item isn't massive */}
        <div className="text-center mb-12 md:text-center md:mb-20">
          <span className="border border-white/20 rounded-full px-4 py-2 text-xs uppercase tracking-widest inline-block">
            Our Process
          </span>

          {/* Text scaling from 3xl on small mobile up to 6xl on desktop */}
          <h2 className="mt-6 text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
            As <span className="text-red-500">easy</span> as 1, 2, 3.
          </h2>

          <p className="mt-4 text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            From data to implementation — every step is guided, personalised,
            and optimised.
          </p>
        </div>

        {/* Timeline Wrapper Grid */}
        <div className="relative">
          {/* VERTICAL LINE FIX:
            Changed 'absolute' to 'hidden md:block absolute'. 
            This hides the white vertical track entirely on mobile layout structures 
            and only reveals it on medium desktops and up where the items alternate sides.
          */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/20 -translate-x-1/2" />

          {timelineData.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
