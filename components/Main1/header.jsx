"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef, useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollToPlugin);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'system', text: "L.A.U.N.C.H Assistant active. How can we assist your journey?" }
  ]);
  
  const container = useRef();
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleOpenContact = () => {
      if (!isContactOpen) toggleContact();
    };
    window.addEventListener("openContact", handleOpenContact);
    return () => window.removeEventListener("openContact", handleOpenContact);
  }, [isContactOpen]);

  const toggleMenu = () => {
    if (isContactOpen) toggleContact();
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });
    
    if (!isMenuOpen) {
      tl.to(".headerNav", { x: "0%", opacity: 1, display: "flex" })
        .from(".nav-link-item", { y: 30, opacity: 0, stagger: 0.1 }, "-=0.8");
    } else {
      tl.to(".headerNav", { x: "-100%", opacity: 0 });
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleContact = () => {
    if (isMenuOpen) toggleMenu();
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });
    
    if (!isContactOpen) {
      tl.to(".contactUs", { x: "0%", opacity: 1, display: "flex" })
        .from(".chat-anim", { opacity: 0, y: 20, stagger: 0.1 }, "-=0.7");
    } else {
      tl.to(".contactUs", { x: "100%", opacity: 0 });
    }
    setIsContactOpen(!isContactOpen);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: userInput }]);
    setUserInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'system', 
        text: "A specialist will review your request shortly." 
      }]);
    }, 1200);
  };

  return (
    <header ref={container} className="fixed top-0 w-full z-[1000] border-b border-white/5 bg-black/20 text-white backdrop-blur-md">
      <div className="flex justify-between items-center px-6 lg:px-[5vw] h-[80px] ">
      
        <button onClick={toggleMenu} className="group flex items-center gap-6 cursor-pointer">
          <div className="relative w-8 h-6 pt-[2px] flex flex-col justify-between">
            <span className={`h-[2px] w-full bg-white transition-all duration-500 ${isMenuOpen ? 'rotate-[45deg] translate-y-[9px]' : ''}`}></span>
            <span className={`h-[2px] w-full bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-[2px] w-full bg-white transition-all duration-500 ${isMenuOpen ? 'rotate-[-45deg] -translate-y-[9px]' : ''}`}></span>
          </div>
          <span className="hidden lg:block text-[10px] tracking-[0.6em] font-light uppercase opacity-80 group-hover:text-[#cf4b00] transition-colors">Navigate</span>
        </button>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
          <img src="images/swWhite.svg" className="w-8 group-hover:scale-110 transition-transform duration-700" alt="Logo" />
        </Link>

        <button onClick={toggleContact} className="flex items-center gap-4 group cursor-pointer">
          <span className="hidden lg:block text-[10px] tracking-[0.6em] font-light uppercase opacity-80 group-hover:text-[#cf4b00] transition-opacity">Connect</span>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#cf4b00] transition-colors">
             <img src="images/message-reply.svg" className="w-4 " alt="Chat" />
          </div>
        </button>
      </div>

      <nav className="headerNav fixed top-0 left-0 w-full lg:w-[450px] h-[100dvh] bg-black/95 backdrop-blur-[40px] border-r border-white/5 p-12 lg:p-24 flex flex-col justify-center shadow-[20px_0_50px_rgba(0,0,0,0.8)] -translate-x-full opacity-0">
        <div className="absolute top-8 right-8 lg:right-12">
          <button onClick={toggleMenu} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <span className="text-[10px]">✕</span>
          </button>
        </div>

        <p className="text-[10px] tracking-[1em] text-white/60 mb-12 uppercase">Navigation System</p>
        <ul className="space-y-10 w-[300px]">

{['Home', 'Gallery', 'About', 'Models', 'Models Explorer', 'Events'].map((item) => {
  let href = "/";
  
  if (item === "Models Explorer") {
    href = "/Models";
  } else if (item !== "Home") {
    // We use a query param instead of a hash for cleaner control
    const sectionId = item.toLowerCase().replace(/\s+/g, '-');
    href = `/?scroll=${sectionId}`;
  }

  return (
    <li key={item} className="nav-link-item group overflow-hidden">
      <Link 
        href={href} 
        onClick={toggleMenu} // Just close menu and let Link handle the route
        className="block cursor-pointer"
      >
        <span className="block text-3xl lg:text-4xl w-fit font-black italic tracking-tighter transition-all duration-500 group-hover:text-[#cf4b00] group-hover:translate-x-4 uppercase">
          {item}
        </span>
      </Link>
    </li>
  );
})}
        </ul>
      </nav>

      <aside className="contactUs fixed top-0 right-0 w-full lg:w-[400px] h-[100dvh] bg-black/90 backdrop-blur-[30px] border-l border-white/5 p-8 lg:p-12 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.8)] translate-x-full opacity-0 overflow-hidden">
        <div className="flex justify-between items-center mb-12 chat-anim overflow-hidden">
          <div className="flex flex-col">
            <h2 className="text-xs tracking-[0.5em] font-bold text-white/80 uppercase">Assistant</h2>
            <p className="text-[10px] text-[#cf4b00] animate-pulse uppercase">Online</p>
          </div>
          <button onClick={toggleContact} className="w-10 h-10  rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <span className="text-[10px]">✕</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 pr-4 chat-anim scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col overflow-hidden h-auto ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="text-[8px] mb-2 uppercase tracking-widest opacity-30 font-mono">
                {msg.role === 'user' ? '// Client' : '// System'}
              </div>
              <div className={`p-4 text-[11px] tracking-wide leading-relaxed max-w-[90%] border ${
                msg.role === 'user' 
                ? 'bg-white text-black border-white' 
                : 'bg-white/5 text-white/70 border-white/10 backdrop-blur-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="mt-8 chat-anim">
          <div className="relative border-b border-white/60  focus-within:border-[#cf4b00] transition-colors ">
            <textarea 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
              placeholder="INPUT MESSAGE..."
              className="w-full bg-transperant outline-none text-[10px] tracking-[0.3em] resize-none  uppercase placeholder:opacity-80"
            />
            <button onClick={handleSendMessage} className="absolute right-[-20px] opacity-30 hover:opacity-100 transition-opacity">
                <img src="images/send.svg" className="w-4 invert" alt="Send" />
            </button>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Header;