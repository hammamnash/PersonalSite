import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { personalProjects } from "../_data";

const project = personalProjects.runees;
const { image } = project;

export const metadata: Metadata = {
  title: `${project.title} | Hammam Nashiruddin`,
  description:
    "Runees is a live treadmill dashboard for Garmin Forerunner over Bluetooth LE — heart rate, pace, cadence, distance, and timer, with .FIT export for Garmin Connect.",
  alternates: { canonical: "/projects/runees" },
};

export default function RuneesPage() {
  return (
    <>
      <div className="hero-horizon project-horizon">
        <div className="project-intro wrap">
          <p className="practice-label">Personal project · Live</p>
          <h1>Runees — treadmill run dashboard</h1>
        </div>
      </div>
      <section className="project-content wrap" aria-labelledby="runees-heading">
        <div className="project-body">
          <p className="section-label">What it is</p>
          <h2 id="runees-heading">Live run data from a Garmin watch, without extra hardware.</h2>
          <p>Runees connects a Garmin Forerunner to a live treadmill dashboard over Bluetooth LE. It shows heart rate, pace, cadence, distance, and timer in real time while you run.</p>
          <p>When a session ends, the app writes a valid .FIT activity file — FileId, Activity, Session, Lap, and Record records — that imports into Garmin Connect, so treadmill runs stay in your training history.</p>
          {image ? (
            <figure className="work-visual work-visual-photo">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="eager"
                unoptimized
              />
              <figcaption>
                <p>{image.caption}</p>
              </figcaption>
            </figure>
          ) : null}
          <ul className="skill-tags" aria-label="Runees stack">
            <li>Next.js 14</li>
            <li>Tailwind CSS</li>
            <li>Web Bluetooth</li>
            <li>Custom FIT encoder</li>
            <li>No backend</li>
          </ul>
          <div className="hero-actions">
            <a className="button button-primary" href="https://runees.hammamnash.site" target="_blank" rel="noopener noreferrer">Open Runees <span aria-hidden="true">↗</span></a>
            <Link className="text-link" href="/#projects" prefetch={false}>Back to personal projects</Link>
          </div>
          <p className="project-note">Built for Windows with Chrome or Edge: put the watch in Virtual Run mode, connect, and start. A mock mode explores the dashboard without a watch.</p>
        </div>
      </section>
    </>
  );
}