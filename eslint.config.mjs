import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs" 
    } 
  },
  { 
    languageOptions: { 
      globals: { 
        ...globals.browser, 
        ...globals.node 
      } 
    } 
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "indent": ["error", 2], // Enforces a 2-space indentation
      "space-before-blocks": ["error", "always"], // Enforces a space before opening blocks
      "max-len": ["error", { "code": 80 }] // Enforces a maximum line length of 80 characters
    }
  }
];
