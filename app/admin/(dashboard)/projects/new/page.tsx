import { PageHeader } from "@/components/admin/PageHeader";
import { ProjectForm } from "@/app/admin/(dashboard)/projects/ProjectForm";

export default function NewProject() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="New project" />
      <ProjectForm />
    </div>
  );
}
