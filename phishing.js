// --- PHISHING DETECTOR CONTENT SCRIPT ---

/* ---------- CONFIG LISTS ---------- */
const PHISHING_KEYWORDS = [
  "update","verify","secure","alert","required","now","attention","confirm","action",
  "login","signin","account","password","credential","recover","suspend","reset","webmail","myaccount",
  "payment","invoice","bill","transfer","bank","deposit","credit","finance","transaction","securepayment","card",
  "doc","file","pdf","share","drive","document","cloud","dropbox","onedrive","googledocs",
  "message","notification","mail","inbox","voicemail",
  "free","prize","offer","survey","win","reward",
  "support","service","help","official","customer",
  "facebok","micr0soft","gooogle","appple","amaz0n","paypaI","netflx",
  "wellsfargo","bankofamerica","chasebank","citibank","usbank", "urgent", "immediately", "asap", "warning", "securityupdate", "danger",
  "limitedtime", "lastchance", "clicknow", "unusualactivity",

  // 🧾 Legal / enforcement impersonation
  "tax", "irs", "fine", "legal", "court", "lawsuit", "warrant", "fbi", "police", "gov",

  // 💳 Payment systems / services
  "venmo", "zelle", "paypal-update", "appleid", "netbanking", "upi", "wallet", "atm", "ebanking",

  // 🔧 IT-related spoofing
  "admin", "adminpanel", "cpanel", "portal", "itdesk", "helpdesk", "sysadmin", "dashboard",
 "officelogin", "supportcenter", "verificationcenter",

  // 🧨 Bait content
  "winmoney", "unlock", "bonus", "cashback", "gift", "surprise", "jackpot", "limitedoffer", "earlyaccess",

  // 📤 File deception
  "securefile", "dropfile", "pdf-download", "doc-download", "invoice-attached", "scan-copy",

  // 🔗 Common login patterns
  "signinsecure", "loginsubmit", "logon", "connect", "mysecurearea", "confirmemail",

  // 🧱 Obfuscation / brand impersonation via misspelling (new ones)
  "m1crosoft", "g00gle", "faceb00k", "app1e", "paypa1", "netf1ix",

  // Microsoft variants
  "m1crosoft", "micr0soft", "m1cr0soft", "mlcrosoft", "microsoft-support", "microsoft365-login",

  // Google variants
  "g00gle", "go0gle", "goog1e", "googIe", "gogole", "gooogle", "gogle-login",

  // Facebook variants
  "faceb00k", "facebok", "facebook-login", "faccbook", "facebokk", "faecbook", "fb-login",

  // Apple variants
  "app1e", "appple", "aapple", "appleid-update", "apple-secure", "appl3", "app-le",

  // Amazon variants
  "amaz0n", "amazan", "amaozn", "amazonn", "amzon", "amaz0n-offers", "amazon-verification",

  // PayPal variants
  "paypa1", "paypai", "paypall", "paypol", "paypal-support", "paypal-login", "payp4l",

  // Netflix variants
  "netf1ix", "netfIix", "netfl1x", "netfllx", "netflix-login", "netfliix", "netfli.x",

  // Instagram variants
  "1nstagram", "instagrram", "instagram-login", "instagraam", "instagrem",

  // LinkedIn variants
  "1inkedin", "linkediin", "linkedln", "linkedln-login", "linkedn", "linked1n",

  // WhatsApp variants
  "whatsap", "whatsapp-login", "whatsupp", "whattsapp", "whtsapp",

  // Telegram variants
  "te1egram", "telgram", "telegr4m", "tellegram", "telegram-login",

  // Dropbox variants
  "dropb0x", "droppbox", "dropboxx", "dropbox-secure",

  // Discord variants
  "disc0rd", "disccord", "d1scord", "discord-support", "discordapp-login",

  // Roblox variants
  "robloxx", "rob1ox", "robloc", "robl0x", "roblux",

  // Spotify variants
  "sp0tify", "spottify", "spotiffy", "spotify-login", "spotifyy",

  // Office365 variants
  "0ffice365", "office-365", "offlce365", "off1ce365", "officeupdate365",

  // Yahoo variants
  "yah00", "yaaho", "yahoo-login", "yahuu", "yaho0",

  // Banking & Payment Platforms
  "venm0", "zelle-support", "chasebank-login", "bankofarnetica", "wellsfarg0", "citib4nk", "boa-login",

  // Commonly spoofed or clone-like sites
  "bet","rummy","bet365", "b365", "b3t365", "bet-365", "bet365-login",
  "betway", "betw4y", "betw@y", "betwaysupport",
  "1xbet", "1x-bet", "1x8et", "ixbet", "lxbet", "1xbetlive",
  "parimatch", "parim@tch", "par1match", "pari-match", "parimatchbonus",
  "melbet", "me1bet", "melb3t", "melbetbonus", "melbetcash",
  "betfair", "betf@ir", "betfaiir", "betfiar", "betfairbonus",
  "dafabet", "dafab3t", "daf@bet", "d4fabet", "dafabetlogin",
  "10cric", "10cr1c", "10crlc", "10cric-login",
  "fun88", "fun888", "fun88app", "fun88bet",
  "sportsbet", "sportsb3t", "sportzbet", "sports-bet", "sportbettingnow",
  "winbig", "play2win", "bet2win", "superbet", "jackpotzone", "fastbetnow",

  // Generic scammy triggers
  "betonline", "livebet", "casino-win", "betmagic", "betfast",
  "w1nbet", "winnerzclub", "casino4u", "quickbets", "free-bet",
  "vipbetclub", "instantjackpot", "dailybonusbet", "freecoinsbet",
  "sp1nwin", "lottowin", "bigjackpot", "ezwinbet", "realcashwin",

  // Suspicious TLDs with betting brands
  "bet365.site", "1xbet.club", "betway.xyz", "melbet.top", "fun88.win",
  "parimatch.loan", "sportsbet.download", "jackpot.stream", "betnow.bid",

   // 🏢 Brand-based bait
  "samsung-lottery", "samsunggift", "samsungprize", "samsung-reward", "samsungpromo",
  "amazon-gift", "amazon-reward", "amazonwinner", "amazoncash", "amazonsurvey",
  "flipkart-prize", "flipkartgift", "flipkartreward", "flipkartsurvey", "flipkartlottery",
  "apple-reward", "apple-gift", "applepromo", "applelottery", "applewinner",
  "google-winner", "google-gift", "google-reward", "googlerewards", "googlesurvey",
  "iphonewinner", "iphonelottery", "iphonexfree", "iphonegift", "iphonereward",

  // 💵 Cash and win baits
  "win-cash", "winbig", "claim-now", "luckyuser", "random-winner", "jackpotclaim",
  "congratulations-you-won", "lucky-draw", "dailywinner", "claimreward", "freevoucher",
  "freerecharge", "freegift", "instantwin", "surprise-gift", "unbox-reward", "win-spin",
  "scratchwin", "freeiphone", "gift-redeem", "promo-deal",

  // 📦 Tracking or survey scams
  "track-your-prize", "gift-shipping", "delivery-bonus", "complete-survey-win", "surveyreward",
  "lucky-tracking", "giveaway-tracker", "logistics-reward", "offer-shipping",

  // 🔗 Suspicious domain patterns
  "samsung.win", "applebonus.xyz", "flipkart.site", "amazongift.club", "rewardnow.online",

    // 🛠️ IT / Tech disguise
  "remotesupport", "securelogin", "remotework", "accesspanel", "vpnportal", "credentialsupdate",
  "loginverify", "onboarding", "serviceticket", "helpcenter", "itsupport", "techteam",

  // 💸 Finance, Crypto & Tax fraud
  "withdraw", "walletverify", "cryptodeposit", "bitcoingift", "usdtbonus", "ethtransfer",
  "incometax", "refund", "bankverify", "form16", "pancard", "aadharupdate", "irspayment",

  // 📧 Email-specific scams
  "mailboxfull", "emailreset", "inboxlimit", "webmailverify", "office365mail", "mailblock",
  "exchangeupdate", "mailserver", "email-security", "zimbra", "roundcube", "smartermail",

  // 👤 Identity theft
  "idverify", "passportscan", "kycupdate", "aadhaar", "driverslicense", "ssnvalidation",
  "voterid", "documentcheck", "biometric", "panverify",

  // ⚖️ Fake legal / enforcement
  "courtorder", "legalnotice", "summons", "investigation", "arrestwarrant", "govclearance",
  "fbi-alert", "police-case", "cybercrime", "customs-clearance",

  // 🔧 Work-from-home & HR baits
  "hrportal", "joboffer", "resignation", "payslip", "salaryupdate", "leaveform", "internshipmail",

  // 🌐 Common system paths used in phishing URLs
  "signin.html", "login.php", "verify.php", "doc_viewer", "invoice-view", "updateaccount", 
  "submit-otp", "cardcheck", "formlogin", "profile-edit", "accountcenter", "securityform",

  // 💰 Fake rewards
  "claim-coupon", "scratchcard", "voucher2025", "e-wallet", "cash-gift", "bonus-offer", "earlyaccess",
  
  // 💻 File disguises (URLs pretending to be files)
  "invoice.docx", "statement.pdf", "contract.zip", "resume.exe", "ticket.doc", "bankform.xls",

    // 🎯 Brand impersonations
  "rummycircle", "rummycircle-login", "rummycirclebonus", "rummycircleapp", "rummycirclecash",
  "junglerummy", "junglerummylogin", "junglerummyapp", "junglerummybonus",
  "addacash", "adda52rummy", "adda52bonus", "adda52cash", "adda52pro",
  "a23rummy", "a23-app", "a23login", "a23bonus", "a23claim",

  // 💰 Bait words + rummy
  "rummybonus", "rummygift", "rummy-reward", "rummyjackpot", "rummy-offer",
  "rummypromo", "freerummycash", "rummysignupbonus", "rummy500", "rummy1000",
  "claimrummy", "rummyluckydraw", "winrummy", "rummydeposit", "rummy-withdraw",

  // ⚠️ Suspicious domain or redirects
  "rummyapp.xyz", "rummy.top", "rummycash.win", "rummyonline.site", "rummybonus.live",
  "rummyupdate.club", "rummysurvey", "rummy.apk", "downloadrummy",

  // 🧨 Typosquats & abuse
  "rummicircle", "rumycircle", "rummicash", "rummycircl", "rummylite", "rummipro"

];

