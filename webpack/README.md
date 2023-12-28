# Webpack.
Webpack is used to compile JavaScript modules. Once installed, you can interact with webpack either from its CLI or API.

## Basic Setup

- mkdir webpack-demo
- cd webpack-demo
- npm init -y
- npm install webpack webpack-cli --save-dev

`In this basic setup(commit 1), there are implicit dependencies between the <script> tags. Our index.js file depends on lodash being included in the page before it runs. This is because index.js never explicitly declared a need for lodash; it assumes that the global variable _ exists.`

There are problems with managing JavaScript projects this way:

- It is not immediately apparent that the script depends on an external library.
- If a dependency is missing, or included in the wrong order, the application will not function properly.
- If a dependency is included but not used, the browser will be forced to download unnecessary code.