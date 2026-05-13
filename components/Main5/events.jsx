"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const eventData = [
  { id: 1, title: "2025 DELIVERY RECORD", date: "20 JAN 2026", desc: "A historic peak in global demand.", img: "images/event1.webp", reverse: false },
  { id: 2, title: "1,000,000 KM DURABILITY", date: "21 JAN 2026", desc: "Tested across extreme road conditions.", img: "images/event2.webp", reverse: true },
  { id: 3, title: "BREAKING 350 KM/H", date: "22 JAN 2026", desc: "Aerodynamics and raw V12 power.", img: "images/event3.webp", reverse: false },
  { id: 4, title: "BOLD NEW VISUALS", date: "24 JAN 2026", desc: "Introducing Acid Green and Sunset Orange.", img: "images/event4.webp", reverse: true },
];

export default function Events() {
  const container = useRef();

  useGSAP(() => {
    // 1. GLOBAL SHIMMER
    gsap.to(".shimmer-text", {
      backgroundPosition: "-200% 0%",
      duration: 6,
      ease: "none",
      repeat: -1,
    });

    const rows = gsap.utils.toArray(".event-row");

    rows.forEach((row, index) => {
      const curtain = row.querySelector(".curtain");
      const content = row.querySelector(".content-box");
      const img = row.querySelector(".event-img");
      const isEven = index % 2 === 0;

      // INITIAL STATE (Clean start - no gsap.from)
      gsap.set(content, { opacity: 0, y: 40 });
      // Curtain is already at inset-0 via CSS

      // TRIGGER 1: ENTRANCE/EXIT FROM BOTTOM
      ScrollTrigger.create({
        trigger: row,
        start: "top 50%", // Adjusted to 80% so it feels more responsive than 50% 90%
        // markers:true,
        onEnter: () => {
          gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } })
            .to(curtain, { xPercent: isEven ? -105 : 105 })
            .to(content, { opacity: 1, y: 0 }, "-=1.2");
        },
        onLeaveBack: () => {
          gsap.timeline({ defaults: { ease: "expo.inOut", duration: 1 } })
            .to(content, { opacity: 0, y: 40 })
            .to(curtain, { xPercent: 0 }, "-=0.8");
        }
      });

      // TRIGGER 2: ENTRANCE/EXIT FROM TOP (The "Sandwich")
      ScrollTrigger.create({
        trigger: row,
        start: "bottom 50%",
        onEnter: () => {
          // Fade out as it leaves the top
          gsap.to(content, { opacity: 0, y: -40, duration: 1 });
          gsap.to(curtain, { xPercent: 0, duration: 1 });
        },
        onLeaveBack: () => {
          // Fade back in as it returns from the top
          gsap.to(content, { opacity: 1, y: 0, duration: 1 });
          gsap.to(curtain, { xPercent: isEven ? -105 : 105, duration: 1 });
        }
      });

      // 3. CONTINUOUS PARALLAX (Kept separate as it's a scrub)
      gsap.to(img, {
        yPercent: 15,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: row,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }, { scope: container });

  return (
    <section id="events" ref={container} className="bg-transparent">
      {eventData.map((event, index) => (
        <section key={event.id} className="main snapper event-row relative flex flex-col lg:flex-row w-full h-[100vh] overflow-hidden bg-white pt-[38px] max-xl:pt-[80px]">
          <div className={`flex flex-col lg:flex-row w-full h-full ${event.reverse ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Content Side */}
            <div className="content-box z-20 w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-24 relative bg-white">
              <span className="text-[#cf4b00] font-mono text-sm tracking-[0.4em] font-bold mb-4 uppercase">
                [{index + 1}] — {event.date}
              </span>

              <h3 
                className="shimmer-text text-4xl lg:text-[3rem] font-black italic uppercase leading-[0.85] tracking-tighter mb-8 text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(90deg, #000 0%, #cf4b00 25%, #000 50%, #cf4b00 75%, #000 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                {event.title}
              </h3>

              <div className="w-16 h-[2px] bg-[#cf4b00]/30 mb-8"></div>
              
              <p className="text-black/60 text-lg font-light leading-relaxed uppercase tracking-wider max-w-md">
                {event.desc}
              </p>
            </div>

            {/* Image Side with Curtain */}
            <div className="relative w-full lg:w-1/2 h-full overflow-hidden">
              <div className="curtain absolute inset-0 bg-white z-10"></div>
              <img 
                className="event-img w-full h-[120%] object-cover origin-center" 
                src={event.img} 
                alt={event.title} 
              />
            </div>
          </div>

          {/* Dynamic Anchor */}
          <div className="anchor absolute bottom-20 right-10 z-30 hidden lg:block">
            <div className="flex items-center gap-6 rotate-90 origin-right translate-y-[-50%] text-black">
              <span className="text-[#cf4b00] font-mono text-xs font-bold">04.{index+1}</span>
              <div className="w-12 h-[1px] bg-black/20"></div>
              <span className="text-[9px] font-mono tracking-[0.8em] uppercase whitespace-nowrap ">
                {event.tagline || "Event"}
              </span>
            </div>
          </div>
        </section>
      ))}
    </section>
  );
}