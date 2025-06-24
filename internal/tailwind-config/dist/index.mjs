import { createJiti } from "../../../node_modules/.pnpm/jiti@2.4.2/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@vben/tailwind-config": "C:/Users/SAYURI/OneDrive/Escritorio/SDAYD-2/internal/tailwind-config"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("C:/Users/SAYURI/OneDrive/Escritorio/SDAYD-2/internal/tailwind-config/src/index.js")} */
const _module = await jiti.import("C:/Users/SAYURI/OneDrive/Escritorio/SDAYD-2/internal/tailwind-config/src/index.ts");

export default _module?.default ?? _module;