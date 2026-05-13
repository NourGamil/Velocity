"use client";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useSearchParams } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; 
import VideoBackground from   "@/components/Main1/videoBg";
import Header from            "@/components/Main1/header";
import Intro from             "@/components/Main1/intro";
import Swiper from            "@/components/Main2/swiper";
import Main3 from             "@/components/Main3/main3";
import ModelsInfo from        "@/components/Main4/modelsInfo";
import Events from            "@/components/Main5/events";
import Footer from            "@/components/Main6/footer";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
export default function Home() {
  const searchParams = useSearchParams();
  const scrollToTrigger = searchParams.get("scroll");


  useGSAP(()=>{
//------------------------------------------ scrolltrigger snapper---------------------------
            let snappers = gsap.utils.toArray(".snapper");
            gsap.to(snappers, {
            ease: "none",
            duration:0.1,
            delay:0,
            scrollTrigger: {
            pin: true,
            scrub: 1,
            snap: {
            snapTo: 1 / (snappers.length - 1) ,
            directional: false,
            inertia: true,
            },}
            });
//------------------------------------------ scrolltrigger animation---------------------------
let homeTl = gsap.timeline();
        homeTl.to(".fadeRight",{
          opacity:1,
          x:100,
          stagger:0.2,
          duration:1
        }).to(".fadeLeft",{
          opacity:1,
          x:-100,
          duration:1
        },"-=1").to(".fadeUp",{
          opacity:1,
          y:-100,
          duration:1
        },"-=1")

        ScrollTrigger.create({
          trigger: "#gallery",
          start: "top 50%",
          onEnter: () => {
          gsap.timeline()
          .to(".fadeRight",{
          opacity:0,
          x:-100,
          stagger:0.1,
          duration:1
        }).to(".fadeLeft",{
          opacity:0,
          x:100,
          duration:1
        },"-=1").to(".fadeUp",{
          opacity:0,
          y:100,
          duration:1
        },"-=1")
          },
          onLeaveBack: () => {
          gsap.timeline()
          .to(".fadeRight",{
          opacity:1,
          x:100,
          stagger:0.1,
          duration:1
        }).to(".fadeLeft",{
          opacity:1,
          x:-100,
          duration:1
        },"-=1").to(".fadeUp",{
          opacity:1,
          y:-100,
          duration:1
        },"-=1")
          }
        });

        const sections = gsap.utils.toArray(".main");

        sections.forEach((section) => {
          const fadeRights = section.querySelectorAll(".fadeRightAll");
          const fadeLefts = section.querySelectorAll(".fadeLeftAll");
          const fadeUps = section.querySelectorAll(".fadeUpAll");
          const fadeDowns = section.querySelectorAll(".fadeDownAll");
          const fadeScales = section.querySelectorAll(".fadeScaleAll");
          const fadeblurOff = section.querySelectorAll(".fadeblurOffAll");

          ScrollTrigger.create({
            trigger: section,
            start: "50% 90%",
            onEnter: () => {
              gsap.timeline()
                .to(fadeRights, { opacity: 1, x: 100, stagger: 0.1, duration: 1 })
                .to(fadeLefts, { opacity: 1, x: -100,stagger: 0.1, duration: 1 }, "-=1")
                .to(fadeUps, { opacity: 1, y: -100,stagger: 0.1, duration: 1 }, "-=1")
                .to(fadeDowns, { opacity: 1, y: 100,stagger: 0.1, duration: 1 }, "-=1")
                .to(fadeScales, { opacity: 1, scale:1,stagger: 0.1, duration: 1 }, "-=1")
                .to(fadeblurOff, {  filter: "blur(0px)",stagger: 0.1, duration: 1 }, "-=1");
            },
            onLeaveBack: () => {
              gsap.timeline()
                .to(fadeRights, { opacity: 0, x: -100, stagger: 0.1, duration: 1 })
                .to(fadeLefts, { opacity: 0, x: 100,stagger: 0.1, duration: 1 }, "-=1")
                .to(fadeUps, { opacity: 0, y: 100,stagger: 0.1, duration: 1 }, "-=1")
                .to(fadeDowns, { opacity: 0, y: -100,stagger: 0.1, duration: 1 }, "-=1")
                .to(fadeScales, { opacity: 0, scale:0,stagger: 0.1, duration: 1 }, "-=1")
                .to(fadeblurOff, { filter: "blur(10px)",stagger: 0.1, duration: 1 }, "-=1");
            }
          });

          ScrollTrigger.create({
            trigger: section,
            start: "bottom 50%",
            onEnter: () => {
              gsap.timeline()
                .to(fadeRights, { opacity: 0, x: -100,duration: 1 })
                .to(fadeLefts, { opacity: 0, x: 100,duration: 1 }, "-=1")
                .to(fadeUps, { opacity: 0, y: 100,duration: 1 }, "-=1")
                .to(fadeDowns, { opacity: 0, y: -100,duration: 1 }, "-=1")
                .to(fadeScales, { opacity: 0, scale:0,stagger: 0.1, duration: 1 }, "-=1")
                .to(fadeblurOff, { filter: "blur(10px)",stagger: 0.1, duration: 1 }, "-=1");
            },
            onLeaveBack: () => {
              gsap.timeline()
                .to(fadeRights, { opacity: 1, x: 100,duration: 1 })
                .to(fadeLefts, { opacity: 1, x: -100,duration: 1 }, "-=1")
                .to(fadeUps, { opacity: 1, y: -100,duration: 1 }, "-=1")
                .to(fadeDowns, { opacity: 1, y: 100,duration: 1 }, "-=1")
                .to(fadeScales, { opacity: 1, scale:1,stagger: 0.1, duration: 1 }, "-=1")
                .to(fadeblurOff, { filter: "blur(0px)",stagger: 0.1, duration: 1 }, "-=1");
            }
          });
        });

        gsap.to(".shimmer-text", {
            backgroundPosition: "-200% 0%",
            duration: 6,
            ease: "none",
            repeat: -1,
        });

      if (scrollToTrigger) {
            const timer = setTimeout(() => {
              const target = document.getElementById(scrollToTrigger);
              
              if (target) {
                gsap.to(window, {
                  duration: 1.8,
                  scrollTo: { y: target},
                  ease: "expo.inOut",
                });
              }
            }, 200);

            return () => clearTimeout(timer);
          }
        }, [scrollToTrigger]); 
  
  return (
    <div className="webSite">
      {/* fixed*/}
      <Header />
      {/* --------------- */}
      {/* fixed underneath */}
      <VideoBackground />
      <Intro />
      {/* --------------- */}
      <Swiper />
      <Main3 />
      <ModelsInfo />
      <Events />
      <Footer />
    </div>
  );
}
