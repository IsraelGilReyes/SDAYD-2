const { createJiti } = require("../../../node_modules/.pnpm/jiti@2.4.2/node_modules/jiti/lib/jiti.cjs")

const jiti = createJiti(__filename, {
  "interopDefault": true,
  "alias": {
    "@vben/tailwind-config": "C:/Users/maril/Desktop/SDAYD-2/internal/tailwind-config"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("C:/Users/maril/Desktop/SDAYD-2/internal/tailwind-config/src/postcss.config.js")} */
module.exports = jiti("C:/Users/maril/Desktop/SDAYD-2/internal/tailwind-config/src/postcss.config.ts")