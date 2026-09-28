// Sidebar rows are sized by depth, not by item type, so a page that sits
// beside categories (e.g. "Hippius API" next to "S3 Storage") matches them.
// The top two levels use the larger row; anything deeper stays compact.
export function sidebarRowSize(level: number): string {
  return level <= 2 ? "text-base leading-5 py-3" : "text-sm";
}
