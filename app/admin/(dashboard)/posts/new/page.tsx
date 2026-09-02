import { PageHeader } from "@/components/admin/PageHeader";
import { PostForm } from "@/app/admin/(dashboard)/posts/PostForm";

export default function NewPost() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="New post" />
      <PostForm />
    </div>
  );
}
