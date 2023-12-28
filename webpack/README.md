# Webpack.
Webpack is used to compile JavaScript modules. Once installed, you can interact with webpack either from its CLI or API.

## INITAIL SETUP

### Basic Setup

- mkdir webpack-demo
- cd webpack-demo
- npm init -y
- npm install webpack webpack-cli --save-dev

`In this basic setup(commit 1), there are implicit dependencies between the <script> tags. Our index.js file depends on lodash being included in the page before it runs. This is because index.js never explicitly declared a need for lodash; it assumes that the global variable _ exists.`

There are problems with managing JavaScript projects this way:

- It is not immediately apparent that the script depends on an external library.
- If a dependency is missing, or included in the wrong order, the application will not function properly.
- If a dependency is included but not used, the browser will be forced to download unnecessary code.

### Creating a Bundle
`In this setup (commit 2), index.js explicitly requires lodash to be present, and binds it as _ (no global scope pollution). By stating what dependencies a module needs, webpack can use this information to build a dependency graph. It then uses the graph to generate an optimized bundle where scripts will be executed in the correct order.`

With that said, let's `run npx webpack`, which will `take our script at src/index.js` as the entry point, and `will generate dist/main.js as the output`. The npx command, which ships with Node 8.2/npm 5.2.0 or higher, runs the webpack binary (./node_modules/.bin/webpack) of the webpack package we installed in the beginning:

The `import and export` statements have been standardized in ES2015. They are supported in most of the browsers at this moment, however `there are some browsers that don't recognize` the new syntax. But don't worry, `webpack does support them` out of the box.

Behind the scenes, `webpack actually "transpiles" the code` so that `older browsers can also run` it. If you inspect dist/main.js, you might be able to see how webpack does this, it's quite ingenious! Besides import and export, webpack supports various other module syntaxes as well, see Module API for more information.

Note that webpack will not alter any code other than import and export statements. If you are using other ES2015 features, make sure to use a transpiler such as Babel via webpack's loader system.

### Using a Configuration
add `webpack.config.js` at root folder.
- `npx webpack --config webpack.config.js` --> file name can be different if spilting configuration in multiple files. Default file name is webpack.config.js.
- or `webpack` -- to generate build file based on webpack.config.js file.

