document.addEventListener("DOMContentLoaded", function () {
  const cookieConsentBanner = document.getElementById("cookieConsent");
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");

  if (cookiesAccepted === "true") {
    // Cookies accepted
    console.log("Cookies have been accepted.");
    // Push to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "cookieConsent", CookieConsent: true });
  } else if (cookiesAccepted === "false") {
    // Cookies rejected
    console.log("Cookies have been rejected.");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "cookieConsent", CookieConsent: false });
  } else {
    // Show the cookie consent banner
    cookieConsentBanner.style.display = "block";
  }

  document.getElementById("acceptCookies").onclick = function () {
    // Accept cookies
    localStorage.setItem("cookiesAccepted", "true");
    cookieConsentBanner.style.display = "none";

    // Push to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "cookieConsent", CookieConsent: true });
  };

  document.getElementById("rejectCookies").onclick = function () {
    // Reject cookies
    localStorage.setItem("cookiesAccepted", "false");
    cookieConsentBanner.style.display = "none";

    // Push to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "cookieConsent", CookieConsent: false });
  };
});
