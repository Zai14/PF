"use client";

/** Full-page shell: #MainDiv, #RightPanel (sections + legacy Main.js hooks), #LeftPanel, script loader. */
import "../styles/right-panel-sections.css";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import LeftPanelHero from "./LeftPanelHero";
import TechStackSection from "./tech-stack/TechStackSection";
import { SiteThemeProvider } from "./site-theme/SiteThemeProvider";

const SECTION_IDS = [
  "Section1",
  "Section2",
  "Section3",
  "Section4",
  "Section5",
] as const;

const SECTION_LABELS: Record<(typeof SECTION_IDS)[number], string> = {
  Section1: "Tech stack",
  Section2: "Projects",
  Section3: "Experience",
  Section4: "Accolades",
  Section5: "Education",
};

/** Top of `el` within `scroller`'s scroll coordinate system (offsetTop breaks when offsetParent ≠ scroller). */
function topWithinScroller(scroller: HTMLElement, el: HTMLElement): number {
  const sr = scroller.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  return scroller.scrollTop + (er.top - sr.top);
}

function scrollToSection(
  rightPanel: HTMLDivElement | null,
  sectionId: (typeof SECTION_IDS)[number],
) {
  const target = document.getElementById(sectionId);
  if (!target) return;
  const offset = window.innerHeight * 0.1;
  if (window.innerWidth > 1024 && rightPanel) {
    const top = topWithinScroller(rightPanel, target) - offset;
    rightPanel.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  } else {
    const y =
      target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }
}

function activeSectionId(
  rightPanel: HTMLDivElement | null,
): (typeof SECTION_IDS)[number] {
  const threshold = 150;
  const desktop = window.innerWidth > 1024 && rightPanel;

  if (desktop) {
    const y = rightPanel!.scrollTop + threshold;
    let i = SECTION_IDS.length;
    while (--i > 0) {
      const el = document.getElementById(SECTION_IDS[i]!);
      if (!el) continue;
      const top = topWithinScroller(rightPanel!, el);
      if (y >= top) return SECTION_IDS[i]!;
    }
    return SECTION_IDS[0]!;
  }

  const y = window.scrollY + threshold;
  let i = SECTION_IDS.length;
  while (--i > 0) {
    const el = document.getElementById(SECTION_IDS[i]!);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (y >= top) return SECTION_IDS[i]!;
  }
  return SECTION_IDS[0]!;
}

const LEGACY_SCRIPTS = [
  "/Scripts/ModelFiles.js",
  "/Scripts/RenderingFunctions.js",
  "/Scripts/TerminalFunction.js",
  "/Scripts/Main.js",
] as const;

let legacyScriptsLoading: Promise<void> | null = null;

const CACHE_BUST = `?v=${Date.now()}`;

type ProjectItem = {
  href: string;
  title: string;
  tech: string;
};

type ExperienceItem = {
  headline: string;
  text: string;
  href?: string;
};

type EducationItem = {
  school: string;
  degree: string;
  details: string[];
};

type AccoladeItem = {
  id: string;
  title: ReactNode;
  body: ReactNode;
};

const PROJECT_ITEMS: ProjectItem[] = [
  {
    href: "#",
    title: "Applekul One / GongulOS: AI Farm Management Platform",
    tech: "TypeScript React TensorFlow Supabase AWS | Private Company",
  },
  {
    href: "https://github.com/Zai14/Node-Link",
    title: "NodeLink / Kraken: Decentralized E2E Encrypted Messenger",
    tech: "JavaScript AES-GCM ECDH MetaMask Supabase GUN.js",
  },
  {
    href: "https://github.com/Zai14/AI-Powered-Medical-Diagnosis-System",
    title: "AI Medical Diagnosis System",
    tech: "Python Scikit-learn Streamlit",
  },
  {
    href: "https://github.com/Zai14/MagiskOnWSAScript",
    title: "Magisk on WSA: Android Root Solution",
    tech: "Android WSA Magisk",
  },
] as const;

const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    headline: "AI/ML Software Developer | Applekul | Jan 2026 - Present",
    text: "Built a TypeScript/React farm management platform integrating Planet.com & SentinelHub satellite imagery for crop disease detection and precision agriculture workflows.",
  },
  {
    headline: "AI Semantic Analysis Engineer Intern | Rochester Institute of Technology | Mar 2025 - May 2025",
    text: "Built and evaluated a PyTorch-based sentiment analysis pipeline, improving NLP dataset interpretability by 25%. Developed React-based AI frontend modules supporting 500+ user interactions.",
  },
] as const;

