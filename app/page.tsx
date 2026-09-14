import Image from "next/image";
import Link from "next/link";
import { personalProjects } from "./projects/_data";

const career = [
  {
    period: "Dec 2023 to present",
    role: "Consultant, Enterprise Architecture",
    company: "ATD Solution Indonesia",
    description: "EA portfolio development, tool configuration and administration, client coaching, and solution demonstrations.",
  },
  {
    period: "Dec 2022 to Nov 2023",
    role: "Jr. Product Manager, WMS",
    company: "Social Bella Indonesia",
    description: "Requirements, product planning, testing, and releases for an in-house warehouse management system, including implementation in Vietnam.",
  },
  {
    period: "Dec 2021 to Dec 2022",
    role: "Strategic Inventory Analyst",
    company: "Social Bella Indonesia",
    description: "Reporting automation, dashboard development, and investigation of inventory issues across warehouse and ERP systems.",
  },
  {
    period: "Feb 2021 to Nov 2021",
    role: "Inventory Data Analyst",
    company: "Ternaknesia Farm Innovation",
    description: "Data pipelines, inventory reporting, customer segmentation, market basket analysis, and price-comparison automation.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <nav className="floating-nav" aria-label="Main navigation">
          <a className="wordmark" href="#home" aria-label="Hammam, back to introduction">
            <span className="monogram" aria-hidden="true">hn.</span>
            <span className="wordmark-name">Hammam Nashiruddin</span>
          </a>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a className="nav-contact" href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <div className="hero-horizon" id="home">
          <section className="hero wrap" aria-labelledby="intro-heading">
            <div className="hero-copy">
              <p className="intro-name">Moh. Hammam Nashiruddin</p>
              <p className="practice-label">Enterprise Architecture Consultant</p>
              <h1 id="intro-heading">Making sense of <span>business and technology.</span></h1>
              <p className="hero-description">I help teams understand how their business, applications, and data fit together. My work in enterprise architecture is grounded in hands-on product delivery and analytics.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">View my work</a>
                <a className="text-link" href="#about">The background behind it</a>
              </div>
              <p className="location">Based in Greater Jakarta, Indonesia</p>
            </div>

            <figure className="experience-map" aria-labelledby="map-title">
              <div className="map-header"><figcaption id="map-title">My working perspective</figcaption></div>
              <p className="map-intro">Connecting the bigger picture to the day-to-day.</p>
              <div className="map-node map-node-primary">
                <span className="node-kicker">Current practice</span>
                <strong>Enterprise architecture</strong>
                <p>Business needs, application portfolios,<br className="desktop-break" /> data, and technology.</p>
              </div>
              <div className="map-connector" aria-hidden="true"><span /></div>
              <div className="map-foundations">
                <div className="map-node"><strong>Product delivery</strong><p>User needs, requirements,<br className="desktop-break" /> testing, and releases.</p></div>
                <div className="map-node"><strong>Data analytics</strong><p>Operational data,<br className="desktop-break" /> patterns, and decisions.</p></div>
              </div>
              <p className="map-caption">A summary of my experience, not a client architecture.</p>
            </figure>
          </section>
          <div className="hero-foot wrap"><span>Architecture with an operational perspective</span><span>EA consulting · Product management · Data analytics</span></div>
        </div>

        <section className="work section wrap" id="work" aria-labelledby="work-heading">
          <div className="section-heading">
            <p className="section-label">Selected experience</p>
            <div>
              <h2 id="work-heading">The work behind the perspective.</h2>
              <p>From modelling an enterprise to improving the systems people use every day.</p>
            </div>
          </div>
          <div className="work-list">
            <details className="work-item">
              <summary><span className="work-title">Making enterprise architecture usable</span><span className="work-index">01</span><span className="expand-mark" aria-hidden="true" /></summary>
              <div className="work-detail">
                <div className="work-meta"><p>ATD Solution Indonesia</p><span>Enterprise architecture consulting</span></div>
                <div className="work-body">
                  <figure className="work-visual">
                    <Image src="/images/experience/togaf-archimate-core.png" alt="TOGAF ADM cycle with requirements management at its centre and ArchiMate business, application, and technology layers mapped to phases B, C, and D." width={705} height={596} unoptimized />
                    <figcaption>
                      <p>TOGAF ADM and ArchiMate Core. Framework reference, not an ATD client deliverable.</p>
                      <div className="visual-links"><a href="https://www.archimetric.com/id/quick-learning-archimate-part-1-core-concepts/">Source: Archimetric</a><a href="/images/experience/togaf-archimate-core.png">View full-size diagram</a></div>
                    </figcaption>
                  </figure>
                  <p>I develop enterprise architecture portfolios using TOGAF practices and ArchiMate modelling, and configure and administer the tools that hold them.</p><p>The work includes client coaching, solution demonstrations, and collaboration with colleagues across Malaysia, Singapore, Hong Kong, and Australia. My client experience spans government, manufacturing, mining, and ICT, among other sectors.</p><ul className="skill-tags" aria-label="Enterprise architecture methods"><li>TOGAF</li><li>ArchiMate</li><li>EA tools</li></ul></div>
              </div>
            </details>
            <details className="work-item">
              <summary><span className="work-title">Warehouse management, built around its users</span><span className="work-index">02</span><span className="expand-mark" aria-hidden="true" /></summary>
              <div className="work-detail">
                <div className="work-meta"><p>Social Bella Indonesia</p><span>Product management</span></div>
                <div className="work-body">
                  <figure className="work-visual work-visual-photo">
                    <Image src="/images/experience/warehouse-product-management.webp" alt="A warehouse associate with a barcode scanner and a product specialist reviewing a packing workflow on a tablet." width={1024} height={576} loading="lazy" unoptimized />
                    <figcaption>AI-generated illustration of warehouse collaboration, not a Social Bella facility or its staff.</figcaption>
                  </figure>
                  <p>I managed product work for Sociolla&apos;s in-house warehouse management system: gathering requirements, writing PRDs, planning sprints, testing changes, and coordinating releases.</p><p>User interviews and testing sessions informed improvements. I also worked on the end-to-end implementation in Vietnam, collaborating with engineering, business, and product teams across Indonesia, Vietnam, and India.</p><ul className="skill-tags" aria-label="Product methods"><li>Requirements &amp; PRDs</li><li>User testing</li><li>Release planning</li></ul></div>
              </div>
            </details>
            <details className="work-item">
              <summary>
                <span className="work-title">Turning operational data into useful reporting</span>
                <span className="work-index">03</span>
                <span className="expand-mark" aria-hidden="true" /></summary>
              <div className="work-detail">
                <div className="work-meta"><p>Social Bella &amp; Ternaknesia</p><span>Inventory and data analytics</span></div>
                <div className="work-body">
                  <figure className="work-visual work-visual-photo">
                    <Image src="/images/experience/inventory-data-analytics-v2.webp" alt="An analyst working at a keyboard beside a light-themed dashboard and a notebook with a workflow sketch." width={1024} height={576} loading="lazy" unoptimized />
                    <figcaption>AI-generated illustration of analytical work, not a real employer dashboard or a portrait of me.</figcaption>
                  </figure>
                  <p>I built reporting pipelines and dashboards, automated repetitive spreadsheet work with Power Query, and investigated inventory discrepancies in warehouse and ERP systems.</p><p>At Ternaknesia, I also worked on customer segmentation, market basket analysis, and web scraping for price comparisons. That operational background still shapes the questions I ask when reviewing business and technology requirements.</p><ul className="skill-tags" aria-label="Analytics tools"><li>Power Query</li><li>Looker Studio</li><li>Python &amp; SQL</li></ul></div>
              </div>
            </details>
          </div>
        </section>

        <section className="projects section wrap" id="projects" aria-labelledby="projects-heading">
          <div className="section-heading">
            <p className="section-label">Web apps I&apos;m developing</p>
            <div><h2 id="projects-heading">Personal projects</h2><p>A separate space for my web app projects. Details coming soon.</p></div>
          </div>
          <ul className="project-list" role="list">
            {Object.entries(personalProjects).map(([slug, project]) => (
              <li key={slug}>
                <Link className="project-link" href={`/projects/${slug}`} prefetch={false}>
                  <span className="project-name">{project.title}</span>
                  <span className="project-status">Details coming soon</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="about section wrap" id="about" aria-labelledby="about-heading">
          <div className="about-intro">
            <p className="section-label">The background | Work History</p>
            <h2 id="about-heading">An analyst&apos;s curiosity.<br />A product mindset.</h2>
            <p>I started with inventory data and warehouse operations, moved into product management, and now work in enterprise architecture consulting.</p>
            <p>That gives me a practical starting point: understand the work people need to do before deciding how the technology should support it.</p></div>
          <ol className="career-list" aria-label="Career history">
            {career.map((job) => (
              <li className="career-item" key={`${job.company}-${job.role}`}>
                <p className="career-period">{job.period}</p><h3>{job.role}</h3><p className="career-company">{job.company}</p><p className="career-description">{job.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="exploration section wrap" id="exploring-ai" aria-labelledby="exploration-heading">
          <div className="section-heading">
            <div><p className="section-label">Currently exploring</p><p className="exploration-topic">Agentic AI</p></div>
            <h2 id="exploration-heading">Putting AI agents to practical use.</h2>
          </div>
          <div className="exploration-layout">
            <div className="exploration-copy">
              <p>I&apos;m interested in AI agents that can work with tools, carry context between steps, and help complete tasks beyond a chat response.</p>
              <p>My enterprise architecture background shapes the questions I bring to this: where agents fit into a business process, what information they need, which systems they should access, and where people should stay in control.</p>
              <dl className="exploration-topics">
                <div>
                  <dt>Hands-on experimentation</dt>
                  <dd>Exploring AI-assisted development and reusable instructions through personal projects.</dd>
                </div>
                <div>
                  <dt>Enterprise questions</dt>
                  <dd>Exploring how permissions, human review, and traceable actions can make agent workflows useful in an organizational setting.</dd>
                </div>
                <div>
                  <dt>Task Automation</dt>
                  <dd>Enhancing how certan process and workflow can be automated by the AI, but still in scope of goals and control of the users.</dd>
                </div>
              </dl>
            </div>
            <div className="exploration-aside">
              <figure className="agent-workflow" aria-labelledby="agent-workflow-title">
                <figcaption id="agent-workflow-title">Conceptual agent workflow</figcaption>
                <ol className="agent-steps" role="list">
                  <li><strong>Task</strong><span>Define the goal and boundaries.</span><span className="agent-arrow" aria-hidden="true">↓</span></li>
                  <li><strong>Context &amp; tools</strong><span>Provide information and scoped access.</span><span className="agent-arrow" aria-hidden="true">↓</span></li>
                  <li><strong>Agent actions</strong><span>Work through steps and check outputs.</span><span className="agent-arrow" aria-hidden="true">↓</span></li>
                  <li className="agent-review"><strong>Human review</strong><span>Inspect the result and decide what follows.</span></li>
                </ol>
                <p className="agent-workflow-note">Illustrative sequence, not a deployed system. Human approval can also be required before consequential actions.</p>
              </figure>
              <div className="exploration-example">
                <h3>An example: this website</h3>
                <p>Built with AI assistance, with me directing the content and design. The workflow included implementation, generated imagery, and automated browser checks.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="practice section wrap" aria-labelledby="practice-heading">
          <div className="practice-panel">
            <div><p className="section-label">In practice</p><h2 id="practice-heading">Frameworks, tools,<br />and conversations.</h2><p className="practice-intro">I work across modelling, analysis, and delivery, with the tool chosen for the task.</p></div>
            <dl className="tool-list">
              <div><dt>Architecture</dt><dd>TOGAF · ArchiMate · COBIT<br />Bizzdesign Horizzon· Bizzdesign HOPEX · SAP LeanIX · Orbus iServer · Avolution ABACUS</dd></div>
              <div><dt>Analysis &amp; delivery</dt><dd>SQL · MongoDB · Python · Power Query · Looker Studio · Power BI · Jira</dd></div>
              <div><dt>Selected training</dt><dd>TOGAF 10, ATD Learning (2023)<br />COBIT 2019, ATD Learning (2024)</dd></div>
              <div><dt>Languages</dt><dd>Indonesian, native · English, professional</dd></div>
            </dl>
          </div>
        </section>

        <section className="contact section wrap" id="contact" aria-labelledby="contact-heading">
          <p className="section-label">Get in touch</p>
          <div className="contact-content">
            <div>
              <h2 id="contact-heading">Have a role in mind?</h2>
              <p>For conversations about enterprise architecture, product, or data, you can reach me directly.</p>
            </div>
            <div className="contact-links">
              <a className="email-link" href="mailto:hammamnash0@gmail.com">hammamnash0@gmail.com</a>
              <a className="email-link" href="mailto:me@hammamnash.site">me@hammamnash.site</a>
              <a className="text-link" href="https://www.linkedin.com/in/hammamnash/" target="_blank" rel="noopener noreferrer">LinkedIn profile <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer wrap"><p>© {new Date().getFullYear()} Moh. Hammam Nashiruddin · Build by GPT-6 Astra Running on Hermes Agent</p><span>Greater Jakarta, Indonesia</span><a href="#home">Back to top <span aria-hidden="true">↑</span></a></footer>
    </>
  );
}
