"use client";

import { useState, useEffect } from "react";
import {
  downloadForSpecificPlatform,
  DownloadOptions,
} from "../utils/plateform";
import { FALLBACK_DOWNLOAD_URLS, getLatestReleaseUrls } from "../utils/github";
import { Icons } from "./ui";

const DownloadLinks: React.FC = () => {
  const [downloadUrls, setDownloadUrls] = useState<
    DownloadOptions & { version: string }
  >(FALLBACK_DOWNLOAD_URLS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchReleaseUrls = async () => {
      setIsLoading(true);
      try {
        const urls = await getLatestReleaseUrls();
        if (isMounted) {
          setDownloadUrls(urls);
        }
      } catch (error) {
        console.error("Failed to fetch release URLs:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchReleaseUrls();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-wrap gap-2 my-6">
      {[
        {
          icon: <Icons.Mac className="size-4" />,
          name: "Download for Mac",
          value: "macos",
        },
        {
          icon: <Icons.Windows className="size-4" />,
          name: "Download for Windows",
          value: "windows",
        },
        {
          icon: <Icons.Linux className="size-4" />,
          name: "Download for Linux",
          value: "linux",
        },
      ].map((os) => (
        <button
          key={os.name}
          className="w-[217px] h-[36px] flex items-center justify-between bg-white border border-grey-80 hover:bg-primary-100 hover:border-primary-60 rounded cursor-pointer px-2"
          onClick={() =>
            downloadForSpecificPlatform(
              os.value as keyof DownloadOptions,
              downloadUrls
            )
          }
        >
          <div className="flex gap-2 items-center">
            {os.icon}
            <p className="text-grey-10 text-sm">{os.name}</p>
          </div>
          <Icons.ArrowRight className="size-5" />
        </button>
      ))}
    </div>
  );
};

export default DownloadLinks;