const EDUCATION_ITEMS: EducationItem[] = [
  {
    school: "University of Kashmir",
    degree:
      "B.Tech Computer Science & Engineering | Graduated: Nov 2025",
    details: [],
  },
  {
    school: "New Convent School",
    degree: "Higher Secondary (Non-Medical) | Jan 2019 - Jan 2021",
    details: [],
  },
] as const;

const ACCOLADE_ITEMS: AccoladeItem[] = [
  {
    id: "applekul-fullstack-ml",
    title: "AI/ML Software Developer | Applekul | 2026",
    body: "Architected a full-stack farm management system integrating satellite imagery analysis, weather-based disease detection, financial tracking, and advisory recommendations. Built REST APIs and cloud-backed backend workflows using Supabase, AWS, S3, Lambda, and edge functions.",
  },
  {
    id: "riit-ai-intern",
    title: "AI Semantic Analysis Engineer Intern | RIT | 2025",
    body: "Built and evaluated a PyTorch-based sentiment analysis pipeline, improving NLP dataset interpretability by 25%. Developed React-based AI frontend modules supporting 500+ user interactions with real-time visualizations.",
  },
  {
    id: "applekul-platform",
    title: "Applekul One / GongulOS: AI Farm Management Platform | 2025-Present",
    body: "Architected a full-stack farm management system integrating Planet.com/SentinelHub APIs with TensorFlow ML models for real-time crop health monitoring, yield prediction, and field-level analytics.",
  },
  {
    id: "nodelink-messenger",
    title: "NodeLink / Kraken: Decentralized E2E Encrypted Messenger | 2024-2025",
    body: "Built privacy-focused messaging platform with AES-GCM encryption, ECDH key exchange, and ECDSA authentication. Integrated MetaMask Web3 login and Supabase/GUN.js for decentralized storage serving 100+ concurrent users.",
  },
  {
    id: "ai-medical-diagnosis",
    title: "AI Medical Diagnosis System | 2024-2025",
    body: "Deployed ML models achieving 87% accuracy for disease prediction on healthcare datasets. Piloted Streamlit dashboard with real-time medical data analysis and 40% increased user engagement.",
  },
  {
    id: "magisk-wsa",
    title: "Magisk on WSA: Android Root Solution | 2021",
    body: "Ported Magisk root to Windows Subsystem for Android, enabling full app customization and removing Amazon Appstore restrictions, supporting sideloaded APKs across all apps.",
  },
] as const;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src + CACHE_BUST;
    el.async = false;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(el);
  });
}

/** Main.js expects `.Project` + `p[data-value]` (scramble on hover). */
function ProjectCard({
  href,
  title,
  titleDataValue,
  tech,
  techDataValue,
  className,
  style,
}: {
  href: string;
  title: string;
  titleDataValue: string;
  tech: string;
  techDataValue: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <a
      href={href}
      onClick={(e) => { if (href === "#") e.preventDefault(); }}
      target={href === "#" ? undefined : "_blank"}
      rel={href === "#" ? undefined : "noopener noreferrer"}
      className={`Project rp-project${className ? ` ${className}` : ""}`}
      style={style}
    >
      <div className="rp-project-row">
        <p
          className="rp-project-title"
          data-value={titleDataValue}
          style={{
            fontWeight: "bold",
            whiteSpace: "pre",
          }}
        >
          {title}
        </p>
        <div className="Separator rp-project-sep" />
        <p data-value="2025">2025</p>
      </div>
      <p className="rp-project-tech" data-value={techDataValue}>
        {tech}
      </p>
    </a>
  );
}

