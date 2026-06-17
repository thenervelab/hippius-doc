import React, { type ReactNode } from "react";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

interface ScreenshotProps {
  /** Light (default) image, e.g. "/img/desktop/login-screen.png". */
  src: string;
  alt: string;
  /**
   * Dark-mode variant.
   * - omit it → the light image is shown in both themes (safe default while
   *   there is no dark screenshot yet);
   * - `dark` (boolean) → auto-resolves the `-dark` sibling
   *   (login-screen.png → login-screen-dark.png);
   * - `dark="/img/.../other-dark.png"` → an explicit dark path.
   */
  dark?: boolean | string;
  className?: string;
}

/**
 * Theme-aware screenshot. Renders a plain <img> when there is no dark variant,
 * and a Docusaurus <ThemedImage> (which swaps on light/dark) when one exists.
 */
export default function Screenshot({
  src,
  alt,
  dark,
  className,
}: ScreenshotProps): ReactNode {
  const lightUrl = useBaseUrl(src);
  const darkPath =
    typeof dark === "string" ? dark : src.replace(/(\.[a-zA-Z0-9]+)$/, "-dark$1");
  const darkUrl = useBaseUrl(darkPath);

  if (!dark) {
    return (
      <img className={className ?? "screenshot"} src={lightUrl} alt={alt} loading="lazy" />
    );
  }

  return (
    <ThemedImage
      className={className ?? "screenshot"}
      alt={alt}
      sources={{ light: lightUrl, dark: darkUrl }}
    />
  );
}
