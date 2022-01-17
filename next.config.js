const withImages = require('next-images')
// const withSvgr = require('next-plugin-svgr');

const ENV_VARS = {
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
}

module.exports = withImages({
  env: ENV_VARS,
  fileExtensions: ["jpg", "png", "gif", "webp", "svg"],
  webpack(config, options) {
    return config
  },
  publicRuntimeConfig: {
    googleApiKey: process.env.GOOGLE_API_KEY,
    stripeApiKey: ENV_VARS
  }
})