export default function PortfolioShell() {
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] =
    useState<(typeof SECTION_IDS)[number]>("Section1");

  const updateActiveFromScroll = useCallback(() => {
    setActiveSection(activeSectionId(rightPanelRef.current));
  }, []);

  useEffect(() => {
    if (legacyScriptsLoading) return;

    legacyScriptsLoading = (async () => {
      for (const src of LEGACY_SCRIPTS) {
        await loadScript(src);
      }
    })().catch((e) => {
      console.error(e);
      legacyScriptsLoading = null;
    });

    return () => {};
  }, []);

  useLayoutEffect(() => {
    const panel = rightPanelRef.current;
    const onScroll = () => updateActiveFromScroll();
    panel?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateActiveFromScroll();
    return () => {
      panel?.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateActiveFromScroll]);

  /* ── Scroll-reveal: IntersectionObserver adds .rp-visible ── */
  useEffect(() => {
    const panel = rightPanelRef.current;
    if (!panel) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("rp-visible");
            io.unobserve(e.target);
          }
        }
      },
      { root: panel, threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    const targets = panel.querySelectorAll(".rp-animate, .rp-section > h2");
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <SiteThemeProvider>
      <canvas id="Canvas3D" />
      <div id="MainDiv">
        <div id="MouseGlow" />
        <div id="MouseGlowBlur" />
        <div id="RightPanel" ref={rightPanelRef}>
          <div id="Section1" className="Section">
            <TechStackSection />
          </div>

          {/* ── Projects ── */}
          <div id="Section2" className="Section rp-section">
            <h2>Projects</h2>
            <p className="rp-section-intro">
              Below are some of the projects I have developed. This is a selection
              of projects I&apos;ve worked on. I plan to revisit and polish these
              projects in the future, improving their code with my current level of
              expertise.
            </p>
            {PROJECT_ITEMS.map((project, i) => (
              <ProjectCard
                key={project.title}
                href={project.href}
                title={project.title}
                titleDataValue={project.title}
                tech={project.tech}
                techDataValue={project.tech}
                className="rp-animate"
                style={{ animationDelay: `${i * 40}ms` }}
              />
            ))}
          </div>

          {/* ── Experience ── */}
          <div id="Section3" className="Section rp-section">
            <h2>Experience</h2>
            <div className="rp-timeline">
              {EXPERIENCE_ITEMS.map((item, i) => (
                <div
                  key={item.headline}
                  className="rp-exp-block rp-animate"
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  <p className="rp-exp-headline">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="Experience"
                      >
                        <span className="rp-inline-em">{item.headline}</span>
                      </a>
                    ) : (
                      <span className="rp-inline-em">{item.headline}</span>
                    )}
                  </p>
                  <p className="rp-exp-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Accolades ── */}
          <div id="Section4" className="Section rp-section">
            <h2>Accolades</h2>
            <div className="rp-accolade-list">
              {ACCOLADE_ITEMS.map((item, i) => (
                <article
                  key={item.id}
                  className="rp-accolade rp-animate"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <p className="rp-accolade-title">
                    {typeof item.title === "string" ? (
                      <span className="rp-inline-em">{item.title}</span>
                    ) : (
                      item.title
                    )}
                  </p>
                  <p className="rp-accolade-body">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          {/* ── Education ── */}
          <div id="Section5" className="Section rp-section">
            <h2>Education</h2>
            <div className="rp-edu-grid">
              {EDUCATION_ITEMS.map((item, i) => (
                <div
                  key={item.school}
                  className="rp-edu-card rp-animate"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <p className="rp-edu-school">
                    <span className="rp-inline-em">{item.school}</span>
                  </p>
                  <p className="rp-edu-degree">
                    <span className="rp-inline-em">{item.degree}</span>
                  </p>
                  {item.details.map((detail) => (
                    <p key={detail} className="rp-edu-detail">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <p className="rp-footer-credit">
            Built by <span className="rp-inline-em">Zaid Shabir</span> with <span className="rp-inline-em">Next.js</span>, <span className="rp-inline-em">React</span>, and{" "}
            <span className="rp-inline-em">TypeScript</span>. The 3D desk and retro CLI run on raw <span className="rp-inline-em">WebGL2</span> with{" "}
            <span className="rp-inline-em">HTML</span>, <span className="rp-inline-em">CSS</span>, and <span className="rp-inline-em">JavaScript</span> — no game engine or UI
            framework on the scene. Edited in <span className="rp-inline-em">Visual Studio Code</span>.
          </p>
        </div>

        <div id="LeftPanel">
          <LeftPanelHero />
          <nav className="NavContainer" aria-label="Sections">
            {SECTION_IDS.map((id) => (
              <button
                key={id}
                type="button"
                className={`NavItem${activeSection === id ? " Active" : ""}`}
                data-section={id}
                onClick={() => scrollToSection(rightPanelRef.current, id)}
              >
                <span className="NavItemDot" aria-hidden />
                <span className="NavItemText">{SECTION_LABELS[id]}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <button
        type="button"
        id="MainButton"
        aria-label="Toggle retro terminal (3D view)"
      >
        <span className="main-btn-terminal-icon" aria-hidden>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
              stroke="currentColor"
              strokeWidth="1.75"
            />
            <path
              d="M8 10h.01M8 14h8M12 10h4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span id="ButtonText">Open Terminal</span>
        <span id="ButtonArrow" aria-hidden>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <audio id="ComputerBoot" src="/Sounds/ComputerBoot.mp3" />
      <audio id="ComputerAmbient" src="/Sounds/ComputerAmbient.mp3" />
      <audio id="ComputerBeep" src="/Sounds/ComputerBeep.mp3" />
      <audio id="KeyboardPressed" src="/Sounds/KeyboardPressed.mp3" />
    </SiteThemeProvider>
  );
}