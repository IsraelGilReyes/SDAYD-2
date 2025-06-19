import { createJiti } from "../../../node_modules/.pnpm/jiti@2.4.2/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@vben/vsh": "/home/darkar/Escritorio/SDAYD-2/scripts/vsh"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("/home/darkar/Escritorio/SDAYD-2/scripts/vsh/src/index.js")} */
const _module = await jiti.import("/home/darkar/Escritorio/SDAYD-2/scripts/vsh/src/index.ts");

export default _module?.default ?? _module;