const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/jazarione/", icon: "instagram" },
  { name: "LinkedIn", href: "https://uk.linkedin.com/company/jazarimoney", icon: "linkedin" },
  { name: "Facebook", href: "https://www.facebook.com/people/Jazari-One/61590046611736/", icon: "facebook" },
  { name: "X", href: "https://x.com/OneJazari", icon: "x" },
] as const;

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  if (icon === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.51 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.84L7.08 4.13H5.12l11.96 15.64Z" />
      </svg>
    );
  }

  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle className="social-dot" cx="17.4" cy="6.7" r="1" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.7 8.4H3.4V19h3.3V8.4ZM5.05 3A1.95 1.95 0 1 0 5 6.9 1.95 1.95 0 0 0 5.05 3ZM20.6 13c0-3.2-1.7-4.9-4.1-4.9-1.9 0-2.8 1.05-3.25 1.8V8.4H10V19h3.3v-5.25c0-1.4.27-2.78 2.03-2.78 1.73 0 1.75 1.62 1.75 2.87V19h3.32v-6Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 8h3V4h-3.5C10.5 4 9 5.8 9 8.5V11H6v4h3v7h4v-7h3.5l.5-4h-4V9c0-.7.3-1 1-1Z" />
    </svg>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`social-links ${className}`.trim()} aria-label="Jazari One social media">
      {socialLinks.map((social) => (
        <a
          href={social.href}
          key={social.name}
          target="_blank"
          rel="noreferrer"
          aria-label={`Jazari One on ${social.name}`}
        >
          <SocialIcon icon={social.icon} />
        </a>
      ))}
    </div>
  );
}
