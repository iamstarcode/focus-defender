/**
 * @type {import('prettier').Options}
 */
export default {
  arrowParens: "avoid",
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: "lf",
  printWidth: 80,
  proseWrap: "always",
  quoteProps: "as-needed",
  semi: false,
  singleQuote: true,
  trailingComma: "all",
  useTabs: false,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "<BUILTIN_MODULES>", // Node.js built-in modules
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
    "", // Empty line
    "^@plasmo/(.*)$",
    "",
    "^@plasmohq/(.*)$",
    "",
    "^~(.*)$",
    "",
    "^[./]"
  ]
}
