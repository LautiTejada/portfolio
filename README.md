# Lautaro Tejada — Portfolio

Portfolio personal construido con **Next.js 16**, **TypeScript**, **Tailwind CSS v4** y **MDX**.

## Stack

- **Framework:** Next.js 16 (App Router, React 19, Turbopack)
- **Styling:** Tailwind CSS v4, dark/light mode
- **Content:** MDX con frontmatter validado
- **i18n:** Español / English con locale routing
- **Email:** Resend API (formulario de contacto)
- **SEO:** Sitemap, robots.txt, Open Graph dinámico, JSON-LD

## Estructura

```
src/
├── app/              # Routes (App Router)
│   ├── [locale]/     # Locale-aware pages
│   └── actions/      # Server actions
├── components/       # React components
├── content/          # MDX projects (es/en)
├── hooks/            # Custom hooks
├── i18n/             # i18n config & dictionaries
└── lib/              # Types & content loaders
```

## Desarrollo

```bash
npm install
npm run dev
```

## Variables de entorno

```env
RESEND_API_KEY=       # Resend API key para formulario de contacto
NEXT_PUBLIC_SITE_URL= # URL del sitio (default: https://lautarotejada.dev)
```

## Build

```bash
npm run build
```
