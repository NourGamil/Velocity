"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useRef } from 'react';
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const ModelInfo = () => {
  const container = useRef();
  const [activeTab, setActiveTab] = useState(0);

  const carData = [
    {
      anchor: "urus",
      id: "SUV",
      title: "URUS STRENGTH",
      img: "images/urus0.webp",
      specs: ["4.0L V8", "650 HP", "305 KM/H"]
    },
    {
      anchor: "revuelto",
      id: "SUPERCAR",
      title: "REVUELTO HYBRID",
      img: "images/rev0.webp",
      specs: ["6.5L V12", "1015 CV", "350 KM/H"]
    },
    {
      anchor: "bmw",
      id: "SEDAN",
      title: "M4 EXECUTIVE",
      img: "images/bmw0.webp",
      specs: ["4.4L V8", "625 HP", "250 KM/H"]
    }
  ];

  useGSAP(() => {
    let mm = gsap.matchMedia();

    gsap.to(".gradient-text", {
      backgroundPosition: "-200% 0%",
      duration: 5,
      ease: "none",
      repeat: -1,
    });

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      gsap.killTweensOf([".mITitle", ".feature-item", ".modelInfoImg"]);
      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
      
      tl.set([".mITitle", ".feature-item", ".modelInfoImg"], { opacity: 0 });

      tl.to(".modelInfoImg", { x: isMobile ? 100 : 300, duration: 0.3 })
        .to(".mITitle", { y: isMobile ? 10 : 20, duration: 0.2 }, "-=0.2");

      tl.to(".modelInfoImg", { x: 0, opacity: 1, duration: 1.2, ease: "expo.out" })
        .to(".mITitle", { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, "-=0.9")
        .to(".feature-item", { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 }, "-=0.7");
    });

  }, { dependencies: [activeTab], scope: container });

  return (
    <section id="models" ref={container} className="main relative snapper w-full h-[100vh] flex flex-col items-center pt-[100px] bg-white text-black overflow-hidden cursor-default">
      

      <div className="absolute bottom-10 right-10 z-20 hidden lg:block ">
        <div className="flex items-center gap-4 rotate-90 origin-right translate-y-[-50%]">
          <span className="text-[#cf4b00] font-mono text-xs font-bold">03</span>
          <div className="w-12 h-[1px] bg-black/10"></div>
          <span className="text-[10px] font-mono tracking-[0.8em] text-black/40 uppercase font-bold">
            MODELS
          </span>
        </div>
      </div>


      <div className="fadeDownAll relative top-[-100px] opacity-0 flex gap-4 lg:gap-12 z-30 px-6 h-[60px] overflow-x-auto  w-full justify-center">
        {carData.map((car, index) => (
          <button
            key={car.id}
            onClick={() => setActiveTab(index)}
            className={`relative  text-[1rem] lg:text-[1.1rem] font-black tracking-[0.4em] transition-all duration-500 uppercase cursor-pointer outline-none whitespace-nowrap ${
              activeTab === index ? "text-black" : "text-black/15 hover:text-black/30"
            }`}
          >
            {car.id}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#cf4b00]" />
            )}
          </button>
        ))}
      </div>
      <div className="w-full max-w-[1400px] px-6 lg:px-20 grid lg:grid-cols-5 gap-0 items-center">
        

        <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-10 order-2 lg:order-1 z-20 mt-6 lg:mt-10">
          
          <div className="fadeRightAll relative left-[-100px] opacity-0 flex flex-col">
            <span className="text-[12px]  tracking-[0.6em] text-black/40 font-bold uppercase mb-4 lg:mb-6">Technical Data</span>
            <div className="flex gap-6 lg:gap-10">
              {carData[activeTab].specs.map((spec, i) => (
                <div key={i} className="feature-item flex flex-col opacity-0">
                   <span className="text-[2rem] font-black italic tracking-tighter text-black leading-none">{spec.split(' ')[0]}</span>
                   <span className="text-[1rem] tracking-[0.3em] text-[#cf4b00] uppercase font-bold mt-1">{spec.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="fadeRightAll relative left-[-100px] opacity-0 mITitle flex flex-col py-2 overflow-visible">
            <h2 
              className="gradient-text text-[3.5rem] font-black italic uppercase leading-[0.8] tracking-tighter text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #000 0%, #cf4b00 25%, #000 50%, #cf4b00 75%, #000 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {carData[activeTab].title.split(' ')[0]} <br/>
              {carData[activeTab].title.split(' ')[1]}
            </h2>
          </div>

          {/* Buttons - Stacked on mobile */}
          <div className="fadeUpAll relative top-[100px] opacity-0 flex flex-col sm:flex-row items-center gap-4 lg:gap-6 mt-4 lg:mt-6">
            <Link 
              href={`/Models?car=${carData[activeTab].anchor.toLowerCase()}`}
              className="group relative w-[300px] lg:w-full px-8 lg:px-10 py-4 lg:py-5 flex items-center justify-center overflow-hidden rounded-xl bg-white 
                        transition-all duration-500 ease-out
                        hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] 
                        active:scale-95 active:translate-y-0 active:shadow-md"
            >
              {/* The Moving Perimeter Glow */}
              <div className="absolute inset-0 p-[2px] rounded-xl overflow-hidden">
                <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#cf4b00_0%,#fff_20%,#cf4b00_50%,#fff_80%,#cf4b00_100%)]"></div>
                
                {/* Inner White Mask - Turns Orange on Hover */}
                <div className="absolute inset-[2px] bg-white rounded-[10px] group-hover:bg-[#cf4b00] transition-colors duration-500"></div>
              </div>

              <span className="relative z-10 text-[0.8rem] font-bold tracking-[0.2em] uppercase text-[#cf4b00] group-hover:text-white transition-colors duration-500">
                Explore
              </span>
            </Link>

            <button 
              onClick={() => window.dispatchEvent(new Event("openContact"))}
              className="group relative w-[300px] lg:w-full px-8 lg:px-10 py-4 lg:py-5 flex items-center justify-center overflow-hidden rounded-xl bg-white cursor-pointer
                        transition-all duration-500 ease-out
                        hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] 
                        active:scale-95 active:translate-y-0 active:shadow-md"
            >
              {/* Moving Border Layer */}
              <div className="absolute inset-0 p-[2px] rounded-xl overflow-hidden">
                <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite_reverse] bg-[conic-gradient(from_90deg_at_50%_50%,#cf4b00_0%,#fff_25%,#cf4b00_50%,#fff_75%,#cf4b00_100%)]"></div>
                
                {/* Inner White Mask */}
                <div className="absolute inset-[2px] bg-white rounded-[10px] group-hover:bg-[#cf4b00] transition-colors duration-500"></div>
              </div>

              <span className="relative z-10 text-[0.8rem] font-bold tracking-[0.2em] uppercase text-[#cf4b00] group-hover:text-white transition-colors duration-500">
                Order
              </span>
            </button>
          </div>
        </div>

        <div className="fadeLeftAll relative left-[100px] opacity-0 lg:col-span-3 relative order-1 lg:order-2 flex justify-center lg:justify-start items-center">
          <div className="absolute w-[80%] h-[30%] bg-black/[0.05] rounded-[100%] blur-3xl bottom-10 pointer-events-none"></div>
          
          <img 
            key={activeTab}
            src={carData[activeTab].img} 
            alt={carData[activeTab].title} 
            className="modelInfoImg w-[100%] py-[20px] sm:w-[100%] lg:w-[140%] max-w-none h-auto object-contain z-10 select-none pointer-events-none lg:translate-x-[-15%]"
          />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[60vw] lg:text-[45vw] font-black italic text-black/[0.03] select-none pointer-events-none z-0">
        {activeTab + 1}
      </div>
    </section>
  );
};

export default ModelInfo;