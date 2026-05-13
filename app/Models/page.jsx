"use client";
import { useState, useRef, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls } from "@react-three/drei";
import Header from "@/components/Main1/header";
import Footer from "@/components/Main6/footer";
import { Urus } from "@/components/Urus";
import { Revuelto } from "@/components/Revuelto";
import { Bmw } from "@/components/Bmw";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const CAR_DATA = {
  urus: {
    id: "urus",
    name: "URUS",
    specs: ["4.0L V8 Twin-Turbo", "650 CV / 478 kW", "3.6s (0-100 km/h)", "305 km/h Top Speed", "850 Nm Torque"],
    colors: [
      { name: "Rosso Mars", hex: "#a30000", img: "images/urus3.webp", gradient: "radial-gradient(circle at center, #4b0000 0%, #000000cc 100%)" },
      { name: "Blu Astraeus", hex: "#0c1731", img: "images/urus2.webp", gradient: "radial-gradient(circle at center, #061025 0%, #000000cc 100%)" },
      { name: "Bianco Monocerus", hex: "#ddddde", img: "images/urus1.webp", gradient: "radial-gradient(circle at center, #333333 0%, #000000cc 100%)" },
    ],
    aboutImg: "images/urus4.webp"
  },
  revuelto: {
    id: "revuelto",
    name: "REV.",
    specs: ["V12 Hybrid Plug-in", "1015 CV Total Power", "2.5s (0-100 km/h)", "> 350 km/h Top Speed", "Electric 4WD"],
    colors: [
      { name: "Rosso Efesto", hex: "#8b0000", img: "images/rev3.webp", gradient: "radial-gradient(circle at center, #3a0000 0%, #000000cc 100%)" },
      { name: "Blu Mehetaris", hex: "#001f3f", img: "images/rev2.webp", gradient: "radial-gradient(circle at center, #000a1a 0%, #000000cc 100%)" },
      { name: "Bianco Isis", hex: "#ffffff", img: "images/rev1.webp", gradient: "radial-gradient(circle at center, #222222 0%, #000000cc 100%)" },
    ],
    aboutImg: "images/rev4.webp"
  },
  bmw: {
    id: "bmw",
    name: "M4 COMPETITION",
    specs: ["M TwinPower Turbo 6-Cyl", "503 Horsepower", "3.4s (0-60 mph)", "479 lb-ft Torque", "8-speed M Steptronic"],
    colors: [
      { name: "Toronto Red", hex: "#cc0000", img: "images/bmw3.webp", gradient: "radial-gradient(circle at center, #410000 0%, #000000cc 100%)" },
      { name: "Portimao Blue", hex: "#154d85", img: "images/bmw2.webp", gradient: "radial-gradient(circle at center, #0a2542 0%, #000000cc 100%)" },
      { name: "Alpine White", hex: "#f0f0f0", img: "images/bmw1.webp", gradient: "radial-gradient(circle at center, #2a2a2a 0%, #000000cc  100%)" },
    ],
    aboutImg: "images/bmw4.webp"
  }
};

const CarCanvas = ({ carId, carColor }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [fpsLimit, setFpsLimit] = useState(60);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    setIsMobile(mediaQuery.matches);
    
    const isLowEnd = 
      (navigator.deviceMemory && navigator.deviceMemory <= 4) || 
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

    if (isLowEnd) {
      setFpsLimit(30);
    }

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useGSAP(() => {
    gsap.ticker.fps(fpsLimit);
  }, [fpsLimit]);

  const carScale = isMobile ? 0.8 : 1.6;

  return (
    <div className="relative w-full h-[40vh] md:h-[60vh] cursor-pointer overflow-visible z-0 ">
      <Canvas 
        shadows 
        dpr={fpsLimit === 30 ? 1 : [1, 2]} 
        camera={{ position: [-5, 0, 0], fov: 60 }}
        gl={{ 
            antialias: fpsLimit !== 30,
            powerPreference: "high-performance" 
        }}
      >
        <Suspense fallback={null}>
          <Stage intensity={0.3} environment="city" shadows="contact" adjustCamera={false} center>
            {carId === "urus" && <Urus carColor={carColor} scale={carScale} />}
            {carId === "revuelto" && <Revuelto carColor={carColor} scale={carScale} />}
            {carId === "bmw" && <Bmw carColor={carColor} scale={carScale} />}
          </Stage>
        </Suspense>
        <OrbitControls enableZoom={true} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2} target={[0, 0, 0]} makeDefault />
      </Canvas>
    </div>
  );
};

