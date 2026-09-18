export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const appDownloadUrl = "https://jazarione.app.link/web-launch";

// corebanking's InviteFriendController — see mvp/repos/backend
// (corebanking/corebanking/website/InviteFriendController.cs), routed
// through the public API gateway (same origin RatesCalculator already
// calls successfully) rather than core.jazarimoney.com directly.
export const referralApiUrl = "https://api.jazari.xyz/public/api/v1/referral/invite-friend";
export const referralRecaptchaSiteKey = "6LeIC-QrAAAAAIXLDhv4IB-nP_QYuZB2xcTmB_d9";
export const referralRecaptchaAction = "login";
export const referralSuccessRedirectUrl = "https://jazarione.app.link/referral";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  return `${siteBasePath}${path}`;
}
