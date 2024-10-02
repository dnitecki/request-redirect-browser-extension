const redirectRequest = (details: any) => {
  // Define the URL pattern you want to redirect from
  const targetUrlPattern = /https:\/\/api\.example\.com\/v1\/(.*)/;

  if (details.url.match(targetUrlPattern)) {
    // Define the new URL to redirect to
    const newUrl = details.url.replace(
      "api.example.com/v1",
      "api.newexample.com/v2"
    );

    console.log(`Redirecting request: ${details.url} -> ${newUrl}`);
    return { redirectUrl: newUrl };
  }
};
chrome.webRequest.onBeforeRequest.addListener(
  redirectRequest,
  { urls: ["<all_urls>"] }, // Specify the URL patterns you want to intercept
  ["blocking"]
);
