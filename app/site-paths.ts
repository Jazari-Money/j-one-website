export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const appDownloadUrl = "https://jazarione.app.link/web-launch";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  return `${siteBasePath}${path}`;
}
