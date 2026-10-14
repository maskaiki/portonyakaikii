import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <div className="viewport-edge-glow" />
      <Navigation />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
