import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProjectForm } from "@/app/admin/(dashboard)/projects/ProjectForm";
import { safeQuery } from "@/lib/safe-query";
import { dummyProjects } from "@/lib/admin/dummy-data";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: project } = await safeQuery(
    () => prisma.project.findUnique({ where: { id } }),
    dummyProjects.find((p) => p.id === id) ?? null,
  );
  if (!project) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={project.title} />
      <ProjectForm project={project} />
    </div>
  );
}
