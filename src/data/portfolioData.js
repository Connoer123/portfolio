// keeps all editable portfolio copy and media paths in one place
export const portfolioData = {
  name: "CONNIE CHEN",
  role: "Engineer & Designer",
  email: "chenconnie53@gamil.com",
  linkedin: "https://www.linkedin.com/in/connie-chen-2b1a5631a",
  about: {
    location: "Toronto, Canada",
    school: "University of Toronto",
    program: "Computer and Electrical Engineering",
    focus: "System Design Engineering, software",
    bio: "I’m a Computer Engineering student with an interest in how software and hardware come together to create meaningful user experiences. I work across areas like PCB design, embedded systems, and FPGA based development, building end to end systems where signals, computation, and interaction are tightly integrated. I’m particularly drawn to systems with clear visual or physical feedback, where engineering decisions directly shape how something responds and feels to use. I approach problems from a systems perspective, thinking through timing, data flow, and user interaction together, and I’m interested in how principles from human perception and psychology can inform the design of more intuitive, responsive technology."
  },
  projects: [
    {
      id: "fpga",
      year: "2025",
      title: "FPGA-BASED MULTIPLAYER QUIZ GAME",
      skills: ["Verilog", "FSM Architecture", "VGA Graphics", "Digital Audio Interfacing", "Python Scripting"],
      points: [
        "Developed a real-time FPGA application in Verilog, using a modular, FSM-based architecture to coordinate gameplay flow.",
        "Implemented VGA graphics and audio output pipelines, rendering multiple game screens via ROM-based frame storage.",
        "Automated image and audio asset generation using Python scripting, converting media into .mif files.",
        "Debugged complex timing, memory, and integration issues across hardware and software boundaries."
      ],
      media: [
        { type: "image", src: "/assets/projects/fpga/fpga-1.jpeg" },
        { type: "image", src: "/assets/projects/fpga/fpga-2.jpeg" },
        { type: "image", src: "/assets/projects/fpga/fpga-3.jpeg" },
        { type: "image", src: "/assets/projects/fpga/fpga-4.jpeg" },
        { type: "video", src: "/assets/projects/fpga/fpga-demo.mov" }
      ]
    },
    {
      id: "robot",
      year: "2025",
      title: "AUTONOMOUS ARDUINO ROBOT",
      skills: ["C/C++", "Ultrasonic Sensors", "PID Control", "Motor Control"],
      points: [
        "Developed an autonomous Arduino-based robot in C/C++, integrating ultrasonic, colour, servo, and DC motor systems.",
        "Designed and debugged closed-loop motor control logic in C/C++, improving system responsiveness.",
        "Engineered a custom center-finding algorithm using timing-based geometry."
      ],
      achievement: "UTRAHacks 1st Place - University of Toronto Robotics Association Hackathon",
      media: [
        { type: "image", src: "/assets/projects/robot/robot-1.jpeg" },
        { type: "image", src: "/assets/projects/robot/robot-2.png" },
        { type: "image", src: "/assets/projects/robot/robot-3.jpeg" },
        { type: "image", src: "/assets/projects/robot/robot-4.jpeg" }
      ]
    },
    {
      id: "praxis-ii",
      year: "2025",
      title: "ENGINEERING DESIGN PRAXIS II",
      skills: ["Human-Centered Design", "Structural Analysis", "Prototyping", "Design Frameworks"],
      points: [
        "Explored real-world engineering problems through hands-on design projects, including structural design, product design, and human-centered systems.",
        "Applied structured design frameworks to move from messy ideas to clear, testable solutions grounded in real constraints.",
        "Balanced creative thinking with technical analysis, using calculations, prototyping, and iteration to justify design decisions."
      ],
      pdf: "/assets/documents/engineering-design-portfolio-connie-chen.pdf",
      media: [
        { type: "image", src: "/assets/projects/praxis/praxis-1.jpeg" },
        { type: "image", src: "/assets/projects/praxis/praxis-2.png" }
      ]
    },
    {
      id: "physics-modelling",
      year: "2024",
      title: "DAMPED HARMONIC MOTION MODELLING - PHY180",
      skills: ["Python", "Video Motion Tracking", "Data Analysis", "Structural Physics"],
      points: [
        "Designed and conducted a multi-stage experimental study on damped harmonic motion using a physical pendulum, investigating how period, amplitude decay, and energy dissipation vary with release angle and string length.",
        "Modeled pendulum behavior using quadratic, exponential, and radical fits, validating theoretical relationships between period, length, and damping through uncertainty-aware data analysis.",
        "Applied video motion tracking (Tracker) and Python-based curve fitting to extract oscillation peaks, quantify amplitude decay, and compute the system’s quality factor (Q)."
      ],
      media: [
        { type: "image", src: "/assets/projects/physics/physics-1.png" },
        { type: "image", src: "/assets/projects/physics/physics-2.png" },
        { type: "image", src: "/assets/projects/physics/physics-3.png" },
        { type: "image", src: "/assets/projects/physics/physics-4.png" },
        { type: "image", src: "/assets/projects/physics/physics-5.png" }
      ]
    },
    {
      id: "bridge",
      year: "2024",
      title: "MATBOARD BRIDGE DESIGN - CIV102",
      skills: ["Structural Analysis", "Beam Theory", "Material Optimization"],
      points: [
        "Designed and iteratively optimized a matboard HSS bridge, improving compression and buckling performance.",
        "Applied beam theory and factor-of-safety analysis to guide structural decisions under material constraints.",
        "Collaborated on design, analysis, and final construction in a team-based engineering project."
      ],
      media: [
        { type: "image", src: "/assets/projects/bridge/bridge-1.jpeg" },
        { type: "image", src: "/assets/projects/bridge/bridge-2.jpeg" }
      ]
    },
    {
      id: "snake",
      year: "2023",
      title: "HUNGRY SNAKE: JAVA",
      skills: ["Java Swing/AWT", "OOP Design", "Data Structures", "2D Rendering"],
      points: [
        "Built an interactive Java Snake game using Swing/AWT with real-time input handling.",
        "Applied object-oriented design and ArrayList data structures.",
        "Created all artwork by hand, integrating custom-drawn visuals into the game."
      ],
      media: [
        { type: "image", src: "/assets/projects/snake/snake-1.jpeg" },
        { type: "image", src: "/assets/projects/snake/snake-2.jpeg" },
        { type: "image", src: "/assets/projects/snake/snake-3.jpeg" }
      ]
    }
  ]
};
