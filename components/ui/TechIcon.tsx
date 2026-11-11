import type { CSSProperties, ComponentType } from "react";
import { FaCss3Alt, FaJava } from "react-icons/fa6";
import {
  LuAppWindow,
  LuBrainCircuit,
  LuCode,
  LuCpu,
  LuLayers,
  LuLayoutTemplate,
  LuPenTool,
  LuSparkles,
} from "react-icons/lu";
import {
  SiAngular,
  SiBootstrap,
  SiCplusplus,
  SiDocker,
  SiElementor,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFlask,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiSupabase,
  SiSvelte,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
} from "react-icons/si";
import { TbApi, TbBrandCSharp, TbBrandOpenai } from "react-icons/tb";

function CanvaGlyph({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M12.003 0C5.372 0 0 5.372 0 12.003c0 6.63 5.372 12.002 12.003 12.002 6.63 0 12.002-5.372 12.002-12.002C24.005 5.372 18.633 0 12.003 0zm-1.07 18.257c-3.555 0-5.836-2.585-5.836-6.195 0-4.053 2.87-7.16 6.55-7.16 2.793 0 4.512 1.536 4.512 3.807 0 2.597-2.253 4.02-4.588 4.02-.676 0-1.256-.12-1.67-.308-.045.64-.06 1.252-.06 1.76 0 2.1 1.015 3.036 2.392 3.036 1.146 0 2.07-.439 2.78-1.228l.765.953c-.947 1.063-2.348 1.703-3.694 1.703zm1.686-9.587c1.167 0 2.16-.837 2.16-2.162 0-1.21-.846-1.998-2.07-1.998-1.84 0-3.058 1.87-3.133 3.913.432.148.916.247 1.463.247h1.58z" />
    </svg>
  );
}

const ICON_MAP: Record<string, ComponentType<{ className?: string; style?: CSSProperties }>> = {
  // Front-end
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  react: SiReact,
  reactjs: SiReact,
  "react.js": SiReact,
  typescript: SiTypescript,
  ts: SiTypescript,
  javascript: SiJavascript,
  js: SiJavascript,
  html5: SiHtml5,
  html: SiHtml5,
  css3: FaCss3Alt,
  css: FaCss3Alt,
  "tailwind css": SiTailwindcss,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  bootstrap: SiBootstrap,
  vue: SiVuedotjs,
  "vue.js": SiVuedotjs,
  angular: SiAngular,
  svelte: SiSvelte,
  vite: SiVite,

  // Back-end & Languages
  python: SiPython,
  flask: SiFlask,
  java: FaJava,
  "spring boot": SiSpringboot,
  springboot: SiSpringboot,
  spring: SiSpringboot,
  node: SiNodedotjs,
  "node.js": SiNodedotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  "express.js": SiExpress,
  php: SiPhp,
  laravel: SiLaravel,
  "c++": SiCplusplus,
  cpp: SiCplusplus,
  "c#": TbBrandCSharp,
  csharp: TbBrandCSharp,

  // APIs & AI
  "rest apis": TbApi,
  "rest api": TbApi,
  api: TbApi,
  apis: TbApi,
  graphql: SiGraphql,
  "ai and nlp integrations": LuBrainCircuit,
  "ai & nlp integrations": LuBrainCircuit,
  "ai and nlp": LuBrainCircuit,
  "nlp integrations": LuBrainCircuit,
  ai: LuSparkles,
  nlp: LuBrainCircuit,
  openai: TbBrandOpenai,

  // Database & Cloud
  supabase: SiSupabase,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  redis: SiRedis,
  firebase: SiFirebase,
  prisma: SiPrisma,

  // Tools & Hosting
  vercel: SiVercel,
  git: SiGit,
  github: SiGithub,
  docker: SiDocker,
  linux: SiLinux,

  // Design & Creative
  figma: SiFigma,
  canva: CanvaGlyph,
  elementor: SiElementor,
  "ui/ux design": LuLayoutTemplate,
  "ui/ux": LuLayoutTemplate,
  "graphic design": LuPenTool,
  branding: LuSparkles,
  "interface design": LuAppWindow,
  "visual composition": LuLayers,
};

export type TechIconProps = {
  /** Name of the technology, tool, or skill (e.g. "Next.js", "Flask", "Supabase") */
  name: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Renders the brand or concept vector icon for a given technology or tool name.
 * Normalizes input strings and provides sensible fallbacks.
 */
export function TechIcon({ name, className = "size-5", style }: TechIconProps) {
  const key = name.trim().toLowerCase();
  const IconComponent = ICON_MAP[key] ?? LuCode ?? LuCpu;

  return <IconComponent className={className} style={style} />;
}
