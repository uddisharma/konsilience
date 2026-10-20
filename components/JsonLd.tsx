import { getGlobalSchema } from "@/lib/schema";

export interface JsonLdProps {
  data?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export default function JsonLd({ data }: JsonLdProps = {}) {
  let schema: Record<string, unknown>;

  if (!data) {
    schema = getGlobalSchema();
  } else if (Array.isArray(data)) {
    schema = {
      "@context": "https://schema.org",
      "@graph": data,
    };
  } else if ("@context" in data) {
    schema = data;
  } else {
    schema = {
      "@context": "https://schema.org",
      ...data,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
