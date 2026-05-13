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
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    setIsMobile(mediaQuery.matches);
    
    const lowEnd = 
      (navigator.deviceMemory && navigator.deviceMemory <= 4) || 
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    setIsLowEnd(lowEnd);

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useGSAP(() => {
    gsap.ticker.fps(isLowEnd ? 30 : 60);
  }, [isLowEnd]);

  const carScale = isMobile ? 0.8 : 1.6;

  return (
    <div className="relative w-full h-[40vh] md:h-[60vh] cursor-pointer z-0">
      <Canvas 
        shadows={!isLowEnd} 
        dpr={isLowEnd ? 1 : [1, 2]} 
        camera={{ position: [-5, 0, 0], fov: 60 }}
        gl={{ antialias: !isLowEnd, powerPreference: "high-performance", stencil: false }}
      >
        <Suspense fallback={null}>
          <Stage intensity={0.3} environment={isLowEnd ? "neutral" : "city"} shadows={isLowEnd ? false : "contact"} adjustCamera={false} center>
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
      const fades = section.querySelectorAll(".fadeRightAll, .fadeLeftAll, .fadeUpAll, .fadeDownAll, .fadeScaleAll");
      
      ScrollTrigger.create({
        trigger: section,
        start: "50% 90%",
        onEnter: () => gsap.to(fades, { opacity: 1, x: 0, y: 0, scale: 1, stagger: 0.1, duration: 1 }),
        onLeaveBack: () => gsap.to(fades, { opacity: 0, duration: 1 })
      });
    });
  }, []);

  useGSAP(() => {
    gsap.to(sectionRef.current, { background: viewMode === "about" ? "#0a0a0a" : activeColor.gradient, duration: 0.8 });
  }, [activeColor, viewMode]);

  const btnClass = (active) => `relative w-full sm:w-64 px-10 py-5 text-[11px] tracking-[0.4em] uppercase font-black rounded-xl border border-white/10 backdrop-blur-md cursor-pointer transition-all duration-500 ${active ? "bg-white text-black shadow-2xl -translate-y-1" : "bg-white/5 text-white/50 hover:bg-white/10"}`;

  return (
    <section id={`${car.id}`} ref={sectionRef} className="main w-full min-h-screen flex flex-col relative overflow-hidden pt-32 pb-16 px-6">
      <h2 className="fadeScaleAll opacity-0 scale-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.06] text-[20vw] font-black pointer-events-none uppercase">
        {car.name}
      </h2>
      <div className="z-10 flex flex-col items-center justify-between w-full max-w-7xl mx-auto flex-1">
        <div className={`flex flex-col items-center gap-3 transition-opacity duration-700 ${viewMode === 'about' ? 'opacity-0' : 'opacity-100'}`}>
          <div className="fadeDownAll flex gap-4 p-3 bg-black/40 backdrop-blur-2xl rounded-full border border-white/10">
            {car.colors.map((color, i) => (
              <button key={i} onClick={() => setActiveColor(color)} className={`w-8 h-8 rounded-full ${activeColor.hex === color.hex ? 'ring-2 ring-white' : 'opacity-30'}`} style={{ backgroundColor: color.hex }} />
            ))}
          </div>
        </div>
        
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-16 flex-1">
           <div className="w-full lg:w-3/4">
              {viewMode === "3d" ? <CarCanvas carId={car.id} carColor={activeColor.hex} /> : <img src={viewMode === "about" ? car.aboutImg : activeColor.img} className="w-full object-contain" alt={car.name} />}
           </div>
           {viewMode === "about" && (
             <div className="lg:w-1/3 flex flex-col gap-4">
               {car.specs.map((s, i) => <p key={i} className="text-white text-sm tracking-widest">{s}</p>)}
             </div>
           )}
        </div>

        <div className="fadeUpAll flex flex-row gap-8 mb-4">
          <button onClick={() => setViewMode(viewMode === "3d" ? "colors" : "3d")} className={btnClass(viewMode === "3d")}>3D View</button>
          <button onClick={() => setViewMode(viewMode === "about" ? "colors" : "about")} className={btnClass(viewMode === "about")}>Specs</button>
        </div>
      </div>
    </section>
  );
};

const Models = () => {
  const searchParams = useSearchParams();
  const carId = searchParams.get("car");

  useEffect(() => {
    // If a car ID is present in the URL, scroll to it after a short delay 
    // to allow the global loader from layout.js to start its work.
    if (carId) {
       setTimeout(() => {
         gsap.to(window, { duration: 1.5, scrollTo: `#${carId}`, ease: "power4.inOut" });
       }, 1500); 
    }
  }, [carId]);

  return (
    <div className="bg-black">
      <Header />
      <main> 
        <div className="snapper"><CarSection car={CAR_DATA.urus} /></div>
        <div className="snapper"><CarSection car={CAR_DATA.revuelto} /></div>
        <div className="snapper"><CarSection car={CAR_DATA.bmw} /></div>
        <Footer />
      </main>
    </div>
  );
};

export default Models;