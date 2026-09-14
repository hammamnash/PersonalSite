import Link from "next/link";

export default function ProjectPlaceholder({ title }: { title: string }) {
  return (
    <>
      <div className="hero-horizon project-horizon">
        <div className="project-intro wrap">
          <p className="practice-label">Personal project</p>
          <h1>{title}</h1>
        </div>
      </div>
      <section className="project-content wrap" aria-labelledby="project-status">
        <div className="project-notice">
          <h2 id="project-status">Details coming soon</h2>
          <p>I&apos;ll add more about this project here.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/#projects" prefetch={false}>Back to personal projects</Link>
            <Link className="text-link" href="/" prefetch={false}>Back to portfolio</Link>
          </div>
        </div>
      </section>
    </>
  );
}
