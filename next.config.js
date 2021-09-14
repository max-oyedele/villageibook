const withImages = require('next-images')
// const withSvgr = require('next-plugin-svgr');

module.exports = withImages({
  fileExtensions: ["jpg", "png", "gif", "webp", "svg"],
  webpack(config, options) {
    return config
  }
})