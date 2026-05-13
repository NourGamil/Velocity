"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef } from "react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Footer = () => {
  const container = useRef();

  useGSAP(() => {
    // 1. INFINITE SHIMMER
    gsap.to(".shimmer-footer", {
      backgroundPosition: "-200% 0%",
      duration: 2,
      ease: "none",
      repeat: -1,
    });

    // 2. THE YOYO (Subtle Floating)
    gsap.to(".shimmer-footer", {
      x: 20,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });


  }, { scope: container });

  return (
    <footer 
      ref={container} 
      className="main snapper relative w-full min-h-screen text-black flex flex-col items-center pt-24 overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 50%, #ffffff 0%, #f4f4f4 100%)"
      }}
    >
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none flex items-center justify-center">
        <h2 className="text-[4rem] sm:text-[10rem] lg:text-[16rem] font-black italic uppercase ">VELOCITY</h2>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-center items-center h-[60vh] w-full max-w-7xl px-8 pt-[100px]">
        
        {/* Branding Section */}
        <div className="fadeRightAll relative left-[-100px] opacity-0 w-full lg:w-1/3 mb-10 lg:mb-0 ">
          <div className="footer-reveal flex flex-col text-[5rem] font-black italic uppercase leading-[0.8] tracking-tighter select-none">
            <span className="text-black">The</span>
            <span 
              className="shimmer-footer text-transparent bg-clip-text inline-block"
              style={{
                backgroundImage: "linear-gradient(90deg, #000 0%, #cf4b00 50%, #000 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Show
            </span>
            <span className="text-black">Must</span>
            <span className="text-black">Go On</span>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="w-full lg:w-1/2 flex md:grid grid-cols-1 md:grid-cols-3 gap-12 lg:border-l border-black/5 pl-0 lg:pl-12">
          
          <div className="fadeLeftAll relative left-[100px] opacity-0 footer-reveal hidden md:block">
            <h4 className="text-[10px] tracking-[0.5em] uppercase text-black/30 font-bold mb-6">Navigation</h4>
            <ul className="flex flex-col gap-3 text-xl font-bold italic uppercase tracking-tight">
              {/* UPDATED MECHANISM: SYNCED WITH QUERY PARAMS */}
              {['Home', 'Gallery', 'About', 'Models', 'Models Explorer', 'Events'].map((item) => {
                let href = "/";
                if (item === "Models Explorer") {
                  href = "/Models";
                } else if (item !== "Home") {
                  const sectionId = item.toLowerCase().replace(/\s+/g, '-');
                  href = `/?scroll=${sectionId}`;
                }

                return (
                  <li key={item} className="group">
                    <Link 
                      href={href} 
                      className="group-hover:text-[#cf4b00] group-hover:pl-2 transition-all duration-500 block"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="fadeLeftAll relative left-[100px] opacity-0 footer-reveal">
            <h4 className="text-[10px] tracking-[0.5em] uppercase text-black/30 font-bold mb-6">Social</h4>
            <div className="flex flex-col gap-4">
              {[
                { name: 'Instagram', url: 'https://instagram.com' },
                { name: 'Twitter', url: 'https://twitter.com' },
                { name: 'Youtube', url: 'https://youtube.com' },
                { name: 'Facebook', url: 'https://facebook.com' },
                { name: 'TikTok', url: 'https://tiktok.com' }
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold border-b border-black/5 pb-1 hover:border-[#cf4b00] hover:text-[#cf4b00] hover:scale-110 transition-all cursor-pointer w-fit uppercase tracking-tighter"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div className="fadeLeftAll relative left-[100px] opacity-0 footer-reveal ">
            <h4 className="text-[10px] tracking-[0.5em] uppercase text-black/30 font-bold mb-6">Legal</h4>
            <ul className="flex flex-col w-[200px] gap-3 text-sm font-medium uppercase tracking-widest text-black/60">
              {['Privacy Policy', 'Terms of Services', 'Protocol'].map((item) => (
                <li key={item} className="hover:text-black hover:tracking-[0.2em] italic transition-all duration-300 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fadeUpAll relative top-[100px] opacity-0 w-full h-[60px] mt-auto border-t border-black/5 py-10 px-8 flex  justify-between items-center gap-6 relative bg-white/50 backdrop-blur-sm">
        <p className="footer-reveal text-[10px] tracking-[0.4em] uppercase text-black/40">
          © 2026 
          <a 
            href="https://nourgamil.github.io/Main-Portfolio/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black font-bold hover:text-[#cf4b00] transition-colors ml-1"
          >
            Nour
          </a> — All Rights Reserved
        </p>

        <div className="">
          <Link href="https://nourgamil.github.io/Velocity/" className="cursor-pointer footer-reveal flex items-center gap-3">
            <div className="group relative w-[40px] h-[30px] sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center overflow-hidden transition-transform duration-500 hover:rotate-[360deg]">
              <img src="images/swDark.svg" alt="Logo" className="w-5 h-5 invert relative z-10" />
              <div className="absolute inset-0 bg-[#cf4b00] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </div>
            <div className="flex flex-col ">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase ">VELOCITY</span>
              <span className="text-[8px] tracking-[0.1em] text-black/30 uppercase">Precision Performance</span>
            </div>
          </Link>
        </div>
      </div>

      {/* The Aesthetic Marquee */}
      <div className="fadeUpAll relative top-[100px] opacity-0 w-full bg-black py-4 overflow-hidden whitespace-nowrap">
        <div className="flex gap-10 animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-[9px] font-mono text-white/30 tracking-[1em] uppercase">
              • Engineered for Excellence • Driven by Vision •
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-30 right-10 z-10 hidden lg:block">
        <div className="flex items-center gap-4 rotate-90 origin-right translate-y-[-50%]">
          <span className="text-[#cf4b00] font-mono text-xs">05</span>
          <div className="w-12 h-[1px] bg-black/20"></div>
          <span className="text-[8px] font-mono tracking-[1em] text-black/80 uppercase">
          End Of The Ride
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;