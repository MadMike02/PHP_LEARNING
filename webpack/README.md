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