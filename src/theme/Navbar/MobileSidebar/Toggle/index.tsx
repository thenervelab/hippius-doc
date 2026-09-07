import React, { type ReactNode } from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import IconMenu from '@theme/Icon/Menu';

export default function MobileSidebarToggle(): ReactNode {
  const { toggle, shown } = useNavbarMobileSidebar();
  return (
    <button 
      onClick={toggle}
      aria-label={translate({
        id: 'theme.docs.sidebar.toggleSidebarButtonAriaLabel',
        message: 'Toggle navigation bar',
        description:
          'The ARIA label for hamburger menu button of mobile navigation',
      })}
      aria-expanded={shown}
      className=" size-8 flex lg:hidden flex-col gap-y-2 justify-center" 
      type="button"
    >
      {/* Bars are painted with an explicit color, so give them a dark-mode
          value too - the light-mode near-black is invisible on the dark navbar. */}
      <div className="h-0.5 bg-[#1c1e21] dark:bg-grey-10 rounded-full w-full"></div>
      <div className="h-0.5 bg-[#1c1e21] dark:bg-grey-10 rounded-full w-[60%]"></div>
    </button>
  );
}
