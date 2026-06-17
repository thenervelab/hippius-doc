import React, { type ReactNode } from "react";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./Screenshot.module.css";

interface ScreenshotProps {
  /** Light (default) image, e.g. "/img/desktop/login-screen.png".
   *  This is the full Figma export (grid background + screenshot baked in). */
  src: string;
  alt: string;
  /**
   * Dark-mode variant. Unlike the light image, this should be the *raw*
   * screenshot only (no background) — the component draws a dark grid panel
   * behind it and centers it, so you don't have to re-composite in Figma.
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
 * Theme-aware screenshot. In light mode it shows the baked Figma export as-is.
 * In dark mode it renders a CSS dark grid panel (a darker version of the light
 * background) with the raw screenshot centered inside it. Both variants are
 * always in the DOM; the active theme toggles which one is visible.
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

  const lightImg = (
    <img
      className={className ?? "screenshot"}
      src={lightUrl}
      alt={alt}
      loading="lazy"
    />
  );

  if (!dark) {
    return lightImg;
  }

  return (
    <>
      <span className={styles.light}>{lightImg}</span>
      <div className={clsx(styles.dark, styles.frame, className)}>
        <img className={styles.frameImg} src={darkUrl} alt={alt} loading="lazy" />
      </div>
    </>
  );
}
