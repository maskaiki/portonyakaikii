import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CodeDragonsCanvas } from "@/components/shared/CodeDragonsCanvas";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <SmoothScrollProvider>
      <div className="viewport-edge-glow" />
      <CodeDragonsCanvas />
      <Navigation />
      <main id="main-content">{children}</main>
      <Footer />
    </SmoothScrollProvider>
  );
}

