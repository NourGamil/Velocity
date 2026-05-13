"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useSearchParams } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; 
// Components
import VideoBackground from  "@/components/Main1/videoBg";
import Header from           "@/components/Main1/header";
import Intro from            "@/components/Main1/intro";
import Swiper from           "@/components/Main2/swiper";
import Main3 from            "@/components/Main3/main3";
import ModelsInfo from       "@/components/Main4/modelsInfo";
import Events from           "@/components/Main5/events";
import Footer from           "@/components/Main6/footer";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
function Home() {
  const searchParams = useSearchParams();
  const scrollToTrigger = searchParams.get("scroll");
  const [isRouteLoading, setIsRouteLoading] = useState(true);
  const mainRef = useRef();

  // Handle Route Initialization
  useEffect(() => {
    // Give the browser 1.2s to parse the video and GSAP calculations
    const timer = setTimeout(() => {
      setIsRouteLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    // 1. ScrollTrigger Snapper setup
    let snappers = gsap.utils.toArray(".snapper");
    gsap.to(snappers, {
      ease: "none",
      duration: 0.1,
      scrollTrigger: {
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (snappers.length - 1),
          directional: false,
          inertia: true,
        },
      }
    });

    // 2. Initial Hero Animations
    let homeTl = gsap.timeline();
    homeTl.to(".fadeRight", { opacity: 1, x: 100, stagger: 0.2, duration: 1 })
          .to(".fadeLeft", { opacity: 1, x: -100, duration: 1 }, "-=1")
          .to(".fadeUp", { opacity: 1, y: -100, duration: 1 }, "-=1");

    // 3. Gallery Specific Hide/Show Logic
    ScrollTrigger.create({
      trigger: "#gallery",
      start: "top 50%",
      onEnter: () => {
        gsap.timeline()
          .to(".fadeRight", { opacity: 0, x: -100, stagger: 0.1, duration: 1 })
          .to(".fadeLeft", { opacity: 0, x: 100, duration: 1 }, "-=1")
          .to(".fadeUp", { opacity: 0, y: 100, duration: 1 }, "-=1");
      },
      onLeaveBack: () => {
        gsap.timeline()
          .to(".fadeRight", { opacity: 1, x: 100, stagger: 0.1, duration: 1 })
          .to(".fadeLeft", { opacity: 1, x: -100, duration: 1 }, "-=1")
          .to(".fadeUp", { opacity: 1, y: -100, duration: 1 }, "-=1");
      }
    });

    // 4. Batch Section Animations (fadeRightAll, fadeUpAll, etc.)
    const sections = gsap.utils.toArray(".main");
    sections.forEach((section) => {
      const fades = section.querySelectorAll(".fadeRightAll, .fadeLeftAll, .fadeUpAll, .fadeDownAll, .fadeScaleAll, .fadeblurOffAll");

      ScrollTrigger.create({
        trigger: section,
        start: "50% 90%",
        onEnter: () => {
          gsap.timeline()
            .to(section.querySelectorAll(".fadeRightAll"), { opacity: 1, x: 100, stagger: 0.1, duration: 1 })
            .to(section.querySelectorAll(".fadeLeftAll"), { opacity: 1, x: -100, stagger: 0.1, duration: 1 }, "-=1")
            .to(section.querySelectorAll(".fadeUpAll"), { opacity: 1, y: -100, stagger: 0.1, duration: 1 }, "-=1")
            .to(section.querySelectorAll(".fadeDownAll"), { opacity: 1, y: 100, stagger: 0.1, duration: 1 }, "-=1")
            .to(section.querySelectorAll(".fadeScaleAll"), { opacity: 1, scale: 1, stagger: 0.1, duration: 1 }, "-=1")
            .to(section.querySelectorAll(".fadeblurOffAll"), { filter: "blur(0px)", stagger: 0.1, duration: 1 }, "-=1");
        },
        onLeaveBack: () => {
          gsap.timeline()
            .to(section.querySelectorAll(".fadeRightAll"), { opacity: 0, x: -100, duration: 1 })
            .to(section.querySelectorAll(".fadeLeftAll"), { opacity: 0, x: 100, duration: 1 }, "-=1")
            .to(section.querySelectorAll(".fadeUpAll"), { opacity: 0, y: 100, duration: 1 }, "-=1")
            .to(section.querySelectorAll(".fadeDownAll"), { opacity: 0, y: -100, duration: 1 }, "-=1")
            .to(section.querySelectorAll(".fadeScaleAll"), { opacity: 0, scale: 0, duration: 1 }, "-=1")
            .to(section.querySelectorAll(".fadeblurOffAll"), { filter: "blur(10px)", duration: 1 }, "-=1");
        }
      });
    });

    // 5. Text Shimmer Effect
    gsap.to(".shimmer-text", {
      backgroundPosition: "-200% 0%",
      duration: 6,
      ease: "none",
      repeat: -1,
    });

    // 6. External Scroll Trigger (from search params)
    if (scrollToTrigger && !isRouteLoading) {
      const timer = setTimeout(() => {
        const target = document.getElementById(scrollToTrigger);
        if (target) {
          gsap.to(window, {
            duration: 1.8,
            scrollTo: { y: target },
            ease: "expo.inOut",
          });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, { scope: mainRef, dependencies: [scrollToTrigger, isRouteLoading] });

  return (
    <div ref={mainRef} className="webSite">

      {/* Global Elements */}
      <Header />
      <VideoBackground />
      
      {/* Sections */}
      <Intro />
      <Swiper />
      <Main3 />
      <ModelsInfo />
      <Events />
      <Footer />
    </div>
  );
}
export default function Page() {
  return (
    // The fallback can be a simple loader or an empty div
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <Home />
    </Suspense>
  );
}