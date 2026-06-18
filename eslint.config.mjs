import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import nextPlugin from "@next/eslint-plugin-next";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  // 1. Global ignores (must be first)
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "build/",
      "dist/",
      "coverage/",
      "*.config.*",
      "vitest.setup.tsx",
      "next-env.d.ts",
      "public/snippets/",
      "tests/",
      "*.log",
      ".DS_Store",
    ],
  },

  // 2. Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. React
  reactPlugin.configs.flat["jsx-runtime"],

  // 4. React Hooks
  reactHooksPlugin.configs.flat["recommended"],

  // 5. JSX Accessibility (flat config)
  jsxA11yPlugin.flatConfigs.recommended,

  // 6. Next.js
  nextPlugin.configs.recommended,

  // 7. Prettier (must be last to disable conflicting rules)
  prettierConfig,

  // 8. Custom config
  {
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",
    },
  },
);
