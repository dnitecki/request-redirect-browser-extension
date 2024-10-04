import { StorageObject } from "../types/types";

function createRedirectRule(rule: any, id: number) {
  return {
    id: id,
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
      redirect: {
        url: rule.toUrl,
      },
    },
    condition: {
      urlFilter: rule.fromUrl, // Match the fromUrl defined in storage
      resourceTypes: [
        chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
        chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
      ],
    },
  };
}
// Function to load and update redirect rules dynamically
function loadAndApplyRedirectRules() {
  chrome.storage.sync.get(null, (data: { [key: string]: StorageObject }) => {
    const dynamicRules: chrome.declarativeNetRequest.Rule[] = [];
    let ruleId = 1;

    for (const key in data) {
      const rule: StorageObject = data[key];

      if (rule.enabled) {
        // Create a new redirect rule based on the stored data
        dynamicRules.push(createRedirectRule(rule, ruleId));
        ruleId++;
      }
    }

    // Update the declarativeNetRequest rules
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: dynamicRules.map((rule) => rule.id),
        addRules: dynamicRules,
      },
      () => {
        console.log("Redirect rules applied:", dynamicRules);
      }
    );
  });
}
// Listen for changes in chrome storage to reload redirect rules
chrome.storage.onChanged.addListener((): void => {
  loadAndApplyRedirectRules();
});

// Load the redirect rules initially when the extension is installed
chrome.runtime.onInstalled.addListener((): void => {
  loadAndApplyRedirectRules();
});

// Load the redirect rules whenever the service worker starts
chrome.runtime.onStartup.addListener((): void => {
  loadAndApplyRedirectRules();
});
