This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started

First, install pnpm:

```bash
npm install -g pnpm
```

Then, install the dependencies:

```bash
pnpm install
```

## Developing
Run the following:

```bash
pnpm dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

### Creating a Branch

1. Open the Issue in browser tab
2. Click the "Create a Branch" button
3. Create Branch locally using the suggested name for consistency

### Committing Changes

Follow the recommended commit message format:

```bash
git commit -m "type(scope): subject"
```
Examples:

```bash
git commit -m "feat: add new feature"
git commit -m "fix: fix a bug"
git commit -m "docs: update docs"
```

## Making production build

Run the following:

```bash
pnpm build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
