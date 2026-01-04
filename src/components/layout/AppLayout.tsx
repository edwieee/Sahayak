import { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  showTopBar?: boolean;
  showBottomNav?: boolean;
  topBarTitle?: string;
}

export function AppLayout({ 
  children, 
  showTopBar = true, 
  showBottomNav = true,
  topBarTitle 
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showTopBar && <TopBar title={topBarTitle} />}
      
      <main className={`flex-1 ${showBottomNav ? 'pb-20' : ''}`}>
        {children}
      </main>
      
      {showBottomNav && <BottomNav />}
    </div>
  );
}
