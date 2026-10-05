export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type PersonalProject = {
  title: string;
  status: "live" | "in-development";
  url?: string;
  /**
   * Expanded accordion copy. Two paragraphs maximum — the same shape as the
   * selected-experience accordion. Projects without a body stay a plain link.
   */
  body?: readonly [string] | readonly [string, string];
  features?: readonly string[];
  image?: ProjectImage;
};

export const personalProjects: Record<string, PersonalProject> = {
  runees: {
    title: "Runees Treadmill Run Dashboard",
    status: "live",
    url: "https://runees.hammamnash.site",
    image: {
      src: "/images/projects/runees/runees-dashboard.webp",
      alt: "Screenshot of the Runees treadmill run dashboard.",
      width: 1400,
      height: 1043,
      caption: "Captured from the live app at runees.hammamnash.site.",
    },
    body: [
      "A live treadmill dashboard for Garmin watches. Runees connects a Forerunner over Bluetooth LE and shows heart rate, pace, cadence, distance, and timer in real time while you run.",
      "When a session ends it writes a valid .FIT activity file — FileId, Activity, Session, Lap, and Record records — that imports into Garmin Connect, so treadmill runs still count in your training history.",
    ],
    features: [
      "Live heart rate, pace, cadence, distance, and timer",
      "Garmin Virtual Run support",
      ".FIT export for Garmin Connect",
      "Mock mode without a watch",
      "No backend",
    ],
  },
  nyilehno: { title: "Nyilehno Rental Management System", status: "in-development" },
  "dengkul-fit": { title: "Dengkul.fit Running and Cycling Management", status: "in-development" },
  "modal-cocot": { title: "Modal Cocot MC Management", status: "in-development" },
  "consulting-portal": { title: "Consulting Portal", status: "in-development" },
};
