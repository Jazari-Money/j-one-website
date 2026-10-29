"use client";

import { useSyncExternalStore, type ReactNode } from "react";

// Also picks one of three hero personas per visit (never the same twice in a row).
// Spanish by default; ?lang=en or a saved choice switches the whole page. Both languages are in the markup,
// CSS shows one (html[data-site-lang]), so the static export needs no extra routes.
export function LatamText({ es, en }: { es: ReactNode; en: ReactNode }) {
  return <><span data-l="es" lang="es">{es}</span><span data-l="en" lang="en">{en}</span></>;
}

export const latamLangScript = `(function(){try{var n=3,last=+sessionStorage.getItem('jz-latam-persona')||0,p=1+Math.floor(Math.random()*n);if(p===last)p=p%n+1;sessionStorage.setItem('jz-latam-persona',p);document.documentElement.dataset.persona=String(p)}catch(e){document.documentElement.dataset.persona=String(1+Math.floor(Math.random()*3))}})();(function(){var l='es';try{var m=/[?&]lang=(es|en)/i.exec(location.search);if(m)l=m[1].toLowerCase();else{var s=localStorage.getItem('jz-latam-lang');if(s==='en'||s==='es')l=s}}catch(e){}document.documentElement.dataset.siteLang=l;document.documentElement.lang=l})();`;

function setSiteLang(next: "es" | "en") {
  const root = document.documentElement;
  root.dataset.siteLang = next;
  root.lang = next;
  try { localStorage.setItem("jz-latam-lang", next); } catch {}
  window.dispatchEvent(new Event("jz-latam-lang"));
}
const subscribe = (cb: () => void) => { window.addEventListener("jz-latam-lang", cb); return () => window.removeEventListener("jz-latam-lang", cb); };
const readLang = () => (document.documentElement.dataset.siteLang === "en" ? "en" : "es");

export function LatamLangSwitch() {
  const lang = useSyncExternalStore(subscribe, readLang, () => "es");
  return <div className="latam-lang" role="group" aria-label="Idioma / Language">
    {(["es", "en"] as const).map(code => <button key={code} type="button" lang={code} aria-pressed={lang === code} onClick={() => setSiteLang(code)}>{code.toUpperCase()}</button>)}
  </div>;
}
