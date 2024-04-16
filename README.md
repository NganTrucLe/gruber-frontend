This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Folder structure
```bash
/.storybook                      # Storybook configuration
/.yarn                           # Yarn version manager
/public                          # Static files
/src/
├── /app                         # Main src folder/
├── /hooks                       # Dev's custom hooks
└── /libs/
    ├── /query                   # React query collections 
    │   └── <Collection name>.ts 
    └── /ui                      # Styles and components/
        └── /components          # Code for <Component>.tsx
.env                             # Environment variables
.gitattributes                   # eol setup for every files in project, dont touch
.gitignore                       # Git ignore files, dont touch
.prettierignore                  # Prettier ignore files
.prettierrc                      # Prettier rules configured, dont touch
cypress.config.ts                # Config settings for Cypress (E2E only)
jest.config.ts                   # Config for Jest
next.config.mjs                  # Default Nextjs config
package.json                     # Packages and package manager
README.MD                        # Instructions on setting up the environment
yarn.lock                        # yarn lockfile
```
