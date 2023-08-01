# gatsby-remark-copy-button

[![ci](https://github.com/jpfulton/gatsby-remark-copy-button/actions/workflows/ci.yml/badge.svg)](https://github.com/jpfulton/gatsby-remark-copy-button/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/%40jpfulton%2Fgatsby-remark-copy-button.svg)](https://www.npmjs.com/package/@jpfulton/gatsby-remark-copy-button)

Add a copy button to **markdown** code snippets in
[Gatsby](https://www.gatsbyjs.com) sites with
compatibility for **MDX** and use of the browser
[Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).

## Install

```bash
yarn add @jpfulton/gatsby-remark-copy-button
```

## How to Use

Add the configuration entry to your `gatsby-config.js` file. This plugin
**must** be added before other plugins that operate on `code` nodes and
markdown code snippets to operate correctly.

The following listing assumes you are using the `gatsby-plugin-mdx` plugin.
However, this plugin may also be used with the `gatsby-transformer-remark` plugin.

```js
plugins: [
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`, `.md`],
      gatsbyRemarkPlugins: [
        {
          resolve: `@jpfulton/gatsby-remark-copy-button`,
        },
        {
          resolve: `gatsby-remark-code-titles`,
        },
        {
          resolve: `gatsby-remark-prismjs`,
        },
      ],
    },
  },
],
```

### Options

All plugin options are optional. However, it is strongly suggested that
you customize them to override styling to fit your site's look, feel and layout.

```js
{
  resolve: `@jpfulton/gatsby-remark-copy-button`,
  options: {
    // Provide a text label for the copy button.
    // Default: null
    buttonText: null,
    // Provide a complete SVG tag string to replace the default
    // copy icon.
    copySvg: null,
    // Provide a complete SVG tag string to replace the default
    // success icon.
    successSvg: null,
    // Provide a custom container class for the <div> tag that contains
    // the copy button to apply custom styling.
    // Default: "gatsby-remark-copy-button-container"
    customButtonContainerClass: null,
    // Provide a custom button class for the copy button to apply
    // custom styling.
    // Default: "gatsby-remark-copy-button"
    customButtonClass: null,
  },
},
```

### Custom Styling

Custom styling may be applied to the default classes or using the options
above custom classes may be applied to the injected markup.

```css
.gatsby-remark-copy-button-container {
}
.gatsby-remark-copy-button {
}
```

Apply custom styles by adding a style sheet to your `gatsby-browser.js` file.

```js
// gatsby-browser.js
import "./src/styles/custom-copy-button.scss";
```

### Usage in Markdown

Once installed, the copy button may optionally be enabled by adding
to the code snippet declaration within markdown files. When this plugin
is used in conjunction with the `gatsby-remark-prismjs` plugin, the
`{clipboardButton: true}` option may be provided in any order with other
prismjs options.

````js
```js {clipboardButton: true}
const example = "This content will end up on the user's clipboard";
```;
````
