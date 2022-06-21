module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "ignorePatterns": ["**/assets/**"],
  "overrides": [
    {
      "files": ["*.ts"],
      "excludedFiles": ["*.spec.ts"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module",
        "project": ["./tsconfig.json"]
      },
      "plugins": ["@typescript-eslint"],
      "rules": {
        "array-bracket-newline": [
          "warn",
          {
            "multiline": true
          }
        ],
        "array-bracket-spacing": ["warn", "never"],
        "array-element-newline": [
          "warn",
          "consistent",
          {
            "multiline": true
          }
      ],
        "arrow-parens": ["warn", "always"],
        "arrow-spacing": [
          "warn",
          {
            "before": true,
            "after": true
          }
        ],
        "block-spacing": ["warn", "always"],
        "brace-style": "off",
        "comma-dangle": "off",
        "comma-style": ["warn", "last"],
        "comma-spacing": "off",
        "dot-location": ["warn", "property"],
        "dot-notation": "off",
        "eol-last": ["warn", "always"],
        "func-call-spacing": "off",
        "function-call-argument-newline": ["warn", "consistent"],
        "function-paren-newline": ["warn", "multiline-arguments"],
        "implicit-arrow-linebreak": ["warn", "beside"],
        "indent": "off",
        "key-spacing": [
          "warn",
          {
            "beforeColon": false,
            "afterColon": true
          }
        ],
        "keyword-spacing": ["warn", { "after": true }],
        "linebreak-style": ["warn", "unix"],
        "max-len": [
          "warn",
          {
            "code": 120,
            "tabWidth": 2,
            "ignoreComments": true,
            "ignoreUrls": true,
            "ignoreRegExpLiterals": true
          }
        ],
        "multiline-ternary": ["warn", "always-multiline"],
        "new-parens": ["warn", "always"],
        "newline-per-chained-call": ["warn", { "ignoreChainWithDepth": 2 }],
        "no-else-return": "warn",
        "no-empty-function": "off",
        "no-lonely-if": "warn",
        "no-mixed-spaces-and-tabs": "warn",
        "no-multi-spaces": ["warn", { ignoreEOLComments: true }],
        "no-multiple-empty-lines": [
          "warn",
          {
            "max": 2,
            "maxEOF": 2,
            "maxBOF": 0
          }
        ],
        "no-unused-vars": "off",
        "no-useless-computed-key": "warn",
        "no-useless-rename": [
          "warn",
          {
            "ignoreDestructuring": false,
            "ignoreImport": false,
            "ignoreExport": false
          }
        ],
        "no-useless-return": "warn",
        "no-var": "warn",
        "no-whitespace-before-property": "warn",
        "nonblock-statement-body-position": ["warn", "below"],
        "object-curly-newline": [
          "warn",
          {
            "ObjectExpression": {
              "multiline": true,
              "minProperties": 2,
              "consistent": true
            },
            "ObjectPattern": {
              "multiline": true,
              "minProperties": 2,
              "consistent": true
            },
            "ImportDeclaration": { "consistent": true },
            "ExportDeclaration": "never"
          }
        ],
        "object-curly-spacing": ["warn", "always"],
        "object-property-newline": [
          "warn",
          { "allowAllPropertiesOnSameLine": false }
        ],
        "operator-assignment": ["warn", "always"],
        "operator-linebreak": ["warn", "before"],
        "prefer-arrow-callback": "warn",
        "prefer-const": "warn",
        "prefer-exponentiation-operator": "warn",
        "prefer-numeric-literals": "warn",
        "prefer-object-spread": "warn",
        "prefer-spread": "off",
        "prefer-template": "warn",
        "quotes": "off",
        "semi": ["warn", "always"],
        "semi-spacing": [
          "warn",
          {
            "before": false,
            "after": true
          }
        ],
        "semi-style": ["warn", "last"],
        "space-before-blocks": ["warn", "always"],
        "space-before-function-paren": [
          "warn",
          {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always"
          }
        ],
        "space-in-parens": ["warn", "never"],
        "space-infix-ops": ["warn"],
        "space-unary-ops": [
          "warn",
          {
            "words": true,
            "nonwords": false
          }
        ],
        "switch-colon-spacing": [
          "warn",
          {
            "after": true,
            "before": false
          }
        ],
        "template-curly-spacing": ["warn", "always"],
        "@angular-eslint/component-class-suffix": [
          "error",
          {
            "suffixes": [
              "Component",
              "Element",
              "Page",
              "Base",
              "Chart"
            ]
          }
        ],
        "@typescript-eslint/array-type": [
          "warn",
          {"default": "array"}
        ],
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/brace-style": [
          "warn",
          "stroustrup",
          { "allowSingleLine": true }
        ],
        "@typescript-eslint/class-literal-property-style": ["warn", "fields"],
        "@typescript-eslint/comma-dangle": [
          "warn",
          {
            "arrays": "never",
            "objects": "never",
            "imports": "never",
            "exports": "never",
            "functions": "never",
            "enums": "never",
            "generics": "never",
            "tuples": "never"
          }
        ],
        "@typescript-eslint/comma-spacing": [
          "warn",
          {
            "before": false,
            "after": true
          }
        ],
        "@typescript-eslint/consistent-indexed-object-style": [
          "error",
          "index-signature"
        ],
        "@typescript-eslint/consistent-type-assertions": [
          "error",
          {
            "assertionStyle": "as",
            "objectLiteralTypeAssertions": "never"
          }
        ],
        "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
        "@typescript-eslint/consistent-type-exports": "warn",
        "@typescript-eslint/dot-notation": ["warn"],
        "@typescript-eslint/func-call-spacing": ["warn"],
        "@typescript-eslint/indent": [
          "warn",
          2,
          {
            "SwitchCase": 1,
            "FunctionDeclaration": {
              "body": 1,
              "parameters": "first"
            },
            "CallExpression": {"arguments": "first"},
            "MemberExpression": 1
          }
        ],
        "@typescript-eslint/member-delimiter-style": [
          "error",
          {
            "multiline": {
              "delimiter": "semi",
              "requireLast": true
            },
            "singleline": {
              "delimiter": "semi",
              "requireLast": false
            },
            "multilineDetection": "brackets"
          }
        ],
        "@typescript-eslint/method-signature-style": ["warn", "property"],
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            "argsIgnorePattern": "^_"
          }
        ],
        "@typescript-eslint/prefer-as-const": "warn",
        "@typescript-eslint/prefer-for-of": "warn",
        "@typescript-eslint/prefer-includes": "warn",
        "@typescript-eslint/prefer-reduce-type-parameter": "warn",
        "@typescript-eslint/prefer-regexp-exec": "warn",
        "@typescript-eslint/prefer-return-this-type": "warn",
        "@typescript-eslint/prefer-string-starts-ends-with": "warn",
        "@typescript-eslint/quotes": [
          "warn",
          "double",
          {
            "avoidEscape": true,
            "allowTemplateLiterals": true
          }
        ],
        "@typescript-eslint/type-annotation-spacing": "warn",
        "@typescript-eslint/unbound-method": ["warn", { "ignoreStatic": true }],
      }
    },
    {
      "files": ["*.html"],
      "extends": ["plugin:@angular-eslint/template/recommended"]
    },
    {
      "files": ["*.module.ts", "*.routing.ts"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module",
        "project": ["./tsconfig.json"]
      },
      "plugins": ["@typescript-eslint"],
      "rules": {
        "array-bracket-newline": [
          "warn",
          {
            "minItems": 1
          }
        ],
        "array-bracket-spacing": ["warn", "never"],
        "array-element-newline": [
          "warn",
          "always"
        ],
      }
    }
  ]
}
