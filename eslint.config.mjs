import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Remove "next/typescript" since TypeScript is no longer used
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