const PHISHING_STRUCTURAL_INDICATORS = [
  // 🔒 Suspicious or abused TLDs (cheap or unregulated)
  ".ru", ".tk", ".ml", ".cf", ".gq", ".xyz", ".top", ".club",
  ".info", ".biz", ".site", ".online", ".space", ".link",
  ".win", ".click", ".work", ".party", ".loan", ".stream",
  ".trade", ".download", ".cam", ".men", ".mom", ".review",

  // 📦 File extensions / masquerading payloads
  ".zip", ".rar", ".exe", ".scr", ".jar", ".msi", ".apk", ".iso",

  // 🛠️ JavaScript + obfuscation
  "base64,", "javascript:", "%3Cscript%3E", "<script>",

  // ⚠️ Redirect abuse
  "redirect=", "redir=", "url=", "target=", "out=", "u=",

  // 📜 Data URI payload (often used in HTML file phishing)
  "data:text/html",

  // 🧨 URL encoded control characters
  "%00", "%0a", "%0d", "%20", "%09",

  // 🧪 Unicode/typosquatting tricks
  "xn--", "％", "＠", "｡", "＃", "＆", "＄", "："
];


const SHORTENERS = [
  "bit.ly",
  "tinyurl.com",
  "goo.gl",         // deprecated but still in use
  "t.co",           // Twitter
  "ow.ly",          // Hootsuite
  "is.gd",
  "buff.ly",        // Buffer
  "adf.ly",         // AdFly
  "bl.ink",
  "rebrand.ly",
  "soo.gd",
  "shorte.st",
  "trib.al",        // used in media links
  "snip.ly",
  "tiny.cc",
  "cutt.ly",
  "rb.gy",
  "shorturl.at",
  "v.gd",
  "qr.ae",
  "lnkd.in",        // LinkedIn redirects
  "youtu.be",       // YouTube short links
  "fb.me",          // Facebook
  "amzn.to",        // Amazon affiliate
  "bit.do",
  "po.st",
  "wp.me",          // WordPress
  "x.co",           // GoDaddy
  "cli.re"
];


