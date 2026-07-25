import type { Metadata } from "next";
import { BlogIndex } from "./BlogIndex";

export const metadata: Metadata = {
  title: "Blog — Jazari One",
  description:
    "Practical guides for sending, receiving, and understanding money across borders.",
};

export default function BlogPage() {
  return <BlogIndex />;
}
