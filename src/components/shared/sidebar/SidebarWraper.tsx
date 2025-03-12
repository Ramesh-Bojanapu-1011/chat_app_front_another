import React from 'react';
import DescktopNav from './nav/DescktopNav';
import MobileNav from './nav/MobileNav';

type Props = React.PropsWithChildren<{}>;

const SidebarWraper = ({ children }: Props) => {
  return (
    <div className="h-full w-full flex  flex-col lg:flex-row gap-4">
      <MobileNav />
      <DescktopNav />
      <main className="h-full w-full flex gap-4">{children}</main>
    </div>
  );
};

export default SidebarWraper;
