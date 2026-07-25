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
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("jazari-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.shader = shader;
    window.localStorage.setItem("jazari-shader", shader);
  }, [shader]);

  return { theme, setTheme, shader, setShader };
}
