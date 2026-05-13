"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef } from "react";

gsap.registerPlugin(ScrollToPlugin);

const Intro = () => {
  const container = useRef();

  const handleDiscover = () => {
    gsap.to(window, {
      scrollTo: "#gallery",
      duration: 1.5,
      ease: "power4.inOut"
    });
  };
  useGSAP(()=>{

  },[])
  return (
    <section 
      ref={container} 
      id="Home"
      className="main relative snapper w-[full] h-[100vh] flex flex-col max-lg:justify-center justify-end lg:pb-[10vh] lg:pb-[0vh]  text-white overflow-hidden "
    >

      {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" /> */}
      

      <div className="hero-line absolute left-0 bottom-[15%] w-full h-[1px] bg-white/10 z-0" />

      <div className="relative z-20 px-6 lg:px-20 pb-26 lg:pb-24 w-full">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="overflow-hidden">
            <div className="fadeRight relative left-[-100px] opacity-0 intro-details flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#cf4b00]"></span>
              <p className="text-[0.7rem] md:text-[0.9rem] uppercase tracking-[0.5em] font-light text-white/60">
                Est. 1963 — Global Legacy
              </p>
            </div>
          </div>

          <div className="overflow-hidden">
            <h1 className="fadeRight relative left-[-100px] opacity-0 flex flex-col mb-10 ">
              <span className="overflow-hidden block">
                <span className="block text-[3.5rem] md:text-[6.5rem] font-black leading-[0.9] tracking-tighter italic">
                  DRIVEN <span className="text-[#cf4b00]">BY</span>
                </span>
              </span>
              <span className="overflow-hidden block">
                <span 
                style={{
                  backgroundImage: "linear-gradient(90deg, #000 0%, #cf4b00 25%, #000 50%, #cf4b00 75%, #000 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
                className="shimmer-text block text-[3.5rem] md:text-[6.5rem] font-black leading-[0.9] tracking-tighter uppercase text-transparent">
                  DREAMS
                </span>
              </span>
            </h1>
          </div>


          <div className="intro-details flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="overflow-hidden">
              <div className="fadeRight relative left-[-100px] opacity-0">
                <p className="max-w-md text-white/80 text-sm md:text-base leading-relaxed font-light">
                  We don’t just build machines; we engineer the future of movement. 
                  Experience the convergence of heritage and hyperspace.
                </p>
              </div>    
            </div>

            <div className="overflow-hidden">
              <div className="fadeLeft relative left-[100px] opacity-0">
                <button 
                  onClick={handleDiscover}
                  className="group relative flex items-center justify-center w-[280px] h-[70px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-[#cf4b00] cursor-pointer rounded-xl"
                >
                  {/* Hover Fill Effect */}
                  <div className="absolute inset-0 bg-[#cf4b00] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
                  
                  <span className="relative z-10 flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase group-hover:text-white">
                    SHOWCASE
                    <img src="images/arrow-right.svg" className="w-4 group-hover:translate-x-2 transition-transform invert" alt="" />
                  </span>
                </button>
              </div>    
            </div>

          </div>

        </div>
      </div>

      <div className="absolute bottom-10 right-10 z-10 hidden lg:block ">
        <div className="flex items-center gap-4 rotate-90 origin-right translate-y-[-50%]">
          <span className="text-[#cf4b00] font-mono text-xs">00</span>
          <div className="w-12 h-[1px] bg-white/20"></div>
          <span className="text-[8px] font-mono tracking-[1em] text-white/80 uppercase">
            START ENGINE
          </span>
        </div>
      </div>

      <style jsx>{`
        .border-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        .ease-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
      `}</style>
    </section>
  );
};

export default Intro;