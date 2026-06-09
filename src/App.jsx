import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Code, GraduationCap, Linkedin, Mail, MapPin } from "lucide-react";
import GlassPanel from "./components/GlassPanel";
import HeroScene from "./components/HeroScene";
import ProjectModal from "./components/ProjectModal";
import { portfolioData } from "./data/portfolioData";

const MotionNav = motion.nav;
const MotionSection = motion.section;
const MotionDiv = motion.div;

export default function Portfolio() {
  // keeps track of which project card is in the middle
  const [activeIdx, setActiveIdx] = useState(0);

  // this stores the project that is open in the popup
  const [selectedWork, setSelectedWork] = useState(null);

  // this shows the message after the contact form is submitted
  const [status, setStatus] = useState("");

  // this waits for the 3d scene before showing the main content
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);

  // this keeps the project carousel spacing comfortable on phones and desktops
  const [isMobile, setIsMobile] = useState(false);

  // this makes the hero fade out a little when scrolling
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.98]);

  // fallback timer in case the 3d scene takes long to load
  useEffect(() => {
    const timer = setTimeout(() => setIsSceneLoaded(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateCarouselMode = () => setIsMobile(mediaQuery.matches);

    updateCarouselMode();
    mediaQuery.addEventListener("change", updateCarouselMode);
    return () => mediaQuery.removeEventListener("change", updateCarouselMode);
  }, []);

  const carouselGap = isMobile ? 245 : 340;

  // moves the project carousel
  const next = () => setActiveIdx((prev) => (prev + 1) % portfolioData.projects.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + portfolioData.projects.length) % portfolioData.projects.length);

  // fake submit for now
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Success!");
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <AnimatePresence>
        {isSceneLoaded && (
          // nav only appears after the scene loads
          <MotionNav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-0 left-0 w-full px-4 py-4 sm:px-8 lg:px-12 lg:py-6 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center z-[100] backdrop-blur-md bg-white/75 border-b border-black/5"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cursor-pointer flex items-center gap-1 group"
            >
              <img
                src="/assets/brand/logo.png"
                alt="Logo"
                className="h-8 w-auto invert group-hover:scale-110 transition-transform"
              />
              <span className="text-xs font-bold tracking-[0.2em] uppercase transition-opacity">onnie Chen</span>
            </button>

            <div className="flex gap-1 sm:gap-4">
              {/* makes the nav links from this list */}
              {["About", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-3 py-1 text-[9px] sm:px-4 sm:text-[10px] font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
                >
                  {item}
                </a>
              ))}
            </div>
          </MotionNav>
        )}
      </AnimatePresence>

      <main>
        <MotionSection
          style={{ opacity: heroOpacity, scale: heroScale }}
          id="hero"
          className="relative min-h-[100svh] flex flex-col items-center justify-center text-center"
        >
          <div className="absolute inset-0 z-0">
            {/* 3d background */}
            <HeroScene onLoaded={() => setIsSceneLoaded(true)} />
          </div>

          <AnimatePresence>
            {isSceneLoaded && (
              <MotionDiv
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative z-10 mt-[120px] sm:mt-[150px]"
              >
                <GlassPanel
                  className="px-9 py-4 sm:px-12 rounded-full"
                  onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
                >
                  <span className="text-[10px] font-bold tracking-[0.32em] sm:tracking-[0.4em] uppercase">Explore</span>
                </GlassPanel>
              </MotionDiv>
            )}
          </AnimatePresence>
        </MotionSection>

        <section id="about" className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40 lg:min-h-screen flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-[10px] font-black tracking-[0.36em] sm:tracking-[0.5em] uppercase text-black/30 mb-6 sm:mb-8 underline decoration-black/10 underline-offset-8">
                Introduction
              </h2>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 sm:mb-12 leading-[1.05]">
                From Signals to Interaction
              </h3>
              <p className="text-sm sm:text-base text-black/60 leading-relaxed font-light mb-10 sm:mb-12 max-w-xl">
                "{portfolioData.about.bio}"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 border-t border-black/10 pt-10 sm:pt-12">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-black/40 flex items-center gap-2">
                    <MapPin size={10} /> Location
                  </span>
                  <p className="text-sm font-medium">{portfolioData.about.location}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-black/40 flex items-center gap-2">
                    <GraduationCap size={10} /> Institution
                  </span>
                  <p className="text-sm font-medium">{portfolioData.about.school}</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <GlassPanel asElement="div" className="w-full max-w-[320px] sm:max-w-[380px] h-[420px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/profile/about-me.jpg"
                  alt="About me"
                  className="w-full h-full object-cover"
                />
              </GlassPanel>
            </div>
          </div>
        </section>

        <section id="projects" className="py-24 sm:py-32 lg:py-40 bg-neutral-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-12 sm:mb-20 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter uppercase">Projects</h2>
            <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest">Engineering Projects Gallery</p>
          </div>

          <div className="relative h-[560px] sm:h-[600px] flex items-center justify-center perspective-[2000px]">
            <div className="absolute inset-x-0 bottom-0 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 flex justify-between w-full px-6 sm:px-12 lg:px-20 z-[100] pointer-events-none">
              <button onClick={prev} className="p-4 sm:p-6 bg-white/85 border border-black/5 rounded-full hover:bg-black hover:text-white transition-all pointer-events-auto shadow-sm">
                <ChevronLeft size={22} />
              </button>
              <button onClick={next} className="p-4 sm:p-6 bg-white/85 border border-black/5 rounded-full hover:bg-black hover:text-white transition-all pointer-events-auto shadow-sm">
                <ChevronRight size={22} />
              </button>
            </div>

            <div className="relative w-full flex items-center justify-center">
              {/* each project becomes one card in the carousel */}
              {portfolioData.projects.map((project, idx) => {
                // offset tells each card how far it is from the center card
                const offset = idx - activeIdx;
                return (
                  <MotionDiv
                    key={project.id}
                    animate={{
                      rotateY: -15,
                      x: offset * carouselGap,
                      z: -Math.abs(offset) * 150,
                      opacity: offset === 0 ? 1 : 0.3,
                      scale: offset === 0 ? 1 : 0.85
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    onClick={() => offset === 0 && setSelectedWork(project)}
                    className={`absolute group w-[min(82vw,320px)] h-[430px] sm:h-[450px] rounded-[24px] sm:rounded-[30px] p-7 sm:p-10 flex flex-col justify-between cursor-pointer backdrop-blur-[40px] bg-white/50 border border-white/60 shadow-xl ${offset === 0 ? "z-50" : "z-0"}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase">{project.year}</span>
                      <Code size={16} className="opacity-20" />
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-2xl sm:text-3xl font-bold leading-[0.98] sm:leading-[0.95] uppercase tracking-tighter text-black/90 group-hover:text-black transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
                        {project.skills.map((skill) => (
                          <span key={skill} className="text-[8px] font-bold border border-black/10 px-2 py-1 rounded-full uppercase tracking-tighter">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-black/5">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40 group-hover:text-black transition-colors">
                        View Project Details →
                      </span>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-32">
            <div>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter uppercase mb-6">Contact</h2>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-black/40 mb-10 sm:mb-12">
                Have any concerns or just want to chat? Say it here.
              </p>
              <div className="space-y-4">
                <GlassPanel asElement="a" href={`mailto:${portfolioData.email}`} className="flex items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl group">
                  <Mail size={18} />
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-black/60 break-all">{portfolioData.email}</span>
                </GlassPanel>
                <GlassPanel asElement="a" href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl group">
                  <Linkedin size={18} />
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-black/60">LinkedIn Profile</span>
                </GlassPanel>
              </div>
            </div>

            <GlassPanel asElement="form" onSubmit={handleSubmit} className="space-y-7 sm:space-y-8 p-6 sm:p-10 lg:p-12 rounded-[28px] sm:rounded-[40px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="w-full bg-transparent border-b border-black/10 p-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black" />
                <input type="text" placeholder="Last Name" className="w-full bg-transparent border-b border-black/10 p-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-black/10 p-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black" />
              <textarea placeholder="Your Message" className="w-full bg-transparent border-b border-black/10 p-4 h-32 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black resize-none" />
              <button type="submit" className="w-full bg-black text-white py-6 rounded-2xl text-[10px] font-black tracking-[0.5em] uppercase hover:scale-[1.02] transition-transform">Send Inquiry</button>
              {status && <p className="text-[10px] font-mono uppercase tracking-widest text-green-600">{status}</p>}
            </GlassPanel>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 sm:py-16 px-5 sm:px-8 lg:px-12 border-t border-black/5 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-black/40">
            © 2026 Connie Chen
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["React", "Tailwind CSS", "Framer Motion", "Spline", "Figma", "Lucide Icons"].map((tool) => (
              <span key={tool} className="text-[8px] font-black tracking-[0.4em] uppercase text-black/20">
                {tool}
              </span>
            ))}
          </div>
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-black/40">
            Designed & Developed with Care
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedWork && (
          // opens when a project card is clicked
          <ProjectModal project={selectedWork} onClose={() => setSelectedWork(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
