import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Action,
  Console,
  DataRow,
  Key,
  Note,
  OutLink,
  Record,
  Seam,
  SectionHead,
  Shell,
  TagList,
} from "@/components/primitives/register";
import { StructuredData } from "@/components/ui/StructuredData";
import { getProject, projects } from "@/content/projects";
import { articleSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return pageMetadata({
    title: project.name,
    description: `${project.tagline}. ${project.summary}`.slice(0, 300),
    path: `/projects/${project.slug}`,
    type: "article",
    keywords: project.stack.slice(0, 8),
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <StructuredData
        data={[
          articleSchema({
            path: `/projects/${project.slug}`,
            headline: project.name,
            description: project.tagline,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.name, path: `/projects/${project.slug}` },
          ]),
        ]}
      />

      <section
        data-register="console"
        aria-label={project.name}
        className="relative overflow-hidden border-b border-line bg-abyss"
      >
        <div
          aria-hidden="true"
          className="console-grid console-grid-fade pointer-events-none absolute inset-0"
        />
        <Shell className="relative">
          <nav aria-label="Breadcrumb" className="pt-10">
            <ol className="t-data flex flex-wrap items-center gap-2 text-console-dim">
              <li>
                <Link href="/" className="link inline-block min-h-[26px] py-[3px] text-console-dim">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/projects" className="link inline-block min-h-[26px] py-[3px] text-console-dim">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-console-muted">
                {project.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-12 pb-14 pt-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:pb-20">
            <div>
              <div className="rise flex flex-wrap items-center gap-x-4 gap-y-2">
                <Key tone="orch">{project.kicker}</Key>
                <span
                  className="t-key rounded-xs border px-2 py-1"
                  style={{
                    borderColor:
                      project.ownership === "Solo"
                        ? "color-mix(in srgb, var(--color-verify) 55%, transparent)"
                        : "var(--color-line-strong)",
                    color:
                      project.ownership === "Solo"
                        ? "var(--color-verify)"
                        : "var(--color-console-muted)",
                  }}
                >
                  {project.ownership}
                </span>
              </div>
              <h1
                className="rise t-display mt-6 text-console-ink"
                style={{ ["--rise-delay" as string]: "80ms" }}
              >
                {project.name}
              </h1>
              <p
                className="rise t-lead measure mt-4 text-orch"
                style={{ ["--rise-delay" as string]: "140ms" }}
              >
                {project.tagline}
              </p>
              <p
                className="rise t-body measure mt-6 text-console-muted"
                style={{ ["--rise-delay" as string]: "200ms" }}
              >
                {project.summary}
              </p>
              <ul
                className="rise mt-8 flex flex-wrap gap-3"
                style={{ ["--rise-delay" as string]: "260ms" }}
              >
                {project.repositories.map((repo) => (
                  <li key={repo.url}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action action-ghost"
                    >
                      {repo.label}
                      <span aria-hidden="true">&nearr;</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <dl
              className="rise self-end"
              style={{ ["--rise-delay" as string]: "320ms" }}
            >
              <DataRow label="Ownership" value={project.ownership} />
              <DataRow label="Attribution" value={project.ownershipNote} />
              <DataRow label="Status" value={project.status} />
            </dl>
          </div>
        </Shell>
      </section>

      {/* =========================================================== Findings */}
      <Seam enters="record" />
      <Record id="findings" tight>
        <Shell>
          <SectionHead
            index="01"
            eyebrow="From the repository"
            title="What the published source shows"
            intro="Read directly from the public source rather than from the project name or the résumé."
            register="record"
            wide
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-x-16">
            {project.repositoryFindings.map((group, index) => (
              <section
                key={group.heading}
                data-reveal="idle"
                style={{ ["--reveal-delay" as string]: `${(index % 2) * 80}ms` }}
              >
                <h3 className="t-title border-t-2 border-orch-ink pt-5 text-record-ink">
                  {group.heading}
                </h3>
                <ul className="mt-4">
                  {group.points.map((point) => (
                    <li
                      key={point}
                      className="t-small flex gap-3 border-t border-rule py-3 text-record-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] block size-[6px] shrink-0 rotate-45"
                        style={{ backgroundColor: "var(--color-source-ink)" }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Shell>
      </Record>

      {/* ================================================ Demonstrates, limits */}
      <Seam enters="console" />
      <Console id="assessment">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHead
                index="02"
                eyebrow="Demonstrates"
                title="What this project is evidence of"
                wide
              />
              <ul className="mt-8">
                {project.demonstrates.map((item, index) => (
                  <li
                    key={item}
                    className="t-body flex gap-4 border-t border-line py-3.5 text-console-muted"
                    data-reveal="idle"
                    style={{ ["--reveal-delay" as string]: `${index * 55}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[10px] block size-[7px] shrink-0 rotate-45"
                      style={{ backgroundColor: "var(--color-verify)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Key tone="muted">Stack</Key>
                <TagList items={project.stack} className="mt-4" />
              </div>
            </div>

            <div className="lg:pt-2">
              <div className="border border-fault/40 p-6 md:p-8" data-reveal="idle">
                <Key tone="fault">Limitations</Key>
                <p className="t-small mt-4 text-console-muted">
                  Recorded so the page is checkable. Nothing here is presented as
                  current practice unless it says so.
                </p>
                <ul className="mt-5">
                  {project.limitations.map((item) => (
                    <li
                      key={item}
                      className="t-small border-t border-line py-3 text-console-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Note className="mt-6">
                Attribution: {project.ownershipNote}
              </Note>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-3 border-t border-line pt-8">
            <Action href="/projects" variant="primary">
              All projects
            </Action>
            <Action href="/case-studies">Enterprise case studies</Action>
          </div>
        </Shell>
      </Console>
    </>
  );
}
