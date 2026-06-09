import { motion } from "framer-motion";

export default function GlassPanel({
  children,
  className = "",
  onClick,
  isPrimary = false,
  asElement = "button",
  type = "button",
  ...rest
}) {
  // lets the same glass style work as a button, link, form, or plain wrapper
  const Component = motion[asElement] || motion.button;
  const isInteractive = asElement === "button" || asElement === "a";

  return (
    <Component
      type={asElement === "button" ? type : undefined}
      whileHover={isInteractive ? { scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.4)" } : {}}
      whileTap={isInteractive ? { scale: 0.99 } : {}}
      onClick={onClick}
      className={`
        relative overflow-hidden transition-all duration-300
        backdrop-blur-[30px] bg-white/30
        border border-white/40
        shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
        ${isPrimary ? "bg-black/80 text-white border-white/20" : "text-black"}
        ${className}
      `}
      {...rest}
    >
      {children}
    </Component>
  );
}