/* ---------- HELPER DETECTION FUNCTIONS ---------- */
const isIpBased = url => /^https?:\/\/(\d{1,3}\.){3}\d{1,3}/.test(url);

const matchedShorteners = url =>
  SHORTENERS.filter(s => url.includes(s));

const matchedKeywords = url =>
  PHISHING_KEYWORDS.filter(k =>
    new RegExp(`\\b${k}\\b`, "i").test(url)
  );

const hasAtSymbol = url => url.includes("@");

const matchedTLDs = url =>
  PHISHING_STRUCTURAL_INDICATORS.filter(t => url.toLowerCase().includes(t));

/* ---------- BANNER CREATOR ---------- */
function showBanner(msg, bg, ms) {
  const existing = document.getElementById("ctphisher-banner");
  if (existing) existing.remove();

  const banner = Object.assign(document.createElement("div"), {
    id: "ctphisher-banner",
    textContent: msg,
    style: `
      position:fixed;top:0;left:0;right:0;z-index:9999;
      padding:12px;font-weight:bold;text-align:center;
      background:${bg};color:#fff;`
  });
  document.body.prepend(banner);
  setTimeout(() => banner.remove(), ms);
}

/* ---------- MAIN CHECK ---------- */
function checkCurrentPageURL() {
  const url = window.location.href;
  console.log("🔍 Scanning:", url);

  // Track all indicator messages
  const hits = [];

  /* 1. IP‑based URL */
  if (isIpBased(url)) {
    hits.push("IP‑based URL detected");
  }

  /* 2. URL shorteners */
  const shortHits = matchedShorteners(url);
  if (shortHits.length) {
    hits.push(`URL shortener(s): ${shortHits.join(", ")}`);
  }

  /* 3. @ symbol redirects */
  if (hasAtSymbol(url)) {
    hits.push("'@' symbol present (possible redirect)");
  }

  /* 4. Suspicious TLDs / structural */
  const tldHits = matchedTLDs(url);
  if (tldHits.length) {
    hits.push(`Suspicious TLD/indicator: ${tldHits.join(", ")}`);
  }

  /* 5. Phishing keywords */
  const keywordHits = matchedKeywords(url);
  if (keywordHits.length) {
    hits.push(`Phishing keyword(s): ${keywordHits.join(", ")}`);
  }

  /* ----- Logging & UI ----- */
  if (hits.length) {
    console.warn("⚠️  Phishing indicators found:");
    hits.forEach(h => console.warn("  •", h));
    showBanner("⚠️  Phishing Warning: Suspicious Link Detected", "red", 5000);
  } else {
    console.log("✅ No indicators matched. URL appears safe.");
    showBanner("✅ This link looks safe", "green", 3000);
  }
}

/* ---------- RUN ON PAGE LOAD ---------- */
checkCurrentPageURL();
