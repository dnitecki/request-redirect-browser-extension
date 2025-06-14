import { RuleOperatorEnum } from "../enums/enums";
import { StorageObject } from "../types/types";

// Function to generate redirect rules from stored data
function createRedirectRule(
  rule: StorageObject,
  id: number
): chrome.declarativeNetRequest.Rule {
  // Determine the urlFilter based on ruleOperator
  let urlFilter: string;

  if (rule.ruleOperator === RuleOperatorEnum.EQUALS) {
    // Exact match requires the full URL
    urlFilter = rule.fromUrl;
  } else if (rule.ruleOperator === RuleOperatorEnum.CONTAINS) {
    // Contains match needs a wildcard around the URL
    urlFilter = `*${rule.fromUrl}*`;
  }

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
      urlFilter: urlFilter, // Use the dynamic urlFilter based on the operator
      resourceTypes: [
        chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
        chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
      ],
    },
  };
}

// Simple unique id generator from a string (e.g., ruleName)
function stringToId(ruleName: string): number {
  let id = 0;
  for (let i = 0; i < ruleName.length; i++) {
    id += ruleName.charCodeAt(i) * (i + 1);
  }
  return (id % 1000000) + 1;
}

// Function to load and update redirect rules dynamically
function loadAndApplyRedirectRules(): void {
  chrome.storage.sync.get(null, (data: { [key: string]: StorageObject }) => {
    const dynamicRules: chrome.declarativeNetRequest.Rule[] = [];
    const ruleIdsToRemove: number[] = [];

    for (const key in data) {
      const rule: StorageObject = data[key];
      const ruleId: number = stringToId(rule.ruleName);

      if (rule.enabled) {
        // Create a new redirect rule based on the stored data
        dynamicRules.push(createRedirectRule(rule, ruleId));
      } else {
        // If the rule is disabled, we need to prepare to remove it
        ruleIdsToRemove.push(ruleId);
      }
    }

    // Update the declarativeNetRequest rules
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: ruleIdsToRemove,
        addRules: dynamicRules,
      },
      async () => {
        const rules = await chrome.declarativeNetRequest.getDynamicRules();
        console.log("Redirect rules applied:", rules);
      }
    );
  });
}

// Listen for changes in chrome storage to reload redirect rules
chrome.storage.onChanged.addListener((): void => {
  loadAndApplyRedirectRules();
});

// Load the redirect rules whenever the service worker starts
chrome.runtime.onStartup.addListener((): void => {
  loadAndApplyRedirectRules();
});
