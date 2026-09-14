import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <a className="skip-link" href="#not-found">Skip to content</a>
      <header className="site-header">
        <nav className="floating-nav" aria-label="Main navigation">
          <Link className="wordmark" href="/" prefetch={false} aria-label="Hammam, back to introduction">
            <span className="monogram" aria-hidden="true">hn.</span>
            <span className="wordmark-name">Hammam Nashiruddin</span>
          </Link>
          <div className="nav-links">
            <Link href="/#work" prefetch={false}>Work</Link>
            <Link className="nav-contact" href="/#contact" prefetch={false}>Contact</Link>
          </div>
        </nav>
      </header>

      <main className="hero-horizon not-found-horizon" id="not-found" tabIndex={-1}>
        <div className="not-found-layout wrap">
          <div className="not-found-copy">
            <p className="practice-label">404 / Page not found</p>
            <h1>This page took a catnap.</h1>
            <p className="hero-description">The address may be wrong, or the page may have moved. The cat has declined to comment.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/" prefetch={false}>Back to portfolio</Link>
              <Link className="text-link" href="/#work" prefetch={false}>View my work</Link>
            </div>
          </div>
          <figure className="not-found-cat">
            <Image src="/images/sdimages.jpg" alt="An unimpressed ginger cat in a black harness, with a laughing meme caption." width={201} height={251} unoptimized />
            <figcaption>Head of lost &amp; found.<br />Currently unhelpful.</figcaption>
          </figure>
        </div>
      </main>

      <footer className="site-footer wrap">
        <p>Moh. Hammam Nashiruddin</p>
        <span>Enterprise architecture, occasionally cats.</span>
      </footer>
    </div>
  );
}
