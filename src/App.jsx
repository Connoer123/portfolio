import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  X,
  Mail,
  Linkedin,
  ChevronRight,
  ChevronLeft,
  MapPin,
  GraduationCap,
  Code,
  FileText,
  ExternalLink
} from 'lucide-react';
import HeroScene from './HeroScene';

// --- DATA: CORE CONTENT ---
const DATA = {
  name: "CONNIE CHEN",
  role: "Engineer & Designer",
  email: "chenconnie53@gamil.com",
  linkedin: "https://www.linkedin.com/in/connie-chen-2b1a5631a",
  about: {
    location: "Toronto, Canada",
    school: "University of Toronto",
    program: "Computer and Electrical Engineering",
    focus: "System Design Engineering, software",
    bio: "I'm a Computer Engineering student with a creative edge and a strong technical foundation. I'm interested in the intersection of engineering, design, and human experience, and I enjoy turning ideas into practical, well-thought-out systems through hands-on projects. In my free time, I'm interested in psychology and spend a lot of time reading books and learning about how people think and behave."
  },
  projects: [
    {
      id: 'fpga',
      year: '2025',
      title: 'FPGA-BASED MULTIPLAYER QUIZ GAME',
      skills: ['Verilog', 'FSM Architecture', 'VGA Graphics', 'Digital Audio Interfacing', 'Python Scripting'],
      points: [
        "Developed a real-time FPGA application in Verilog, using a modular, FSM-based architecture to coordinate gameplay flow.",
        "Implemented VGA graphics and audio output pipelines, rendering multiple game screens via ROM-based frame storage.",
        "Automated image and audio asset generation using Python scripting, converting media into .mif files.",
        "Debugged complex timing, memory, and integration issues across hardware and software boundaries."
      ],
      media: [
        { type: 'image', src: '/fpga1.jpeg' },
        { type: 'image', src: '/fpga2.jpeg' },
        { type: 'image', src: '/fpga3.jpeg' },
        { type: 'image', src: '/fpga4.jpeg' },
        { type: 'video', src: '/fpga.mov' }
      ]
    },
    {
      id: 'robot',
      year: '2025',
      title: 'AUTONOMOUS ARDUINO ROBOT',
      skills: ['C/C++', 'Ultrasonic Sensors', 'PID Control', 'Motor Control'],
      points: [
        "Developed an autonomous Arduino-based robot in C/C++, integrating ultrasonic, colour, servo, and DC motor systems.",
        "Designed and debugged closed-loop motor control logic in C/C++, improving system responsiveness.",
        "Engineered a custom center-finding algorithm using timing-based geometry."
      ],
      achievement: "UTRAHacks 1st Place - University of Toronto Robotics Association Hackathon",
      media: [
        { type: 'image', src: '/utra1.jpeg' },
        { type: 'image', src: '/utra2.png' },
        { type: 'image', src: '/utra3.jpeg' },
        { type: 'image', src: '/utra4.jpeg' }
      ]
    },
    {
      id: 'praxis-ii',
      year: '2025',
      title: 'ENGINEERING DESIGN PRAXIS II',
      skills: ['Human-Centered Design', 'Structural Analysis', 'Prototyping', 'Design Frameworks'],
      points: [
        "Explored real-world engineering problems through hands-on design projects, including structural design, product design, and human-centered systems.",
        "Applied structured design frameworks to move from messy ideas to clear, testable solutions grounded in real constraints.",
        "Balanced creative thinking with technical analysis, using calculations, prototyping, and iteration to justify design decisions."
      ],
      pdf: "/Engineering_Design_Portfolio_Connie_Chen (1).pdf",
      media: [
        { type: 'image', src: '/praxis1.jpeg' },
        { type: 'image', src: '/praxis2.png' }
      ]
    },
    {
      id: 'physics-modelling',
      year: '2024',
      title: 'DAMPED HARMONIC MOTION MODELLING - PHY180',
      skills: ['Python', 'Video Motion Tracking', 'Data Analysis', 'Structural Physics'],
      points: [
        "Designed and conducted a multi-stage experimental study on damped harmonic motion using a physical pendulum, investigating how period, amplitude decay, and energy dissipation vary with release angle and string length.",
        "Modeled pendulum behavior using quadratic, exponential, and radical fits, validating theoretical relationships between period, length, and damping through uncertainty-aware data analysis.",
        "Applied video motion tracking (Tracker) and Python-based curve fitting to extract oscillation peaks, quantify amplitude decay, and compute the system’s quality factor (Q)."
      ],
      media: [
        { type: 'image', src: '/phy1.png' },
        { type: 'image', src: '/phy2.png' },
        { type: 'image', src: '/phy3.png' },
        { type: 'image', src: '/phy4.png' },
        { type: 'image', src: '/phy5.png' }
      ]
    },
    {
      id: 'bridge',
      year: '2024',
      title: 'MATBOARD BRIDGE DESIGN - CIV102',
      skills: ['Structural Analysis', 'Beam Theory', 'Material Optimization'],
      points: [
        "Designed and iteratively optimized a matboard HSS bridge, improving compression and buckling performance.",
        "Applied beam theory and factor-of-safety analysis to guide structural decisions under material constraints.",
        "Collaborated on design, analysis, and final construction in a team-based engineering project."
      ],
      media: [
        { type: 'image', src: '/bridge1.jpeg' },
        { type: 'image', src: '/bridge2.jpeg' }
      ]
    },
    {
      id: 'snake',
      year: '2023',
      title: 'HUNGRY SNAKE: JAVA',
      skills: ['Java Swing/AWT', 'OOP Design', 'Data Structures', '2D Rendering'],
      points: [
        "Built an interactive Java Snake game using Swing/AWT with real-time input handling.",
        "Applied object-oriented design and ArrayList data structures.",
        "Created all artwork by hand, integrating custom-drawn visuals into the game."
      ],
      media: [
        { type: 'image', src: '/java1.jpeg' },
        { type: 'image', src: '/java2.jpeg' },
        { type: 'image', src: '/java3.jpeg' }
      ]
    }
  ]
};

