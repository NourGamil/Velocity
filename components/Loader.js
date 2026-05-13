"use client";
import { useState, useEffect } from "react";
import { gsap } from "gsap";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setShow(false) 
    });

    // We give it a 2-second delay so the heavy 3D Canvas 
    // in the background has time to start rendering.
    tl.to(".loader-wrapper", {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      delay: 2 
    });
  }, []);

  if (!show) return null;

  return (
    <div className="loader-wrapper fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <div className="w-48 h-[1px] bg-white/20 relative overflow-hidden">
          {/* Ensure 'animate-load' is defined in your globals.css */}
          <div className="absolute inset-0 bg-white origin-left animate-load" />
        </div>
        <span className="mt-4 text-[10px] tracking-[0.5em] text-white uppercase font-bold">
          VELOCITY
        </span>
      </div>
    </div>
  );
}