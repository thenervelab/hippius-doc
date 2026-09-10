import React, { type ReactNode } from "react";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./Screenshot.module.css";

interface ScreenshotProps {
  /** Light (default) image, e.g. "/img/desktop/login-screen.png".
   *  By default this is the full Figma export (grid background + screenshot
   *  baked in). Pass `raw` when it is the bare screenshot instead. */
  src: string;
  alt: string;
  /**
   * Dark-mode variant. Unlike the default light image, this should be the
   * *raw* screenshot only (no background) — the component draws a dark grid
   * panel behind it and centers it, so you don't have to re-composite in Figma.
   * - omit it → the light image is shown in both themes (safe default while
   *   there is no dark screenshot yet);
   * - `dark` (boolean) → auto-resolves the `-dark` sibling
   *   (login-screen.png → login-screen-dark.png);
   * - `dark="/img/.../other-dark.png"` → an explicit dark path.
   */
  dark?: boolean | string;
  /**
   * Opt in to compositing the light image too. Pass this when `src` is a raw
   * screenshot with no background baked in: the component then draws the Figma
   * light grid panel behind it and centers it, exactly like it already does
   * for `dark`. Omit it (the default) for the existing baked Figma exports,
   * which are rendered untouched.
   */
  raw?: boolean;
  className?: string;
}

/**
 * Theme-aware screenshot. By default light mode shows the baked Figma export
 * as-is, while dark mode renders a CSS dark grid panel with the raw screenshot
 * centered inside it. With `raw`, light mode gets the same treatment against
 * the Figma light grid SVG. Both variants are always in the DOM; the active
 * theme toggles which one is visible.
 */
export default function Screenshot({
  src,
  alt,
  dark,
  raw,
  className,
}: ScreenshotProps): ReactNode {
  const lightUrl = useBaseUrl(src);
  const darkPath =
    typeof dark === "string"
      ? dark
      : src.replace(/(\.[a-zA-Z0-9]+)$/, "-dark$1");
  const darkUrl = useBaseUrl(darkPath);

  // The light half: the baked export as-is, or — with `raw` — the bare
  // screenshot centered on the light grid panel.
  const lightNode = raw ? (
    <div className={clsx(styles.frame, styles.lightFrame, className)}>
      <img
        className={styles.frameImg}
        src={lightUrl}
        alt={alt}
        loading="lazy"
      />
    </div>
  ) : (
    <img
      className={className ?? "screenshot"}
      src={lightUrl}
      alt={alt}
      loading="lazy"
    />
  );

  if (!dark) {
    return lightNode;
  }

  return (
    <>
      <span className={styles.light}>{lightNode}</span>
      <div
        className={clsx(styles.dark, styles.frame, styles.darkFrame, className)}
      >
        <img
          className={styles.frameImg}
          src={darkUrl}
          alt={alt}
          loading="lazy"
        />
      </div>
    </>
  );
}
