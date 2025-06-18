const { createJiti } = require("../../../node_modules/.pnpm/jiti@2.4.2/node_modules/jiti/lib/jiti.cjs")

const jiti = createJiti(__filename, {
  "interopDefault": true,
  "alias": {
    "@vben/tailwind-config": "/home/darkar/Escritorio/SDAYD-2/internal/tailwind-config"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("/home/darkar/Escritorio/SDAYD-2/internal/tailwind-config/src/postcss.config.js")} */
module.exports = jiti("/home/darkar/Escritorio/SDAYD-2/internal/tailwind-config/src/postcss.config.ts")