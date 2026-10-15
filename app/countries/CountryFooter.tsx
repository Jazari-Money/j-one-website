import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "../home/SocialLinks";

export function CountryFooter() {
  return (
    <footer className="country-footer">
      <Link href="/" className="country-footer-logo" aria-label="Jazari One home">
        <Image
          src="/images/brand/jazari-one-logo.svg"
          alt="Jazari One"
          width={1638}
          height={217}
        />
      </Link>
      <SocialLinks className="country-footer-socials" />
    </footer>
  );
}
