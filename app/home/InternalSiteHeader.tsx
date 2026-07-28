"use client";

import { withBasePath } from "../site-paths";
import { SiteHeader } from "./SiteHeader";

export function InternalSiteHeader() {
  return (
    <SiteHeader
      mode="internal"
      onAccess={() => {
        window.location.href = withBasePath("/#access");
      }}
    />
  );
}
