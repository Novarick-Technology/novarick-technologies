import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { ReorderButtons } from "@/components/admin/ReorderButtons";
import { moveProject, toggleProjectPublished } from "@/app/admin/projects/actions";

export default async function ProjectsList() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Projects" action={{ label: "New project", href: "/admin/projects/new" }} />

      <div className="flex flex-col divide-y divide-black/10 rounded-panel border border-black/10">
        {projects.length === 0 && (
          <p className="p-4 font-body text-[14px] text-text-body">No projects yet.</p>
        )}
        {projects.map((p, i) => (
          <div key={p.id} className="flex items-center gap-4 px-4 py-3">
            <ReorderButtons
              disableUp={i === 0}
              disableDown={i === projects.length - 1}
              onMove={(direction) => moveProject(p.id, direction)}
            />
            <Link href={`/admin/projects/${p.id}`} className="flex min-w-0 flex-1 flex-col gap-0.5 hover:underline">
              <span className="truncate font-heading text-[14px] font-medium text-black">{p.title}</span>
              <span className="truncate font-body text-[12px] text-text-body">{p.meta}</span>
            </Link>
            <PublishToggle published={p.published} onToggle={toggleProjectPublished.bind(null, p.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
