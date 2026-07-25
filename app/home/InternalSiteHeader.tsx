"use client";

import { withBasePath } from "../site-paths";
import { SiteHeader } from "./SiteHeader";
import { useVisualPreferences } from "./useVisualPreferences";

export function InternalSiteHeader() {
  const { theme, setTheme, shader, setShader } = useVisualPreferences();

  return (
    <SiteHeader
      mode="internal"
      theme={theme}
      shader={shader}
      onThemeChange={setTheme}
      onShaderChange={setShader}
      onAccess={() => {
        window.location.href = withBasePath("/#access");
      }}
    />
  );
}
