import Link from "next/link";

export type TermsVersion = "us" | "non-us";

const versions: Array<{
  id: TermsVersion;
  href: string;
  label: string;
}> = [
  { id: "us", href: "/terms/", label: "US Terms" },
  { id: "non-us", href: "/terms/non-us/", label: "Non-US Terms" },
];

export function TermsVersionSwitcher({
  activeVersion,
}: {
  activeVersion: TermsVersion;
}) {
  return (
    <nav className="terms-version-switcher" aria-label="Terms version">
      {versions.map((version) => {
        const isActive = version.id === activeVersion;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={isActive ? "is-active" : undefined}
            href={version.href}
            key={version.id}
          >
            {version.label}
          </Link>
        );
      })}
    </nav>
  );
}
