interface TechBadgeProps {
  name: string;
  iconKey?: string; 
  size?: "sm" | "lg";
}

export function TechBadge({ name, iconKey, size = "sm" }: TechBadgeProps) {
  const hasIcon = iconKey && iconKey.includes("devicon-");

  return (
    <span
      className={`
        inline-flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 transition-all hover:bg-white/10 hover:border-white/10
        ${size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-2 text-sm"}
      `}
      title={name}
    >
      {hasIcon ? (
        <i className={`${iconKey} ${size === "sm" ? "text-base" : "text-2xl"}`}></i>
      ) : (
        <span className="font-medium text-muted">{name}</span>
      )}
      
      {(size === "lg" || !hasIcon) && (
         <span className={size === "lg" ? "text-white" : "text-muted"}>{name}</span>
      )}
    </span>
  );
}