const AppleGlass = ({ children, className, onClick, isPrimary = false, asElement = "button", type = "button", ...rest }) => {
  const Component = motion[asElement] || motion.button;
  return (
    <Component
      type={asElement === "button" ? type : undefined}
      whileHover={asElement === "button" || asElement === "a" ? { scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.4)" } : {}}
      whileTap={asElement === "button" || asElement === "a" ? { scale: 0.99 } : {}}
      onClick={onClick}
      className={`
        relative overflow-hidden transition-all duration-300
        backdrop-blur-[30px] bg-white/30
        border border-white/40
        shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
        ${isPrimary ? 'bg-black/80 text-white border-white/20' : 'text-black'}
        ${className}
      `}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default function Portfolio() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedWork, setSelectedWork] = useState(null);
  const [status, setStatus] = useState("");
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.98]);

  useEffect(() => {
    const timer = setTimeout(() => setIsSceneLoaded(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  const next = () => setActiveIdx((prev) => (prev + 1) % DATA.projects.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + DATA.projects.length) % DATA.projects.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Success!");
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* STICKY BLURRED NAVIGATION BAR */}
      <AnimatePresence>
        {isSceneLoaded && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-0 left-0 w-full px-12 py-6 flex justify-between items-center z-[100] backdrop-blur-md bg-white/60 border-b border-black/5"
          >
            {/* LOGO "C" + NAME BLEND */}
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="cursor-pointer flex items-center gap-1 group"
            >
              <img src="/logo.PNG" alt="Logo" className="h-8 w-auto invert group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase transition-opacity">onnie Chen</span>
            </button>

            <div className="flex gap-4">
              {['About', 'Projects', 'Contact'].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-1 text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <main>
        {/* HERO SECTION */}
        <motion.section style={{ opacity: heroOpacity, scale: heroScale }} id="hero" className="relative h-screen flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <HeroScene onLoaded={() => setIsSceneLoaded(true)} />
          </div>
          
          <AnimatePresence>
            {isSceneLoaded && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative z-10 mt-[150px]"
              >
                <AppleGlass
                  className="px-12 py-4 rounded-full"
                  onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Explore</span>
                </AppleGlass>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* ABOUT */}
        <section id="about" className="max-w-7xl mx-auto px-12 py-40 min-h-screen flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-[10px] font-black tracking-[0.5em] uppercase text-black/30 mb-8 underline decoration-black/10 underline-offset-8">
                Introduction
              </h2>
              <h3 className="text-6xl font-bold tracking-tighter mb-12 leading-[0.9]">
                Engineering better <br />human experiences.
              </h3>
              <p className="text-xl text-black/60 leading-relaxed font-light mb-12 max-w-xl italic">
                "{DATA.about.bio}"
              </p>

              <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-12">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-black/40 flex items-center gap-2">
                    <MapPin size={10} /> Location
                  </span>
                  <p className="text-sm font-medium">{DATA.about.location}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-black/40 flex items-center gap-2">
                    <GraduationCap size={10} /> Institution
                  </span>
                  <p className="text-sm font-medium">{DATA.about.school}</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <AppleGlass asElement="div" className="w-[380px] h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/about_me.jpeg"
                  alt="About me"
                  className="w-full h-full object-cover"
                />
              </AppleGlass>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-40 bg-neutral-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-12 mb-20 flex justify-between items-center">
            <h2 className="text-5xl font-bold tracking-tighter uppercase">Projects</h2>
            <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest">Engineering Projects Gallery</p>
          </div>

          <div className="relative h-[600px] flex items-center justify-center perspective-[2000px]">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between w-full px-20 z-[100] pointer-events-none">
              <button onClick={prev} className="p-6 bg-white/80 border border-black/5 rounded-full hover:bg-black hover:text-white transition-all pointer-events-auto"><ChevronLeft size={24} /></button>
              <button onClick={next} className="p-6 bg-white/80 border border-black/5 rounded-full hover:bg-black hover:text-white transition-all pointer-events-auto"><ChevronRight size={24} /></button>
            </div>

            <div className="relative w-full flex items-center justify-center">
              {DATA.projects.map((proj, idx) => {
                const offset = idx - activeIdx;
                return (
                  <motion.div
                    key={proj.id}
                    animate={{
                      rotateY: -15,
                      x: offset * 340,
                      z: -Math.abs(offset) * 150,
                      opacity: offset === 0 ? 1 : 0.3,
                      scale: offset === 0 ? 1 : 0.85
                    }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    onClick={() => offset === 0 && setSelectedWork(proj)}
                    className={`absolute group w-[320px] h-[450px] rounded-[30px] p-10 flex flex-col justify-between cursor-pointer backdrop-blur-[40px] bg-white/50 border border-white/60 shadow-xl ${offset === 0 ? 'z-50' : 'z-0'}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase">{proj.year}</span>
                      <Code size={16} className="opacity-20" />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold leading-[0.95] uppercase tracking-tighter text-black/90 group-hover:text-black transition-colors">
                            {proj.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                             {proj.skills.map(s => (
                                <span key={s} className="text-[8px] font-bold border border-black/10 px-2 py-1 rounded-full uppercase tracking-tighter">{s}</span>
                             ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-black/5">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40 group-hover:text-black transition-colors">View Project Details →</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="max-w-7xl mx-auto px-12 py-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
              <h2 className="text-8xl font-bold tracking-tighter uppercase mb-6">Contact</h2>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/40 mb-12">
                Have any concerns or just want to chat? Say it here.
              </p>
              <div className="space-y-4">
                <AppleGlass asElement="a" href={`mailto:${DATA.email}`} className="flex items-center gap-6 p-6 rounded-2xl group">
                  <Mail size={18} />
                  <span className="font-mono text-xs uppercase tracking-widest text-black/60">{DATA.email}</span>
                </AppleGlass>
                <AppleGlass asElement="a" href={DATA.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-6 p-6 rounded-2xl group">
                  <Linkedin size={18} />
                  <span className="font-mono text-xs uppercase tracking-widest text-black/60">LinkedIn Profile</span>
                </AppleGlass>
              </div>
            </div>

            <AppleGlass asElement="form" onSubmit={handleSubmit} className="space-y-8 p-12 rounded-[40px]">
              <div className="grid grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="w-full bg-transparent border-b border-black/10 p-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black" />
                <input type="text" placeholder="Last Name" className="w-full bg-transparent border-b border-black/10 p-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-black/10 p-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black" />
              <textarea placeholder="Your Message" className="w-full bg-transparent border-b border-black/10 p-4 h-32 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black resize-none" />
              <button type="submit" className="w-full bg-black text-white py-6 rounded-2xl text-[10px] font-black tracking-[0.5em] uppercase hover:scale-[1.02] transition-transform">Send Inquiry</button>
              {status && <p className="text-[10px] font-mono uppercase tracking-widest text-green-600">{status}</p>}
            </AppleGlass>
          </div>
        </section>
      </main>

      {/* MINIMALIST FOOTER - 2026 */}
      <footer className="w-full py-16 px-12 border-t border-black/5 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-black/40">
            © 2026 Connie Chen
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              "React",
              "Tailwind CSS",
              "Framer Motion",
              "Spline",
              "Figma",
              "Lucide Icons"
            ].map((tool) => (
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
          <ProjectModal project={selectedWork} onClose={() => setSelectedWork(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const [currentMedia, setCurrentMedia] = useState(0);
  const media = project.media || [];
  const item = media[currentMedia];

  const nextMedia = () => setCurrentMedia((prev) => (prev + 1) % media.length);
  const prevMedia = () => setCurrentMedia((prev) => (prev - 1 + media.length) % media.length);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] bg-white overflow-y-auto p-12 md:p-24"
    >
      <button onClick={onClose} className="fixed top-12 right-12 hover:rotate-90 transition-transform z-10"><X size={48} /></button>

      <div className="max-w-5xl mx-auto">
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/30 mb-4 block">{project.year}</span>
        <h1 className="text-6xl md:text-8xl font-bold mb-12 tracking-tighter uppercase">{project.title}</h1>

        <div className="relative w-full aspect-video mb-20 group">
          <AppleGlass asElement="div" className="w-full h-full rounded-[40px] overflow-hidden flex items-center justify-center bg-neutral-100">
            {!item ? (
              <div className="text-black/30">No media found.</div>
            ) : item.type === 'video' ? (
              <video
                key={item.src}
                src={item.src}
                controls={true}
                playsInline
                className="w-full h-full object-contain z-10"
              />
            ) : (
              <img
                src={item.src}
                alt={project.title}
                className="w-full h-full object-contain transition-opacity duration-500"
              />
            )}
          </AppleGlass>

          {media.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
              <button onClick={prevMedia} className="p-4 bg-white/90 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors pointer-events-auto"><ChevronLeft size={24} /></button>
              <button onClick={nextMedia} className="p-4 bg-white/90 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors pointer-events-auto"><ChevronRight size={24} /></button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-10">
            {project.points.map((pt, i) => (
              <div key={i} className="flex gap-6">
                <span className="text-xs font-mono text-black/20">0{i + 1}</span>
                <p className="text-lg font-light leading-relaxed text-black/70">{pt}</p>
              </div>
            ))}

            {project.pdf && (
                <div className="pt-6">
                    <AppleGlass 
                        asElement="a" 
                        href={project.pdf} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
                    >
                        <FileText size={20} className="text-black/70" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Check the Portfolio</span>
                        <ExternalLink size={14} className="opacity-30 text-black" />
                    </AppleGlass>
                </div>
            )}
          </div>

          <div className="space-y-12">
            <AppleGlass asElement="div" className="p-10 rounded-3xl">
              <h4 className="text-[10px] font-black tracking-widest uppercase mb-8">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.skills.map(s => (
                  <span key={s} className="px-4 py-2 border border-black/10 rounded-full text-[9px] font-bold uppercase">{s}</span>
                ))}
              </div>
            </AppleGlass>

            {project.achievement && (
              <AppleGlass asElement="div" className="p-10 rounded-3xl bg-black text-white">
                <h4 className="text-[10px] font-black tracking-widest uppercase mb-4 opacity-50">Achievement</h4>
                <p className="text-sm font-medium">{project.achievement}</p>
              </AppleGlass>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}