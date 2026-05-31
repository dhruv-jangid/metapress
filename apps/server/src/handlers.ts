import { useLogger } from "@metapress/logger";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";

import { appRouter } from "./router";

const logger = useLogger("server", "orpc");

export const rpcHandler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      logger.error(error as Error);
    }),
  ],
});

export const apiHandler = new OpenAPIHandler(appRouter, {
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
      docsTitle: "Metapress API",
      specGenerateOptions: { info: { title: "Metapress API", version: "1.0.0" } },
      docsConfig: {
        theme: "alternate",
        layout: "modern",
        showSidebar: true,
        defaultOpenFirstTag: false,
        showDeveloperTools: "localhost",
        showToolbar: "localhost",
        hideClientButton: false,
        persistAuth: false,
        telemetry: false,
        externalUrls: null,
        default: false,
        isEditable: false,
        isLoading: false,
        hideModels: false,
        documentDownloadType: "both",
        hideTestRequestButton: false,
        hideSearch: false,
        showOperationId: false,
        hideDarkModeToggle: true,
        withDefaultFonts: true,
        defaultOpenAllTags: false,
        expandAllModelSections: false,
        expandAllResponses: false,
        orderSchemaPropertiesBy: "alpha",
        orderRequiredPropertiesFirst: true,
        defaultHttpClient: { targetKey: "node", clientKey: "fetch" },
        customCss: `a[href="https://www.scalar.com"],.scalar-mcp-layer { display: none !important; }`,
      },
    }),
  ],
  interceptors: [
    onError((error) => {
      logger.error(error as Error);
    }),
  ],
});
