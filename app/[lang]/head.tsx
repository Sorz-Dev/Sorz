import type { Locale } from "@/i18n"
import { generateSchemaMarkup } from "./schema"

export default function Head({ params }: { params: { lang: Locale } }) {
  const schemaMarkup = generateSchemaMarkup(params.lang)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaMarkup }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Estilos críticos inline */
        body {
          background-color: #1d1d1d;
          color: white;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .container {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        @media (min-width: 768px) {
          .container {
            max-width: 768px;
          }
        }
        @media (min-width: 1024px) {
          .container {
            max-width: 1024px;
          }
        }
        @media (min-width: 1280px) {
          .container {
            max-width: 1280px;
          }
        }
      `,
        }}
      />
    </>
  )
}
