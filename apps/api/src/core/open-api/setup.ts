import type { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { createOpenApiConfig } from "./config";
import { createScalarConfig } from "./scalar-config";
import { mergeOpenApiSchemas } from "./merge-schemas";

export async function setupApiDocumentation(
  app: INestApplication,
  auth: any,
  globalPrefix: string,
) {
  // Create OpenAPI config
  const config = createOpenApiConfig();

  // Generate base OpenAPI document
  const mainDocument = SwaggerModule.createDocument(app, config);

  // Get auth OpenAPI schema
  const openAPISchema = await auth.api.generateOpenAPISchema();

  // Merge schemas
  const mergedDocument = mergeOpenApiSchemas(
    mainDocument,
    openAPISchema,
    globalPrefix,
  );

  // Set up Scalar API Reference
  app.use("/docs", apiReference(createScalarConfig(mergedDocument)));

  return mergedDocument;
}
