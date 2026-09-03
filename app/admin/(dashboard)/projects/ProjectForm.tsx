"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Field } from "@/components/admin/form/Field";
import { TextAreaField } from "@/components/admin/form/TextAreaField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SaveBar } from "@/components/admin/SaveBar";
import { fireToast } from "@/components/admin/Toast";
import {
  createProject,
  deleteProject,
  updateProject,
  type ProjectActionState,
} from "@/app/admin/(dashboard)/projects/actions";
import type { Project } from "@/app/generated/prisma/client";
import { slugify } from "@/lib/slugify";

const initialState: ProjectActionState = { status: "idle" };

const caseStudyFields: { name: keyof Project; label: string }[] = [
  { name: "aboutProject", label: "About Project" },
  { name: "challenge", label: "The challenge" },
  { name: "approach", label: "The approach" },
  { name: "product", label: "The product" },
  { name: "technology", label: "The technology" },
  { name: "infrastructure", label: "The infrastructure" },
  { name: "outcome", label: "The outcome" },
];

const roleFields: { name: keyof Project; label: string }[] = [
  { name: "productRole", label: "Product Role" },
  { name: "designRole", label: "Design Role" },
  { name: "engineeringRole", label: "Engineering Role" },
  { name: "infrastructureRole", label: "Infrastructure Role" },
];

export function ProjectForm({ project }: { project?: Project }) {
  const action = project ? updateProject.bind(null, project.id) : createProject;
  const [state, formAction] = useActionState(action, initialState);

  // Slug auto-fills from the title while creating a new project, right
  // up until the admin edits the slug field themselves — a deliberate
  // edit always wins, and editing an existing (already-published, maybe
  // already-linked-to) project never auto-changes its slug at all.
  const [slug, setSlug] = useState(project?.slug ?? "");
  const slugTouched = useRef(!!project);

  useEffect(() => {
    if (state.status === "saved" || state.status === "error") fireToast(state.status);
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-[15px] font-semibold text-black">Card</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Title"
            name="title"
            required
            defaultValue={project?.title}
            onChange={(e) => {
              if (!slugTouched.current) setSlug(slugify(e.target.value));
            }}
          />
          <Field
            label="Slug"
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              slugTouched.current = true;
              setSlug(e.target.value);
            }}
            hint="Used in the URL, e.g. /portfolio/your-slug"
          />
        </div>
        <Field
          label="Industry category"
          name="meta"
          required
          defaultValue={project?.meta}
          placeholder="INSURANCE - 2026"
        />
        <TextAreaField
          label="Summary"
          name="summary"
          required
          rows={3}
          recommendedMin={120}
          recommendedMax={160}
          defaultValue={project?.summary}
          hint="Card body — sits in a fixed-height card on Portfolio list."
        />
        <Field
          label="Tags"
          name="tags"
          required
          defaultValue={project?.tags.join(", ")}
          placeholder="PRODUCT, DESIGN, ENGINEERING, HOSTED BY US"
          hint="Comma-separated."
        />
        <ImageUpload name="coverUrl" label="Cover image" defaultValue={project?.coverUrl} />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-[15px] font-semibold text-black">Case study</h2>
        <p className="font-body text-[12px] text-text-body">
          Same order as the live Portfolio details page.
        </p>
        {caseStudyFields.map((f) => (
          <TextAreaField
            key={f.name}
            label={f.label}
            name={f.name}
            required
            rows={3}
            defaultValue={project?.[f.name] as string | undefined}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-[15px] font-semibold text-black">Roles</h2>
        {roleFields.map((f) => (
          <Field key={f.name} label={f.label} name={f.name} required defaultValue={project?.[f.name] as string | undefined} />
        ))}
      </div>

      <SaveBar
        onDelete={project ? deleteProject.bind(null, project.id, project.slug) : undefined}
        deleteLabel="Delete project"
      />
    </form>
  );
}
