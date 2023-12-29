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

## Asset Management

https://webpack.js.org/loaders/sass-loader/

### Loading CSS
- `npm install --save-dev style-loader css-loader`  -- loader for webpack

https://www.npmjs.com/package/style-loader
https://www.npmjs.com/package/css-loader

```
module: {
    rules: [
      {
        test: /\.css$/i, //regluar expression for searching all css files
        use: ['style-loader', 'css-loader'], //webpack loader chain
      },
    ],
  },
```

Module loaders can be chained. `Each loader in the chain applies` transformations to the processed resource. A chain is executed in reverse order. The first loader passes its result (resource with applied transformations) to the next one, and so forth. Finally, webpack expects JavaScript to be returned by the last loader in the chain.

The above order of loaders should be maintained: 'style-loader' comes first and followed by 'css-loader'. If this convention is not followed, webpack is likely to throw errors.

This enables you to `import './style.css'` into the file that depends on that styling. Now, `when that module is run, a <style> tag with the stringified css will be inserted into the <head> of your html file`.

### Loading Images

So now we're pulling in our CSS, but what about our `images like backgrounds and icons`? As of webpack 5, using the `built-in Asset Modules` we can easily incorporate those in our system as well:
```
{
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
},
```
Now, when you `import MyImage from './my-image.png'`, that image will be processed and added to your output directory and the `MyImage variable will contain the final url` of that image `after processing`. When using `the css-loader`, as shown above, a similar process will occur for `url('./my-image.png') within your CSS`. The loader will recognize this is a local file, and replace the './my-image.png' path with the final path to the image in your output directory. The `html-loader handles <img src="./my-image.png" /> in the same manner.`

### Loading Fonts
Add files and configuration: 

```
{
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
},
```

Importing in css 
```
@font-face {
  font-family: 'MyFont';
  src: url('./my-font.woff2') format('woff2'),
    url('./my-font.woff') format('woff');
  font-weight: 600;
  font-style: normal;
}

 .hello {
   color: red;
  font-family: 'MyFont';
 }
```

### Loading Data
Another useful asset that can be loaded is `data`, like `JSON files, CSVs, TSVs, and XML`. Support for JSON is actually built-in, similar to NodeJS, meaning `import Data from './data.json'` will work by default. To import CSVs, TSVs, and XML you could `use the csv-loader` and `xml-loader`. Let's handle loading all three:
```
{
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },

```

Import these files in js

### Custom parser (yaml etc)
https://webpack.js.org/guides/asset-management/#customize-parser-of-json-modules

## Output Management

https://webpack.js.org/guides/output-management/

So far we've `manually included all our assets in our index.html` file, but as your application grows and once you start using hashes in filenames and outputting multiple bundles, it will be `difficult to keep managing your index.html` file `manually`. However, a few plugins exist that will make this process much easier to manage.

we are adding files names as static in our dist/index.html file. 
But what would happen if we changed the name of one of our entry points, or even added a new one? The generated bundles would be renamed on a build, but our index.html file would still reference the old names. Let's fix that with the `HtmlWebpackPlugin`.

- `npm install --save-dev html-webpack-plugin`
Before we do a build, you should know that the `HtmlWebpackPlugin by default will` generate its `own index.html file`, even though we already have one in the dist/ folder. This means that `it will replace our index.html file` with a newly generated one

## Development
Enable development mode
```
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
  mode: 'development',
   .
   .
   .
   plugins: [
     new HtmlWebpackPlugin({
      title: 'Development',
     }),
   ],
  .
  .
  .
 };
```
### Using source maps
When webpack bundles your source code, it can `become difficult to track down errors` and `warnings` to their `original location`. For example, if you `bundle three source files` (a.js, b.js, and c.js) `into one bundle` (bundle.js) and `one of the source files contains an error`, the `stack trace will point to bundle.js`. This isn't always helpful as you probably want to know exactly which source file the error came from.

In order to make it easier to track down errors and warnings, JavaScript offers source maps, which map your compiled code back to your original source code. If an error originates from b.js, the `source map will tell you exactly that`.

There are a lot of different options available when it comes to source maps. Be sure to check them out so you can configure them to your needs.

For this guide, let's use the `inline-source-map` option, which is good for illustrative purposes (though not for production):

```
module.exports = {
  ...
  devtool: 'inline-source-map',
  ...
}
```
### Using Watch Mode
You can instruct webpack to "watch" all files within your dependency graph for changes. If one of these files is updated, the code will be recompiled so you don't have to run the full build manually.
```
package.json

"scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
    "watch": "webpack --watch",
     "build": "webpack"
   },
```

The only downside is that you have to `refresh your browser in order to see the changes`. It would be much nicer if that would happen automatically as well, so let's try webpack-dev-server which will do exactly that.

### Using webpack-dev-server
https://webpack.js.org/guides/development/#using-webpack-dev-server

- `npm install --save-dev webpack-dev-server`
```
webpack.config.js

...
devServer: {
    static: './dist',
  },
   optimization: {
    runtimeChunk: 'single',
  },
...

```
This tells `webpack-dev-server to serve the files from the dist directory on localhost:8080`.

The `optimization.runtimeChunk: 'single'` was added because in this example `we have more than one entrypoint on a single HTML page`. Without this, we could get into trouble described here. Read the Code Splitting chapter for more details.

```
package.json

"start": "webpack serve --open"

```

### Using webpack-dev-middleware
`webpack-dev-middleware` is a `wrapper` that will `emit files processed by webpack to a server`. This is `used in webpack-dev-server internally`, however it's` available as a separate package to allow more custom setups if desired`. We'll take a look at an example that combines webpack-dev-middleware with an express server.

work same as watch mode of webpack but we can configure many options by custom server using express js and add it as a middleware with options.


