// // var getTransformer = require('ts-transform-graphql-tag').getTransformer
// //eslint-disable-next-line
// var getTransformer = ()=>{alert("aaa")}//require('ts-transform-graphql-tag').getTransformer

// const  rewireGraphQLTag= (config, env) => {
//   const gqlExtension = /\.(graphql|gql)$/

//   const flatten = (array) => array.reduce((a, b) =>
//     a.concat(Array.isArray(b) ? flatten(b) : b), [])

//   const fileLoader = flatten(config.module.rules.map((rule) => rule.oneOf || rule))
//     .find((rule) => rule.loader && rule.loader.indexOf("file-loader")!==-1)

//   fileLoader && fileLoader.exclude.push(gqlExtension)

//   const gqlTagRule1 = {
//     test: gqlExtension,
//     loader: 'graphql-tag/loader',
//     exclude: /node_modules/,
//   }
//   // const gqlTagRule = {
//   //   test: /\.ts?$/,
//   //   loader: 'ts-loader',
//   //   options: {
//   //     // ... other loader's options
//   //     getCustomTransformers: () => ({ before: [getTransformer()] }),
//   //   },
//   // }
//   // config.module.rules.push(gqlTagRule)
//   config.module.rules.push(gqlTagRule1)

//   return config
// }

// module.exports = {
//   // The Webpack config to use when compiling your react app for development or production.
//   webpack: function(config, env) {
//     // ...add your webpack config

//     const conf = rewireGraphQLTag(config,env)
//     return conf
//   },
//   // // The Jest config to use when running your jest tests - note that the normal rewires do not
//   // // work here.
//   // jest: function(config) {
//   //   // ...add your jest config customisation...
//   //   // Example: enable/disable some tests based on environment variables in the .env file.
//   //   if (!config.testPathIgnorePatterns) {
//   //     config.testPathIgnorePatterns = [];
//   //   }
//   //   if (!process.env.RUN_COMPONENT_TESTS) {
//   //     config.testPathIgnorePatterns.push('<rootDir>/src/components/**/*.test.js');
//   //   }
//   //   if (!process.env.RUN_REDUCER_TESTS) {
//   //     config.testPathIgnorePatterns.push('<rootDir>/src/reducers/**/*.test.js');
//   //   }
//   //   return config;
//   // },
//   // // The function to use to create a webpack dev server configuration when running the development
//   // // server with 'npm run start' or 'yarn start'.
//   // // Example: set the dev server to use a specific certificate in https.
//   // devServer: function(configFunction) {
//   //   // Return the replacement function for create-react-app to use to generate the Webpack
//   //   // Development Server config. "configFunction" is the function that would normally have
//   //   // been used to generate the Webpack Development server config - you can use it to create
//   //   // a starting configuration to then modify instead of having to create a config from scratch.
//   //   return function(proxy, allowedHost) {
//   //     // Create the default config by calling configFunction with the proxy/allowedHost parameters
//   //     const config = configFunction(proxy, allowedHost);

//   //     // Change the https certificate options to match your certificate, using the .env file to
//   //     // set the file paths & passphrase.
//   //     const fs = require('fs');
//   //     config.https = {
//   //       key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
//   //       cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
//   //       ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
//   //       passphrase: process.env.REACT_HTTPS_PASS
//   //     };

//   //     // Return your customised Webpack Development Server config.
//   //     return config;
//   //   };
//   // },
//   // // The paths config to use when compiling your react app for development or production.
//   // paths: function(paths, env) {
//   //   // ...add your paths config
//   //   return paths;
//   // },
// }


const { addBabelPlugin } = require('customize-cra')

function rewireInlineImportGraphqlAst(config, env, gqlPluginOptions = {}) {
  const pluginOptions = Object.assign({}, gqlPluginOptions, { nodePath: process.env.NODE_PATH })
  return addBabelPlugin(['import-graphql', pluginOptions])(config)
}

module.exports = function override(config, env) {
  config = rewireInlineImportGraphqlAst(config, env)
  return config
}