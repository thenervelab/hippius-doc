"use client";

/**
 * Detects the user's operating system
 * @returns 'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'unknown'
 */
export function detectOS(): string {
  // Only run on client side
  if (typeof window === "undefined") {
    return "unknown";
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  // Mobile OS detection
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return "ios";
  } else if (/android/.test(userAgent)) {
    return "android";
  }

  // Desktop OS detection
  if (/(win32|wow64|win64)/.test(window.navigator.platform.toLowerCase())) {
    return "windows";
  } else if (/mac/.test(window.navigator.platform.toLowerCase())) {
    return "macos";
  } else if (/linux/.test(window.navigator.platform.toLowerCase())) {
    return "linux";
  }

  // Fallbacks for more complex cases
  if (userAgent.indexOf("win") !== -1) {
    return "windows";
  } else if (userAgent.indexOf("mac") !== -1) {
    return "macos";
  } else if (
    userAgent.indexOf("linux") !== -1 ||
    userAgent.indexOf("x11") !== -1
  ) {
    return "linux";
  }

  return "unknown";
}

export interface DownloadOptions {
  windows: string;
  macos: string;
  linux: string;
}

/**
 * Gets the appropriate download URL based on user's platform
 * @param options Object containing URLs for each platform
 * @returns The URL for the detected platform
 */
export function getDownloadURL(options: DownloadOptions): string {
  const os = detectOS();

  // Map mobile platforms to desktop equivalents
  if (os === "ios") {
    return options.macos;
  } else if (os === "android") {
    return options.windows;
  }

  // Return the URL for the detected OS or default to Windows if unknown
  return options[os as keyof DownloadOptions] || options.windows;
}

/**
 * Initiates the download of the appropriate file for the user's platform
 * @param options Object containing URLs for each platform
 */
export function downloadForPlatform(options: DownloadOptions): void {
  const downloadURL = getDownloadURL(options);
  console.log("download url", downloadURL);

  // Create a temporary anchor element to trigger the download
  const link = document.createElement("a");
  link.href = downloadURL;
  link.setAttribute("download", "");
  link.setAttribute("target", "_blank");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Initiates the download for a specified platform
 * @param platform The platform name ('windows' | 'macos' | 'linux')
 * @param options Object containing URLs for each platform
 */
export function downloadForSpecificPlatform(
  platform: keyof DownloadOptions,
  options: DownloadOptions
): void {
  const downloadURL = options[platform] || options.windows;
  const link = document.createElement("a");
  link.href = downloadURL;
  link.setAttribute("download", "");
  link.setAttribute("target", "_blank");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
