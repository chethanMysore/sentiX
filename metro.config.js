const { getDefaultConfig } = require("expo/metro-config");
const OriginalResolver = require("metro-resolver");
const path = require("path");

const nativeBlacklistedModules = ["@tableau/embedding-api-react"];

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform !== "web" && nativeBlacklistedModules.includes(moduleName)) {
    return {
      type: "empty",
    };
  }
  // Default behavior for other module resolutions
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
