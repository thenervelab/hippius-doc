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
      <div className="h-0.5 bg-[#1c1e21] rounded-full w-full"></div>
      <div className="h-0.5 bg-[#1c1e21] rounded-full w-[60%]"></div>
    </button>
  );
}
