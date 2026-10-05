export type PersonalProject = {
  title: string;
  status: "live" | "in-development";
  url?: string;
};

export const personalProjects: Record<string, PersonalProject> = {
  runees: { title: "Runees Treadmill Run Dashboard", status: "live", url: "https://runees.hammamnash.site" },
  nyilehno: { title: "Nyilehno Rental Management System", status: "in-development" },
  "dengkul-fit": { title: "Dengkul.fit Running and Cycling Management", status: "in-development" },
  "modal-cocot": { title: "Modal Cocot MC Management", status: "in-development" },
  "consulting-portal": { title: "Consulting Portal", status: "in-development" },
};