// eslint.config.mjs
import tseslint from "typescript-eslint";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

// 플러그인
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import onlyWarn from "eslint-plugin-only-warn";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tailwindcss from "eslint-plugin-tailwindcss";
import reactRefresh from "eslint-plugin-react-refresh";

// __dirname 설정 (ESM 환경)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 기존 ESLint 설정 호환을 위한 FlatCompat
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  // next/core-web-vitals 규칙을 가장 앞에 삽입
  ...compat.extends("next/core-web-vitals"),

  // 일반 ignore 설정
  { ignores: [".next", "dist"] },

  // TypeScript + React + Tailwind 설정
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      // 기본 유틸
      "only-warn": onlyWarn,
      prettier: prettierPlugin,

      // 코드 품질
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,

      // UI 관련
      react: reactPlugin,
      "react-hooks": reactHooks,
      tailwindcss: tailwindcss,
      "react-refresh": reactRefresh,
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

      // Prettier 연동
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
  }
);
