const { override, addBabelPlugin, addWebpackPlugin } = require('customize-cra')
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin')

module.exports = override(
  addBabelPlugin(['import-graphql', {}]),
  // addWebpackPlugin(
  //   sentryWebpackPlugin({
  //     org: 'l3vels',
  //     project: 'l3-ui',
  //     authToken: import.meta.env.REACT_APP_SENTRY_WEBPACK_AUTH_TOKEN,
  //   }),
  // ),
)
