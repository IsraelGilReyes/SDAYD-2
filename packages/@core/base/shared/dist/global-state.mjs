import { createJiti } from "../../../../../node_modules/.pnpm/jiti@2.4.2/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@vben-core/shared": "C:/Users/SAYURI/OneDrive/Escritorio/SDAYD-2/packages/@core/base/shared"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("C:/Users/SAYURI/OneDrive/Escritorio/SDAYD-2/packages/@core/base/shared/src/global-state.js")} */
const _module = await jiti.import("C:/Users/SAYURI/OneDrive/Escritorio/SDAYD-2/packages/@core/base/shared/src/global-state.ts");

export const globalShareState = _module.globalShareState;