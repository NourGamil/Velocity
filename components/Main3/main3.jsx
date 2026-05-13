"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Main2 = () => {
  const container = useRef();
  const imageRef = useRef();
  const { contextSafe } = useGSAP({ scope: container });

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // 1. Reveal text from "the floor" (Mask effect)
    tl.from(imageRef.current, {
      scale: 1.3,
      xPercent: 10,
      filter: "blur(10px) grayscale(100%)",
      duration: 2,
      ease: "power2.out"
    }, 0); 



    gsap.to(imageRef.current, {
      xPercent: -5,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: container });

  const handleExploreClick = contextSafe(() => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: "#models",
      ease: "power4.inOut"
    });
  });

  return (
    <section 
      id="about"
      ref={container} 
      className="main relative snapper w-full h-[100vh] flex items-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-[1]"></div>
        <img 
          ref={imageRef}
          className="w-full h-full object-cover scale-110 max-lg:object-[80%]" 
          src="images/allcars1.webp" 
          alt="Luxury car collection" 
        />
      </div>

      {/* Content Area */}
      <div className="relative z-10 w-full lg:w-3/5 px-8 md:px-20 xl:px-32 flex flex-col gap-10">
        
        <header className="flex flex-col">
          {/* Mask Containers for the reveal effect */}
          <div className="overflow-hidden">
            <h2 className="fadeRightAll relative left-[-100px] opacity-0 text-5xl md:text-[4rem] xl:text-[6rem] font-black italic uppercase leading-[0.85] tracking-tighter text-white">
              More Than
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
            style={{
              backgroundImage: "linear-gradient(90deg, #000 0%, #cf4b00 25%, #000 50%, #cf4b00 75%, #000 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            className="shimmer-text fadeRightAll relative left-[-100px] opacity-0 text-5xl md:text-[4rem] xl:text-[6rem] font-black italic uppercase leading-[0.85] tracking-tighter text-transparent">
              a Car.
            </h2>
          </div>
          <div className="overflow-hidden mt-4">
            <h3 className="fadeRightAll relative left-[-100px] opacity-0 text-xl md:text-3xl font-light italic text-white/80 uppercase tracking-[0.2em]">
              It's Who You Are.
            </h3>
          </div>
        </header>

        <div className="flex flex-col gap-8 items-start">
          <div className="overflow-hidden">
            <p className="fadeRightAll relative left-[-100px] opacity-0 text-lg text-white/70 max-w-sm font-light leading-relaxed border-l border-[#cf4b00] pl-6">
              Curated cars for drivers who expect more. Engineering excellence meets personal identity.
            </p>
          </div>
          
          <div className="overflow-hidden">
            <div className="fadeRightAll relative left-[-100px] opacity-0">
                <button 
                  onClick={handleExploreClick}
                  className="group relative flex items-center justify-center w-[280px] h-[70px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-[#cf4b00] cursor-pointer rounded-xl"
                >
                  {/* Hover Fill Effect */}
                  <div className="absolute inset-0 bg-[#cf4b00] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
                  
                  <span className="relative z-10 flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase text-white">
                    Collection
                    <img src="images/arrow-right.svg" className="w-4 group-hover:translate-x-2 transition-transform invert" alt="" />
                  </span>
                </button>
            </div>
          </div>

          <div className="overflow-hidden">
             <p className="fadeRightAll relative left-[-100px] opacity-0 text-[9px] tracking-[0.6em] text-white/60 uppercase">
              Luxury • Performance • Confidence
            </p>
          </div>
        </div>
      </div>

      {/* Aesthetic Vertical Line Detail */}
      <div className="absolute left-10 top-0 w-[1px] h-32 bg-gradient-to-b from-[#cf4b00] to-transparent hidden lg:block"></div>
      
      {/* Dynamic Counter Detail */}
      <div className="absolute bottom-10 right-10 z-10 hidden lg:block">
        <div className="flex items-center gap-4 rotate-90 origin-right">
          <span className="text-[#cf4b00] font-mono text-xs">02</span>
          <div className="w-12 h-[1px] bg-white/40"></div>
          <span className="text-[8px] font-mono tracking-[1em] text-white/80 uppercase">
            PURE DRIVE
          </span>
        </div>
      </div>
    </section>
  );
};

export default Main2;