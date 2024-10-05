# reRoute Chrome Extension

## Overview

The **reRoute Chrome Extension** allows users to set up dynamic redirect rules for HTTP API requests. It can redirect requests based on specified URL patterns, making it easy to switch between different environments (e.g., development and production) or change the API endpoints without modifying the application code.

## Features

- **Dynamic Redirects**: Redirect HTTP requests based on defined rules stored in Chrome's synchronized storage.
- **Flexible Rule Definition**: Define rules based on URL patterns with options for contains, starts with, or exact matches.
- **User-Friendly Storage Management**: Easily add, remove, and clear redirect rules using Chrome's storage API.

## Getting Started

### Installation

1. Download or clone this repository.
2. run `npm run build` & `npm install` to install required dependencies and build the extension into the `dist` folder.
3. Open Chrome and navigate to `chrome://extensions`.
4. Enable "Developer mode" by toggling the switch in the top right corner.
5. Click on "Load unpacked" and select the directory where the extension's `dist` folder is located.

### Usage

1. Open the extension's popup or options page (if available) to add your redirect rules.
2. Specify the `fromUrl` and `toUrl` along with the `enabled` status for each rule.
   - **Example**:
     - `fromUrl`: `http://localhost:3000/api/*`
     - `toUrl`: `http://localhost:8000/api/`
     - `enabled`: `true`
3. The extension will dynamically apply the redirect rules to any matching API requests made in the browser.

### Example Rule

Here’s an example of how to define a redirect rule:

```typescript
const redirectRule: StorageObject = {
  ruleName: "Localhost API Redirect",
  ruleOperator: RuleOperatorEnum.CONTAINS,
  fromUrl: "http://localhost:3000/api/*",
  toUrl: "http://localhost:8000/api/",
  enabled: true,
};
```

### GitHub @dnitecki
