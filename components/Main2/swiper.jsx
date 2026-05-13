"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

const Swiper = () => {
  const container = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "We don’t just put cars on the road — we conquer it.",
      desc: "Every detail is built for power and control. Our cars don’t blend in — they own the road, turning every drive into a statement.",
      footer: "Where others drive, we lead.",
      img: "images/blogs1.webp",
      layout: "flex-col lg:flex-row lg:grid-cols-2",
    },
    {
      id: 2,
      title: "Victory, in its boldest form.",
      desc: "Under the lights, surrounded by energy and applause, this car doesn’t just stand on stage — it owns it.",
      footer: "Tonight, we didn’t just show up — we took the win",
      img: "images/blogs3.webp",
      layout: "flex-col",
    },
    {
      id: 3,
      title: "A record written in silence.",
      desc: "It rests after conquering the asphalt—pure speed, sharp lines, and zero compromise. No crowd needed. The record says everything.",
      footer: "",
      img: "images/blogs2.webp",
      layout: "flex-col-reverse",
    }
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const onHover = (e) => {
    gsap.to(e.currentTarget, {
      filter: "grayscale(0%)",
      scale: 1.05,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  const onHoverExit = (e) => {
    gsap.to(e.currentTarget, {
      filter: "grayscale(100%)",
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  useGSAP(() => {
    gsap.killTweensOf(".slide-img, .slide-text-part");
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

    tl.fromTo(".slide-text-part", 
      { x: -100, opacity: 0 }, 
      { x: 0, opacity: 1, stagger: 0.1 }
    );

    if (currentIndex === 0) {
      tl.fromTo(".slide-img", { x: "100%", opacity: 0 }, { x: "0%", opacity: 1 }, 0);
    } else if (currentIndex === 1) {
      tl.fromTo(".slide-img", { y: "-100%", opacity: 0 }, { y: "0%", opacity: 1 }, 0);
    } else if (currentIndex === 2) {
      tl.fromTo(".slide-img", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1 }, 0);
    }

  }, { dependencies: [currentIndex], scope: container, revertOnUpdate: true });

  const currentSlide = slides[currentIndex];

  return (
    <section id="gallery" className="main snapper w-full h-[100vh] overflow-hidden ">
      <div  className="fadeblurOffAll blur-[10px] relative w-full h-[100vh] flex items-center justify-center bg-white">
        <div className=""></div>
        <button onClick={handlePrev} className="absolute cursor-pointer left-[20px] lg:left-[4vw] top-1/2 -translate-y-1/2 z-50 group">
          <div className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all">
            <span>←</span>
          </div>
        </button>

        <button onClick={handleNext} className="absolute cursor-pointer right-[20px] lg:right-[4vw] top-1/2 -translate-y-1/2 z-50 group">
          <div className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all">
            <span>→</span>
          </div>
        </button>

        <div 
          ref={container} 
          key={currentIndex} 
          className="w-[80vw] mx-auto h-[90vh] overflow-hidden relative flex flex-col "
        >
          <div className={`flex w-full h-full ${currentSlide.layout}`}>
            
            <div className={`relative overflow-hidden 
              ${currentIndex === 0 ? "h-full w-full order-2" : "h-[50vh] w-full"}`}>
              <img 
                src={currentSlide.img} 
                onMouseEnter={onHover}
                onMouseLeave={onHoverExit}
                className="slide-img w-full h-full object-cover lg:grayscale cursor-crosshair"
                alt="Car"
              />
            </div>


            <div className={`flex flex-col justify-center relative px-8 lg:px-20
              ${currentIndex === 2 ? "pt-20" : "pt-12 pb-12"}
              ${currentIndex === 0 ? "order-1 w-full" : "flex-1"}`}>
              
              <p className="slide-text-part text-[#cf4b00] font-mono text-[10px] tracking-[0.5em] mb-4 uppercase">
                Project 0{currentSlide.id}
              </p>
              
              <h2 className="slide-text-part text-4xl xl:text-6xl font-black italic uppercase leading-[0.85] mb-6 tracking-tighter text-black">
                {currentSlide.title}
              </h2>
              
              <p className="slide-text-part text-black/60 text-sm lg:text-base max-w-md leading-relaxed mb-8">
                {currentSlide.desc}
              </p>

              {currentSlide.footer && (
                <p className="slide-text-part text-[10px] tracking-widest text-[#cf4b00] uppercase font-bold">
                  // {currentSlide.footer}
                </p>
              )}

                <div className={`absolute font-black italic opacity-[0.1] pointer-events-none uppercase leading-none bottom-6 right-6 text-[12vw] max-lg:hidden`}>
                  {currentSlide.id}
                </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 z-10 hidden lg:block">
          <div className="flex items-center gap-4 rotate-90 origin-right translate-y-[-50%]">
            <span className="text-[#cf4b00] font-mono text-xs">01</span>
            <div className="w-12 h-[1px] bg-black/40"></div>
            <span className="text-[8px] font-mono tracking-[1em] text-black/80 uppercase">
              TOP SPECS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Swiper;