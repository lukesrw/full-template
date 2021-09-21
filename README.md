# Getting Started

Use this template through the [GitHub "Use this template"](https://github.com/lukesrw/template/generate) function, or:

```
set project=my-new-project
git clone --depth=1 https://github.com/lukesrw/template.git %project%
rmdir /S /Q %project%\.git
git init %project%

```

# Usage

## Init

-   Installs the "Packages (global)" listed below
-   Installs the "Packages (local)" listed below
-   Clones the "Init Folder" listed below from [Full Template](https://github.com/lukesrw/full-template)

```
node tools/init <feature1> <feature2> ...
```

## Build

-   Compiles to the "Compile Folder"
-   Watches and compiles any changes in the "Init Folder"

```
node tools/build
```

Other node scripts can also optionally require the build script and execute it manually:

```js
const build = require("../tools/build");

build();
```

# Features

| Feature           | Init Folder                                                                                | Compile Folder                    | Packages (global)                                                                                                                                       | Packages (local)                                                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript ("ts") | [ts](https://github.com/lukesrw/full-template/tree/master/blueprints/ts)                   | js                                | [`typescript`](https://www.npmjs.com/package/typescript)                                                                                                | [`@types/node`](https://www.npmjs.com/package/@types/node)                                                                                                                                                     |
| Vue               | [vue](https://github.com/lukesrw/full-template/tree/master/blueprints/vue)                 | dist                              | [`@vue/cli-service`](https://www.npmjs.com/package/@vue/cli-service)<br/>[`vue-template-compiler`](https://www.npmjs.com/package/vue-template-compiler) | [`vue`](https://www.npmjs.com/package/vue)<br/>[`vue-router`](https://www.npmjs.com/package/vue-router)                                                                                                        |
| Scss              | [scss](https://github.com/lukesrw/full-template/tree/master/blueprints/scss)               | dist/css/scss<br/>public/css/scss | [`sass`](https://www.npmjs.com/package/sass)                                                                                                            |                                                                                                                                                                                                                |
| Prettier          | [prettier](https://github.com/lukesrw/full-template/tree/master/blueprints/prettier)\*     |                                   |                                                                                                                                                         |                                                                                                                                                                                                                |
| Eslint            | [eslint](https://github.com/lukesrw/full-template/tree/master/blueprints/eslint)\*         |                                   |                                                                                                                                                         |                                                                                                                                                                                                                |
| Git               | [git](https://github.com/lukesrw/full-template/tree/master/blueprints/git)\*               |                                   |                                                                                                                                                         |
| Electron          | [electron](https://github.com/lukesrw/full-template/tree/master/blueprints/electron)\*     | js                                |                                                                                                                                                         | [`electron`](https://www.npmjs.com/package/electron)<br/>[`@electron-forge/cli`](https://www.npmjs.com/package/@electron-forge/cli)<br/>[`electron-settings`](https://www.npmjs.com/package/electron-settings) |
| Extensions        | [extensions](https://github.com/lukesrw/full-template/tree/master/blueprints/extensions)\* |

\*files cloned into root without folder
