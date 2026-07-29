import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getVariant, labVariants } from "../lab-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return labVariants.map((variant) => ({ id: variant.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meta = getVariant(id);
  return {
    title: meta ? `${meta.id} ${meta.name} — Hero Lab` : "Hero Lab — Jazari One",
    description: meta?.tagline,
    robots: { index: false, follow: false },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/hero-lab-claude/${id}/`);
}
