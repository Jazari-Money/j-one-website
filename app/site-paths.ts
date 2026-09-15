export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const appDownloadUrl = "https://jazarione.app.link/web-launch";

// corebanking's InviteFriendController — see mvp/repos/backend
// (corebanking/corebanking/website/InviteFriendController.cs). Calling this
// from the browser requires the backend CORS policy to allow POST from this
// site's origin, which is not yet configured.
export const referralApiUrl = "https://core.jazarimoney.com/api/v1/referral/invite-friend";
export const referralRecaptchaSiteKey = "6LeIC-QrAAAAAIXLDhv4IB-nP_QYuZB2xcTmB_d9";
export const referralRecaptchaAction = "login";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  return `${siteBasePath}${path}`;
}
