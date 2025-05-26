// eslint.config.js
import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

import globals from "globals";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import onlyWarn from "eslint-plugin-only-warn";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tailwindcss from "eslint-plugin-tailwindcss";
import reactRefresh from "eslint-plugin-react-refresh";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // JavaScript 기본 설정
  js.configs.recommended,

  // 글로벌 환경 설정
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // TypeScript + React + TailwindCSS
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      // 유틸
      "only-warn": onlyWarn,
      prettier: prettierPlugin,

      // 코드 품질
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,

      // UI
      react: reactPlugin,
      "react-hooks": reactHooks,
      tailwindcss: tailwindcss,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // React Hooks
      ...reactHooks.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Import
      "import/no-unresolved": "off",
      "import/no-named-default": "error",
      "import/no-default-export": "error",

      // 정렬
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // 미사용 import 제거
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "unused-imports/no-unused-imports": "error",

      // Tailwind class 정렬
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",

      // React Refresh 관련
      "react-refresh/only-export-components": "warn",

      // Prettier
      "prettier/prettier": ["warn", {}, { usePrettierrc: true }],
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
      react: {
        version: "detect",
      },
    },
  },

  // config 파일 예외
  {
    files: [
      "**/*.config.{js,cjs,mjs,ts}",
      "**/next.config.*",
      "**/postcss.config.*",
      "**/tailwind.config.*",
    ],
    rules: {
      "import/no-default-export": "off",
    },
  },

  // shadcn/ui 디렉토리 예외
  {
    files: ["src/shared/components/ui/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },

  // 기본 ignore 설정
  {
    ignores: [".next", "dist"],
  },
];
