interface TemplateTechStackProps {
  techStack: string[];
}

// Map common tech names to colors
const getTechColor = (tech: string): string => {
  const lowerTech = tech.toLowerCase();
  if (lowerTech.includes("react")) return "bg-blue-100 text-blue-600";
  if (lowerTech.includes("typescript")) return "bg-blue-100 text-blue-700";
  if (lowerTech.includes("javascript")) return "bg-yellow-100 text-yellow-700";
  if (lowerTech.includes("tailwind")) return "bg-teal-100 text-teal-600";
  if (lowerTech.includes("framer") || lowerTech.includes("motion")) return "bg-purple-100 text-purple-600";
  if (lowerTech.includes("vite")) return "bg-yellow-100 text-yellow-600";
  if (lowerTech.includes("next")) return "bg-gray-100 text-gray-700";
  if (lowerTech.includes("node")) return "bg-green-100 text-green-600";
  if (lowerTech.includes("supabase")) return "bg-emerald-100 text-emerald-600";
  if (lowerTech.includes("stripe")) return "bg-violet-100 text-violet-600";
  if (lowerTech.includes("gsap")) return "bg-lime-100 text-lime-700";
  return "bg-muted text-muted-foreground";
};

// Map common tech names to emojis
const getTechIcon = (tech: string): string => {
  const lowerTech = tech.toLowerCase();
  if (lowerTech.includes("react")) return "⚛️";
  if (lowerTech.includes("typescript")) return "📘";
  if (lowerTech.includes("javascript")) return "📒";
  if (lowerTech.includes("tailwind")) return "🎨";
  if (lowerTech.includes("framer") || lowerTech.includes("motion")) return "🎬";
  if (lowerTech.includes("vite")) return "⚡";
  if (lowerTech.includes("next")) return "▲";
  if (lowerTech.includes("node")) return "🟢";
  if (lowerTech.includes("supabase")) return "🔷";
  if (lowerTech.includes("stripe")) return "💳";
  if (lowerTech.includes("gsap")) return "🎭";
  return "🔧";
};

const TemplateTechStack = ({ techStack }: TemplateTechStackProps) => {
  // If no tech stack, don't render the section
  if (!techStack || techStack.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-foreground">
        Tech Stack
      </h2>

      {/* Technologies */}
      <div className="glass-card p-6 rounded-xl border border-border/50">
        <h3 className="font-semibold text-foreground mb-4">Built With</h3>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-full flex items-center gap-2 ${getTechColor(tech)} font-medium text-sm transition-transform hover:scale-105`}
            >
              <span>{getTechIcon(tech)}</span>
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateTechStack;