const CarSection = ({ car, defaultColorIndex = 0 }) => {
  const [viewMode, setViewMode] = useState("colors");
  const [activeColor, setActiveColor] = useState(car.colors[defaultColorIndex]);
  const sectionRef = useRef();
  const imgRef = useRef();
  const aboutImgRef = useRef();

  useEffect(() => {
    let snappers = gsap.utils.toArray(".snapper");
    gsap.to(snappers, {
      ease: "none",
      duration: 0.1,
      scrollTrigger: {
        pin: true,
        scrub: 1,
        snap: { snapTo: 1 / (snappers.length - 1), directional: false, inertia: true },
      }
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onLeave: () => setViewMode("colors"),
      onLeaveBack: () => setViewMode("colors"),
    });

    const sections = gsap.utils.toArray(".main");
    sections.forEach((section) => {
      const elements = {
        fadeRights: section.querySelectorAll(".fadeRightAll"),
        fadeLefts: section.querySelectorAll(".fadeLeftAll"),
        fadeUps: section.querySelectorAll(".fadeUpAll"),
        fadeDowns: section.querySelectorAll(".fadeDownAll"),
        fadeScales: section.querySelectorAll(".fadeScaleAll"),
        fadeblurOff: section.querySelectorAll(".fadeblurOffAll")
      };

      ScrollTrigger.create({
        trigger: section,
        start: "50% 90%",
        onEnter: () => {
          gsap.timeline()
            .to(elements.fadeRights, { opacity: 1, x: 100, stagger: 0.1, duration: 1 })
            .to(elements.fadeLefts, { opacity: 1, x: -100, stagger: 0.1, duration: 1 }, "-=1")
            .to(elements.fadeUps, { opacity: 1, y: -100, stagger: 0.1, duration: 1 }, "-=1")
            .to(elements.fadeDowns, { opacity: 1, y: 100, stagger: 0.1, duration: 1 }, "-=1")
            .to(elements.fadeScales, { opacity: 1, scale: 1, stagger: 0.1, duration: 1 }, "-=1")
            .to(elements.fadeblurOff, { filter: "blur(0px)", stagger: 0.1, duration: 1 }, "-=1");
        },
        onLeaveBack: () => {
          gsap.timeline()
            .to(elements.fadeRights, { opacity: 0, x: -100, stagger: 0.1, duration: 1 })
            .to(elements.fadeLefts, { opacity: 0, x: 100, stagger: 0.1, duration: 1 }, "-=1")
            .to(elements.fadeUps, { opacity: 0, y: 100, stagger: 0.1, duration: 1 }, "-=1")
            .to(elements.fadeDowns, { opacity: 0, y: -100, stagger: 0.1, duration: 1 }, "-=1")
            .to(elements.fadeScales, { opacity: 0, scale: 0, stagger: 0.1, duration: 1 }, "-=1")
            .to(elements.fadeblurOff, { filter: "blur(10px)", stagger: 0.1, duration: 1 }, "-=1");
        }
      });

      ScrollTrigger.create({
        trigger: section,
        start: "bottom 50%",
        onEnter: () => {
          gsap.timeline()
            .to(elements.fadeRights, { opacity: 0, x: -100, duration: 1 })
            .to(elements.fadeLefts, { opacity: 0, x: 100, duration: 1 }, "-=1")
            .to(elements.fadeUps, { opacity: 0, y: 100, duration: 1 }, "-=1")
            .to(elements.fadeDowns, { opacity: 0, y: -100, duration: 1 }, "-=1")
            .to(elements.fadeScales, { opacity: 0, scale: 0, stagger: 0.1, duration: 1 }, "-=1")
            .to(elements.fadeblurOff, { filter: "blur(10px)", stagger: 0.1, duration: 1 }, "-=1");
        },
        onLeaveBack: () => {
          gsap.timeline()
            .to(elements.fadeRights, { opacity: 1, x: 100, duration: 1 })
            .to(elements.fadeLefts, { opacity: 1, x: -100, duration: 1 }, "-=1")
            .to(elements.fadeUps, { opacity: 1, y: -100, duration: 1 }, "-=1")
            .to(elements.fadeDowns, { opacity: 1, y: 100, duration: 1 }, "-=1")
            .to(elements.fadeScales, { opacity: 1, scale: 1, stagger: 0.1, duration: 1 }, "-=1")
            .to(elements.fadeblurOff, { filter: "blur(0px)", stagger: 0.1, duration: 1 }, "-=1");
        }
      });
    });
  }, []);

  useGSAP(() => {
    gsap.to(sectionRef.current, {
      background: viewMode === "about" ? "#0a0a0a" : activeColor.gradient,
      duration: 0.8,
      ease: "power2.out"
    });
    if (viewMode !== "about") {
      gsap.fromTo(imgRef.current, { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "expo.out" });
    }
    if (viewMode === "about") {
      gsap.fromTo(aboutImgRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.2)", delay: 0.1 });
      gsap.fromTo(".spec-item", { x: 100, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out", delay: 0.4 });
    }
  }, { dependencies: [activeColor, viewMode] });

  const btnClass = (active) => `relative overflow-hidden w-full sm:w-64 px-10 py-5 text-[11px] tracking-[0.4em] uppercase font-black rounded-xl transition-all duration-500 transform active:scale-95 border border-white/10 backdrop-blur-md cursor-pointer ${active ? "bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.2)] -translate-y-1" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/30 shadow-2xl"}`;

  return (
    <section id={`${car.id}`} ref={sectionRef} className="main w-full min-h-[100vh] flex flex-col relative overflow-hidden border-b border-white/5 pt-32 pb-16 px-6">
      <h2 className="fadeScaleAll opacity-0 scale-0 absolute max-lg:top-[180px] max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:translate-y-[0] top-300px left-[50px] text-white/[0.06] text-[6rem] max-lg:text-[32vw] font-black tracking-tighter select-none z-0 pointer-events-none uppercase">
        {car.name.split(' ')[0]}
      </h2>
      <div className="z-10 flex flex-col items-center justify-between w-full max-w-7xl mx-auto flex-1 relative">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 transition-all duration-700 ease-in-out pointer-events-none ${viewMode === 'about' ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
          <div className="fadeDownAll relative top-[-100px] opacity-0 flex gap-4 p-3 bg-black/40 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-auto">
            {car.colors.map((color, i) => (
              <button key={i} onClick={() => setActiveColor(color)} className={`w-10 h-10 rounded-full transition-all duration-300 cursor-pointer ${activeColor.hex === color.hex ? 'scale-125 ring-2 ring-white ring-offset-4 ring-offset-black' : 'opacity-30 hover:opacity-100'}`} style={{ backgroundColor: color.hex }} />
            ))}
          </div>
          <p className="fadeDownAll relative top-[-100px] opacity-0 text-white/40 text-[9px] tracking-[0.6em] uppercase font-bold">{activeColor.name}</p>
        </div>
        <div className={`fadeScaleAll relative scale-0 opacity-0 flex flex-col lg:flex-row items-center justify-center w-full gap-16 flex-1 pt-24 md:pt-16`}>
          <div className={`relative flex justify-center items-center transition-all duration-1000 ease-expo ${viewMode === 'about' ? 'w-full lg:w-1/2' : 'w-full lg:w-3/4'}`}>
            <div ref={imgRef} className="w-full">
              {viewMode === "3d" ? (
                  <CarCanvas key={car.id} carId={car.id} carColor={activeColor.hex} />
              ) : (
                 <img ref={viewMode === "about" ? aboutImgRef : null} src={viewMode === "about" ? car.aboutImg : activeColor.img} className="w-full max-w-[80vw] lg:max-w-full max-sm:mt-[-100px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,1)] relative z-20 cursor-pointer" alt={car.name} />
              )}
            </div>
          </div>
          {viewMode === "about" && (
            <div className="w-full lg:w-1/3 flex flex-col gap-6 z-20 relative">
              <h3 className="text-white/40 text-xs font-black tracking-[0.8em] uppercase mb-4">Core Architecture</h3>
              {car.specs.map((text, i) => (
                <div key={i} className="spec-item flex items-center gap-6 group">
                  <span className="text-white/20 font-mono text-sm">0{i + 1}</span>
                  <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-white/40 transition-colors"></div>
                  <span className="text-white text-sm font-medium tracking-widest">{text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="fadeUpAll relative top-[100px] opacity-0 flex flex-row gap-8 mb-4 z-30 relative pointer-events-auto">
          <button onClick={() => setViewMode(viewMode === "3d" ? "colors" : "3d")} className={btnClass(viewMode === "3d")}>
            {viewMode === "3d" ? "Show" : "3D"}
          </button>
          <button onClick={() => setViewMode(viewMode === "about" ? "colors" : "about")} className={btnClass(viewMode === "about")}>
            {viewMode === "about" ? "Show" : "SPECS"}
          </button>
        </div>
      </div>
    </section>
  );
};

const ModelsContent = () => {
  const searchParams = useSearchParams();
  const carId = searchParams.get("car");
  const container = useRef();

  useEffect(() => {
    if (carId) {
      const timer = setTimeout(() => {
        gsap.to(window, { duration: 1.5, scrollTo: { y: `#${carId}`}, ease: "power4.inOut" });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [carId]);

  return (
    <div className="">
      <Header />
      <main ref={container}> 
        <div className="snapper"><CarSection car={CAR_DATA.urus} defaultColorIndex={2} /></div>
        <div className="snapper"><CarSection car={CAR_DATA.revuelto} defaultColorIndex={1} /></div>
        <div className="snapper"><CarSection car={CAR_DATA.bmw} defaultColorIndex={0} /></div>
        <section className="w-full min-h-[100vh] flex items-center justify-center bg-black">
          <Footer />
        </section>
      </main>
    </div>
  );
};

const Models = () => {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <ModelsContent />
    </Suspense>
  );
};

export default Models;