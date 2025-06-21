// --- PHISHING DETECTOR CONTENT SCRIPT ---

/* ---------- CONFIG LISTS (unchanged) ---------- */
const PHISHING_KEYWORDS = [
  "update","verify","secure","alert","required","now","attention","confirm","action",
  "login","signin","account","password","credential","recover","suspend","reset","webmail","myaccount",
  "payment","invoice","bill","transfer","bank","deposit","credit","finance","transaction","securepayment","card",
  "doc","file","pdf","share","drive","document","cloud","dropbox","onedrive","googledocs",
  "message","notification","mail","inbox","voicemail",
  "free","prize","offer","survey","win","reward",
  "support","service","help","official","customer",
  "facebok","micr0soft","gooogle","appple","amaz0n","paypaI","netflx",
  "wellsfargo","bankofamerica","chasebank","citibank","usbank"
];

const PHISHING_STRUCTURAL_INDICATORS = [
  ".zip",".ru",".xyz",".club",".info",".biz",".top",".gq",".ml",".cf",".tk",
  ".online",".site",".win",".bid",".loan",".science",".review",".space",".link",
  ".stream",".download",".tech",".website"
];

const SHORTENERS = ["bit.ly","tinyurl","goo.gl","t.co","ow.ly","is.gd"];

/* ---------- HELPER FUNCTIONS ---------- */
const isIpBased                = url => /^https?:\/\/(\d{1,3}\.){3}\d{1,3}/.test(url);
const containsShortener        = url => SHORTENERS.some(s => url.includes(s));
const containsPhishingKeyword  = url => console.log("Detected keyword match:", PHISHING_KEYWORDS.filter(k => currentURL.toLowerCase().includes(k)));
const containsAtSymbol         = url => url.includes("@");
const containsStructuralInd    = url => PHISHING_STRUCTURAL_INDICATORS.some(tld => url.toLowerCase().includes(tld));

/* ---------- BANNER CREATOR ---------- */
function showBanner(message, bgColor, durationMs) {
  // Remove any previous banner first
  const existing = document.getElementById("ctphisher-banner");
  if (existing) existing.remove();

  const banner           = document.createElement("div");
  banner.id              = "ctphisher-banner";
  banner.textContent     = message;
  banner.style.cssText   = `
        position:fixed; top:0; left:0; right:0; z-index:9999;
        padding:12px; font-weight:bold; text-align:center;
        background:${bgColor}; color:#fff;`;
  document.body.prepend(banner);

  // Auto‑remove after specified time
  setTimeout(() => banner.remove(), durationMs);
}

/* ---------- MAIN CHECK ---------- */
function checkCurrentPageURL() {
  const url = window.location.href;
  console.log("Scanning:", url);

  const suspicious =
        isIpBased(url)            ||
        containsShortener(url)    ||
        containsAtSymbol(url)     ||
        containsStructuralInd(url)||
        containsPhishingKeyword(url);
  


  if (suspicious) {
    console.warn("Phishing indicators found.");
    showBanner("Phishing Warning: Suspicious Link Detected", "red", 5000); // 5 s
  } else {
    console.log("This URL appears safe.");
    showBanner("This link looks safe", "green", 3000);                     // 3 s
  }
}

/* ---------- RUN ON PAGE LOAD ---------- */
checkCurrentPageURL();
