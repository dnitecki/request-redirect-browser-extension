import { StorageObject } from "../types/types";

// Function to generate redirect rules from stored data
function createRedirectRule(
  rule: StorageObject,
  id: number
): chrome.declarativeNetRequest.Rule {
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
      ], // Correctly reference the ResourceType enum
    },
  };
}

// Function to load and update redirect rules dynamically
function loadAndApplyRedirectRules(): void {
  chrome.storage.sync.get(null, (data: { [key: string]: StorageObject }) => {
    const dynamicRules: chrome.declarativeNetRequest.Rule[] = [];
    const ruleIdsToRemove: number[] = [];
    let ruleId = 1;

    for (const key in data) {
      const rule: StorageObject = data[key];

      if (rule.enabled) {
        // Create a new redirect rule based on the stored data
        dynamicRules.push(createRedirectRule(rule, ruleId));
      } else {
        // If the rule is disabled, we need to prepare to remove it
        ruleIdsToRemove.push(ruleId);
      }
      ruleId++;
    }

    // Update the declarativeNetRequest rules
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: ruleIdsToRemove,
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
