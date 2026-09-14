import Link from "next/link";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="project-page">
      <a className="skip-link" href="#project-main">Skip to content</a>
      <header className="site-header">
        <nav className="floating-nav" aria-label="Main navigation">
          <Link className="wordmark" href="/" prefetch={false} aria-label="Hammam, back to introduction">
            <span className="monogram" aria-hidden="true">hn.</span>
            <span className="wordmark-name">Hammam Nashiruddin</span>
          </Link>
          <div className="nav-links">
            <Link href="/#projects" prefetch={false}>Projects</Link>
            <Link className="nav-contact" href="/#contact" prefetch={false}>Contact</Link>
          </div>
        </nav>
      </header>
      <main id="project-main" tabIndex={-1}>{children}</main>
      <footer className="site-footer wrap"><p>Moh. Hammam Nashiruddin</p><span>Personal projects</span></footer>
    </div>
  );
}
