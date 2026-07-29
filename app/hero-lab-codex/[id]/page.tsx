import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodexDetail } from "../CodexDetail";
import { codexConcepts, getCodexConcept } from "../data";

export const dynamicParams = false;

export function generateStaticParams() {
  return codexConcepts.map(({ id }) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const concept = getCodexConcept(id);
  return {
    title: concept ? `${concept.id} ${concept.name} — Codex Hero Lab` : "Codex Hero Lab",
    description: concept?.thesis,
    robots: { index: false, follow: false },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const concept = getCodexConcept(id);
  if (!concept) notFound();
  return <CodexDetail concept={concept} />;
}
