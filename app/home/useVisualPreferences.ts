"use client";

import { useEffect, useState } from "react";
import {
  shaderOptions,
  themeOptions,
  type ShaderKey,
  type ThemeKey,
} from "./data";

export function useVisualPreferences() {
  const [theme, setTheme] = useState<ThemeKey>("aurora");
  const [shader, setShader] = useState<ShaderKey>("orbital");
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("jazari-theme") as ThemeKey | null;
    const storedShader = window.localStorage.getItem("jazari-shader") as ShaderKey | null;
    const timer = window.setTimeout(() => {
      if (storedTheme && themeOptions.some((option) => option.key === storedTheme)) {
        setTheme(storedTheme);
      }
      if (storedShader && shaderOptions.some((option) => option.key === storedShader)) {
        setShader(storedShader);
      }
      setPreferencesLoaded(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("jazari-theme", theme);
  }, [preferencesLoaded, theme]);

  useEffect(() => {
    if (!preferencesLoaded) return;
    document.documentElement.dataset.shader = shader;
    window.localStorage.setItem("jazari-shader", shader);
  }, [preferencesLoaded, shader]);

  return { theme, setTheme, shader, setShader };
}
