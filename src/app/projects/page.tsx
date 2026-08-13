import type { Metadata } from "next";
import {
  Action,
  Console,
  Key,
  Note,
  Record,
  Seam,
  SectionHead,
  Shell,
} from "@/components/primitives/register";
import { ProjectRow } from "@/components/sections/rows";
import { StructuredData } from "@/components/ui/StructuredData";
import {
  collaborativeProjects,
  projects,
  projectsIntro,
  soloProjects,
} from "@/content/projects";
import { breadcrumbSchema, itemListSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Independent software built outside enterprise delivery, documented from the public repositories. Solo and collaborative work is separated, and anything that could not be verified or run is stated as such.",
  path: "/projects",
  keywords: [
    "React Supabase project",
    "Android Java project",
    "Next.js project",
    "Java web application",
  ],
});

export default function ProjectsPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
          itemListSchema({
            path: "/projects",
            name: "Independent projects",
            items: projects.map((project) => ({
              name: project.name,
              path: `/projects/${project.slug}`,
            })),
          }),
        ]}
      />

      <section
        data-register="console"
        aria-label="Projects"
        className="relative overflow-hidden border-b border-line bg-abyss"
      >
        <div
          aria-hidden="true"
          className="console-grid console-grid-fade pointer-events-none absolute inset-0"
        />
        <Shell className="relative">
          <div className="grid gap-12 pb-14 pt-14 md:pt-20 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:pb-20">
            <div>
              <p className="rise t-key text-orch">{projectsIntro.eyebrow}</p>
              <h1
                className="rise t-display mt-6 max-w-[16ch] text-console-ink"
                style={{ ["--rise-delay" as string]: "80ms" }}
              >
                Software built outside the Oracle work
              </h1>
              <p
                className="rise t-lead measure mt-6 text-console-muted"
                style={{ ["--rise-delay" as string]: "160ms" }}
              >
                {projectsIntro.intro}
              </p>
            </div>
            <div
              className="rise self-end border border-line bg-console p-6"
              style={{ ["--rise-delay" as string]: "240ms" }}
            >
              <Key tone="verify">Read from source</Key>
              <p className="t-small mt-4 text-console-muted">
                {projectsIntro.repositoryNote}
              </p>
            </div>
          </div>
        </Shell>
      </section>

      <Seam enters="record" />
      <Record id="solo" tight>
        <Shell>
          <SectionHead
            index="01"
            eyebrow="Solo"
            title={projectsIntro.soloHeading}
            intro={projectsIntro.soloIntro}
            register="record"
            wide
          />
          <ul className="mt-10">
            {soloProjects.map((project) => (
              <ProjectRow
                key={project.slug}
                project={project}
                register="record"
              />
            ))}
          </ul>
        </Shell>
      </Record>

      <Seam enters="console" />
      <Console id="collaborative" tight>
        <Shell>
          <SectionHead
            index="02"
            eyebrow="With a team"
            title={projectsIntro.collaborativeHeading}
            intro={projectsIntro.collaborativeIntro}
            wide
          />
          <ul className="mt-10">
            {collaborativeProjects.map((project) => (
              <ProjectRow
                key={project.slug}
                project={project}
                register="console"
              />
            ))}
          </ul>
          <Note className="mt-10">
            No project on this site has a public deployment, so no demo link is
            published. Where a project could not be run in the build
            environment, its page says so.
          </Note>
          <div className="mt-10 flex flex-wrap gap-3">
            <Action href="/case-studies" variant="primary">
              Enterprise case studies
            </Action>
            <Action href="/contact">Contact</Action>
          </div>
        </Shell>
      </Console>
    </>
  );
}
