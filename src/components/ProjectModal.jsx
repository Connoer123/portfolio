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
      className="fixed inset-0 z-[2000] bg-white overflow-y-auto p-12 md:p-24"
    >
      <button onClick={onClose} className="fixed top-12 right-12 hover:rotate-90 transition-transform z-10">
        <X size={48} />
      </button>

      <div className="max-w-5xl mx-auto">
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/30 mb-4 block">{project.year}</span>
        <h1 className="text-6xl md:text-8xl font-bold mb-12 tracking-tighter uppercase">{project.title}</h1>

        <div className="relative w-full aspect-video mb-20 group">
          <GlassPanel asElement="div" className="w-full h-full rounded-[40px] overflow-hidden flex items-center justify-center bg-neutral-100">
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
            <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
              <button onClick={prevMedia} className="p-4 bg-white/90 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors pointer-events-auto">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextMedia} className="p-4 bg-white/90 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors pointer-events-auto">
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-10">
            {project.points.map((pt, i) => (
              <div key={pt} className="flex gap-6">
                <span className="text-xs font-mono text-black/20">0{i + 1}</span>
                <p className="text-lg font-light leading-relaxed text-black/70">{pt}</p>
              </div>
            ))}

            {project.pdf && (
              <div className="pt-6">
                <GlassPanel
                  asElement="a"
                  href={project.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
                >
                  <FileText size={20} className="text-black/70" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Check the Portfolio</span>
                  <ExternalLink size={14} className="opacity-30 text-black" />
                </GlassPanel>
              </div>
            )}
          </div>

          <div className="space-y-12">
            <GlassPanel asElement="div" className="p-10 rounded-3xl">
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
              <GlassPanel asElement="div" className="p-10 rounded-3xl bg-black text-white">
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
