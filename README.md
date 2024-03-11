This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Pre-Requirements

#### Node.js Version

This project was built using [Node.js 18](https://nodejs.org/en/blog/release/v18.12.0). I'd recommend making sure you're using at least that.

If you're using [nvm](https://www.npmjs.com/package/nvm) I've added a .nvmrc file. Just run:

```bash
nvm use
```

#### Environment variables

Please see `.env.local.example` for an example of how to create a `.env.local` for the environment variables the app uses. This is just for the base url of the API. If you don't have the right variables please reach out.

#### Installing dependencies

I'd suggest using [bun](https://bun.sh/docs/installation) for installing dependencies and building and running the app, however you're free to use other tools:

```bash
bun install
# or
yarn install
# or
pnpm installl
# or
npm install
```

### Running the app

To build and the app and run the build run:

```bash
bun start
# or
yarn start
# or
pnpm start
# or
npm start
```

To run the app in development mode run:

```bash
bun dev
# or
yarn dev
# or
pnpm dev
# or
npm run dev
```

In either case open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

