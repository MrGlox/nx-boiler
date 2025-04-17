import type { OpenAPIObject } from "@nestjs/swagger";

export function mergeOpenApiSchemas(
  mainDocument: OpenAPIObject,
  openAPISchema: any,
  globalPrefix: string,
): OpenAPIObject {
  return {
    ...mainDocument,
    paths: {
      ...mainDocument.paths,
      ...Object.entries(openAPISchema.paths).reduce(
        (acc, [path, pathItem]) =>
          Object.assign(acc, { [`/${globalPrefix}/auth${path}`]: pathItem }),
        {},
      ),
    },
    components: {
      ...mainDocument.components,
      schemas: {
        ...(mainDocument.components?.schemas || {}),
        ...(openAPISchema.components?.schemas || {}),
      },
      securitySchemes: {
        ...(mainDocument.components?.securitySchemes || {}),
        ...(openAPISchema.components?.securitySchemes as any),
      },
    },
    tags: [...(mainDocument.tags || []), ...(openAPISchema.tags || [])],
  };
}
