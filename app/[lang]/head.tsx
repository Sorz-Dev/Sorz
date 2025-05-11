import type { Locale } from "@/i18n"
import { generateSchemaMarkup } from "./schema"

export default function Head({ params }: { params: { lang: Locale } }) {
  const schemaMarkup = generateSchemaMarkup(params.lang)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaMarkup }} />
    </>
  )
}
