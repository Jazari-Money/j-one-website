"use client";

import { useEffect, useState, type ReactNode } from "react";

// Spanish by default; ?lang=en or a saved choice switches the whole page. Both languages are in the markup,
// CSS shows one (html[data-site-lang]), so the static export needs no extra routes.
export function LatamText({ es, en }: { es: ReactNode; en: ReactNode }) {
  return <><span data-l="es" lang="es">{es}</span><span data-l="en" lang="en">{en}</span></>;
}

export const latamLangScript = `(function(){var l='es';try{var m=/[?&]lang=(es|en)/i.exec(location.search);if(m)l=m[1].toLowerCase();else{var s=localStorage.getItem('jz-latam-lang');if(s==='en'||s==='es')l=s}}catch(e){}document.documentElement.dataset.siteLang=l;document.documentElement.lang=l})();`;

export function LatamLangSwitch() {
  const [lang, setLang] = useState<"es" | "en">("es");
  useEffect(() => { setLang(document.documentElement.dataset.siteLang === "en" ? "en" : "es"); }, []);
  function choose(next: "es" | "en") {
    document.documentElement.dataset.siteLang = next;
    document.documentElement.lang = next;
    try { localStorage.setItem("jz-latam-lang", next); } catch {}
    setLang(next);
  }
  return <div className="latam-lang" role="group" aria-label="Idioma / Language">
    {(["es", "en"] as const).map(code => <button key={code} type="button" lang={code} aria-pressed={lang === code} onClick={() => choose(code)}>{code.toUpperCase()}</button>)}
  </div>;
}
