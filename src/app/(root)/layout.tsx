import SidebarWraper from '@/components/shared/sidebar/SidebarWraper';

import React from 'react';

type Props = React.PropsWithChildren<{}>;

const layout = ({ children }: Props) => {
  return (
    <div className="h-svh w-screen flex flex-col lg:flex-row gap-4">
      <SidebarWraper>{children}</SidebarWraper>
    </div>
  );
};

export default layout;
