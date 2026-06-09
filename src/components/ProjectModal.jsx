import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, FileText, X } from "lucide-react";
import GlassPanel from "./GlassPanel";

const MotionDiv = motion.div;

export default function ProjectModal({ project, onClose }) {
  // keeps track of which image or video is showing
  const [currentMedia, setCurrentMedia] = useState(0);

  // not every project has the same amount of media
  const media = project.media || [];
  const item = media[currentMedia];

  // moves between project images and videos
  const nextMedia = () => setCurrentMedia((prev) => (prev + 1) % media.length);
  const prevMedia = () => setCurrentMedia((prev) => (prev - 1 + media.length) % media.length);

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] bg-white overflow-y-auto px-5 py-20 sm:p-10 md:p-16 lg:p-24"
    >
      <button onClick={onClose} className="fixed top-5 right-5 sm:top-10 sm:right-10 lg:top-12 lg:right-12 p-2 bg-white/80 rounded-full backdrop-blur-md hover:rotate-90 transition-transform z-10">
        <X size={32} />
      </button>

      <div className="max-w-5xl mx-auto">
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/30 mb-4 block">{project.year}</span>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-10 sm:mb-12 tracking-tighter uppercase leading-[0.95]">{project.title}</h1>

        <div className="relative w-full aspect-[4/3] sm:aspect-video mb-12 sm:mb-20 group">
          <GlassPanel asElement="div" className="w-full h-full rounded-[24px] sm:rounded-[40px] overflow-hidden flex items-center justify-center bg-neutral-100">
            {!item ? (
              <div className="text-black/30">No media found.</div>
            ) : item.type === "video" ? (
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
          </GlassPanel>

          {media.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-3 sm:px-6 pointer-events-none">
              <button onClick={prevMedia} className="p-3 sm:p-4 bg-white/90 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors pointer-events-auto">
                <ChevronLeft size={22} />
              </button>
              <button onClick={nextMedia} className="p-3 sm:p-4 bg-white/90 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors pointer-events-auto">
                <ChevronRight size={22} />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div className="space-y-8 sm:space-y-10">
            {project.points.map((pt, i) => (
              <div key={pt} className="flex gap-4 sm:gap-6">
                <span className="text-xs font-mono text-black/20">0{i + 1}</span>
                <p className="text-base sm:text-lg font-light leading-relaxed text-black/70">{pt}</p>
              </div>
            ))}

            {project.pdf && (
              <div className="pt-6">
                <GlassPanel
                  asElement="a"
                  href={project.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full items-center gap-3 sm:gap-4 px-6 sm:px-10 py-5 rounded-2xl hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
                >
                  <FileText size={20} className="text-black/70" />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.22em] sm:tracking-[0.3em] text-black">Check the Portfolio</span>
                  <ExternalLink size={14} className="opacity-30 text-black" />
                </GlassPanel>
              </div>
            )}
          </div>

          <div className="space-y-8 sm:space-y-12">
            <GlassPanel asElement="div" className="p-7 sm:p-10 rounded-3xl">
              <h4 className="text-[10px] font-black tracking-widest uppercase mb-8">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 border border-black/10 rounded-full text-[9px] font-bold uppercase">
                    {skill}
                  </span>
                ))}
              </div>
            </GlassPanel>

            {project.achievement && (
              <GlassPanel asElement="div" className="p-7 sm:p-10 rounded-3xl bg-black text-white">
                <h4 className="text-[10px] font-black tracking-widest uppercase mb-4 opacity-50">Achievement</h4>
                <p className="text-sm font-medium">{project.achievement}</p>
              </GlassPanel>
            )}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
