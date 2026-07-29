import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VariantView } from "../../hero-lab/VariantView";
import { getVariant, labVariants } from "../../hero-lab/lab-data";

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
    title: meta ? `${meta.id} ${meta.name} — Claude Hero Lab` : "Claude Hero Lab",
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
  if (!getVariant(id)) notFound();
  return <VariantView id={id} basePath="/hero-lab-claude" />;
}
