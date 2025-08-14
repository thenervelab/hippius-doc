export interface GithubReleaseAsset {
  name: string;
  browser_download_url: string;
}

export interface GithubRelease {
  tag_name: string;
  assets: GithubReleaseAsset[];
}

export interface DownloadLinks {
  windows: string;
  macos: string;
  linux: string;
  version: string;
}

// Fallback URLs in case the GitHub API fails
export const FALLBACK_DOWNLOAD_URLS: DownloadLinks = {
  windows:
    "https://github.com/thenervelab/hippius-desktop/releases/download/v0.0.1/Hippius_0.0.1_x64-setup.exe",
  macos:
    "https://github.com/thenervelab/hippius-desktop/releases/download/v0.0.1/Hippius_0.0.1_universal.dmg",
  linux:
    "https://github.com/thenervelab/hippius-desktop/releases/download/v0.0.1/Hippius_0.0.1_amd64.deb",
  version: "0.0.1",
};

export async function getLatestReleaseUrls(): Promise<DownloadLinks> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/thenervelab/hippius-desktop/releases/latest"
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const release: GithubRelease = await response.json();
    const version = release.tag_name.replace("v", "");

    const findAsset = (patterns: RegExp[]): string => {
      for (const pattern of patterns) {
        const asset = release.assets.find((asset) => pattern.test(asset.name));
        if (asset) return asset.browser_download_url;
      }
      return "";
    };

    return {
      windows:
        findAsset([/\.msi$/i, /windows/i, /win/i, /x64_en-US\.msi$/i]) ||
        FALLBACK_DOWNLOAD_URLS.windows,
      macos:
        findAsset([/\.dmg$/i, /mac/i, /darwin/i, /\.app\.tar\.gz$/i]) ||
        FALLBACK_DOWNLOAD_URLS.macos,
      linux:
        findAsset([/\.AppImage$/i, /\.deb$/i, /linux/i]) ||
        FALLBACK_DOWNLOAD_URLS.linux,
      version,
    };
  } catch (error) {
    console.error("Error fetching latest release:", error);
    return FALLBACK_DOWNLOAD_URLS;
  }
}
